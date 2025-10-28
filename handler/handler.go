// Package handler contains tools to creat various new handlers
package handler

import (
	"database/sql"
	"log/slog"
	"net/http"

	"github.com/a-h/templ"
)

type Handler struct {
	logger   *slog.Logger
	sqliteDB *sql.DB
}

func New(
	logger *slog.Logger,
	sqliteDB *sql.DB,
) *Handler {
	return &Handler{
		logger:   logger,
		sqliteDB: sqliteDB,
	}
}

func (h *Handler) Component(comp templ.Component) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html")
		if err := comp.Render(r.Context(), w); err != nil {
			h.logger.Error("failed to render component", slog.Any("error", err))
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}
	})
}
