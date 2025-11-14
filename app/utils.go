package app

import (
	"context"
	"database/sql"
	"log/slog"

	"Marks/internal/database"
)

func (a *App) WriteBookmark(ctx context.Context, queries *database.Queries, username string, tagName string, bookmarkData *database.AddBookmarkWithDescriptionParams) error {
	tx, err := a.db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err := tx.Rollback(); err != nil && err != sql.ErrTxDone {
			a.logger.Error("failed to rollback transaction", slog.Any("error", err))
		}
	}()

	qtx := queries.WithTx(tx)

	user, err := qtx.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}

	newBookmark, err := qtx.AddBookmarkWithDescription(ctx, *bookmarkData)
	if err != nil {
		return err
	}

	tag, err := qtx.AddTag(ctx, database.AddTagParams{
		UserID: user.ID,
		Name:   tagName,
	})
	if err != nil {
		return err
	}

	// tag := &database.Tag{}

	if _, err := qtx.AddBookmarkTag(ctx, database.AddBookmarkTagParams{
		BookmarkID: newBookmark.ID,
		TagID:      tag.ID,
	}); err != nil {
		return err
	}

	return tx.Commit()
}
