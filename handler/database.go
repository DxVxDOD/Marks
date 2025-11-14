package handler

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"

	"Marks/internal/database"
)

func (h *Handler) WriteBookmark(ctx context.Context, username string, tagName string, bookmarkData *database.AddBookmarkParams) error {
	tx, err := h.db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err := tx.Rollback(); err != nil && err != sql.ErrTxDone {
			h.logger.Error("failed to rollback transaction", slog.Any("error", err))
		}
	}()

	qtx := h.queries.WithTx(tx)

	user, err := qtx.GetUserByUsername(ctx, username)
	if err != nil {
		return fmt.Errorf("could not get user by username: %e", err)
	}

	newBookmark, err := qtx.AddBookmark(ctx, *bookmarkData)
	if err != nil {
		return fmt.Errorf("could not add bookmark to DB: %e", err)
	}

	tag := &database.Tag{}

	tags, err := qtx.GetAllUserTags(ctx, user.ID)
	if err != nil {
		return fmt.Errorf("could not get user tags: %e", err)
	}

	shouldAddTag := true
	for _, t := range tags {
		if t.Name == tagName {
			shouldAddTag = false
			tag = &t
		}
	}

	if shouldAddTag {
		newTag, err := qtx.AddTag(ctx, database.AddTagParams{
			UserID: user.ID,
			Name:   tagName,
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
