// Package handler contains tools to creat various new handlers
package handler

import (
	"database/sql"
	"log"
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

func Component(comp templ.Component) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html")
		log.Fatal(comp.Render(r.Context(), w))
	})
}

func (h *Handler) GetUserMarks(w http.ResponseWriter, r *http.Request) {}
