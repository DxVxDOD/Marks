package handler

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"

	"Marks/internal/database"
)

func (h *Handler) WriteBookmark(ctx context.Context, username string, bookmarkForm *BookmarkForm) error {
	tx, err := h.db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err := tx.Rollback(); err != nil && err != sql.ErrTxDone {
			h.logger.Error("failed to rollback transaction on bookmark write", slog.Any("error", err))
		}
	}()

	qtx := h.queries.WithTx(tx)

	user, err := qtx.GetUserByUsername(ctx, username)
	if err != nil {
		return fmt.Errorf("could not get user by username: %e", err)
	}

	newBookmark := &database.Bookmark{}

	if len(bookmarkForm.Description) < 1 {
		bookmarkData := &database.AddBookmarkParams{
			UserID: user.ID,
			Title:  bookmarkForm.Title,
			Url:    bookmarkForm.URL,
		}

		bookmark, err := qtx.AddBookmark(ctx, *bookmarkData)
		if err != nil {
			return fmt.Errorf("could not add bookmark to DB: %e", err)
		}
		newBookmark = &bookmark
	} else {
		bookmarkData := &database.AddBookmarkWithDescriptionParams{
			UserID: user.ID,
			Title:  bookmarkForm.Title,
			Url:    bookmarkForm.URL,
			Description: sql.NullString{
				Valid:  true,
				String: bookmarkForm.Description,
			},
		}

		bookmark, err := qtx.AddBookmarkWithDescription(ctx, *bookmarkData)
		if err != nil {
			return fmt.Errorf("could not add bookmark to DB: %e", err)
		}
		newBookmark = &bookmark
	}

	tag := &database.Tag{}

	tags, err := qtx.GetAllUserTags(ctx, user.ID)
	if err != nil {
		return fmt.Errorf("could not get user tags: %e", err)
	}

	shouldAddTag := true
	for _, t := range tags {
		if t.Name == bookmarkForm.TagName {
			shouldAddTag = false
			tag = &t
		}
	}

	if shouldAddTag {
		newTag, err := qtx.AddTag(ctx, database.AddTagParams{
			UserID: user.ID,
			Name:   bookmarkForm.TagName,
		})
		if err != nil {
			return fmt.Errorf("could not add tag: %e", err)
		}
		tag = &newTag
	}

	if _, err := qtx.AddBookmarkTag(ctx, database.AddBookmarkTagParams{
		BookmarkID: newBookmark.ID,
		TagID:      tag.ID,
	}); err != nil {
		return fmt.Errorf("could not add bookmark tag: %e", err)
	}

	return tx.Commit()
}

func (h *Handler) RemoveBookmark(ctx context.Context, username string, title string) error {
	tx, err := h.db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err := tx.Rollback(); err != nil && err != sql.ErrTxDone {
			h.logger.Error("failed to rollback transaction on bookmark delete: ", slog.Any("error", err))
		}
	}()

	qtx := h.queries.WithTx(tx)

	user, err := qtx.GetUserByUsername(ctx, username)
	if err != nil {
		return fmt.Errorf("failed to get user by username: %e", err)
	}

	if err := qtx.RemoveBookmark(ctx, database.RemoveBookmarkParams{
		UserID: user.ID,
		Title:  title,
	}); err != nil {
		return fmt.Errorf("could not get user by username: %e", err)
	}

	return tx.Commit()
}
