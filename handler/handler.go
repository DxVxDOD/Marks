// Package handler contains tools to creat various new handlers
package handler

import (
	"database/sql"
	"log/slog"

	"Marks/internal/database"
)

type Handler struct {
	logger  *slog.Logger
	queries *database.Queries
}

func New(
	logger *slog.Logger,
	db *sql.DB,
) *Handler {
	queries := database.New(db)
	return &Handler{
		logger:  logger,
		queries: queries,
	}
}
