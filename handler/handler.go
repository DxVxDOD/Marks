// Package handler contains tools to creat various new handlers
package handler

import (
	"database/sql"
	"log/slog"
	"net/http"

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

func (h *Handler) handleError(w http.ResponseWriter, message string, err error, statusCode int) {
	h.logger.Error(message, slog.Any("error", err))
	w.WriteHeader(statusCode)
}
