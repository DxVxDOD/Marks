// Package handler contains tools to creat various new handlers
package handler

import (
	"database/sql"
	"fmt"
	"log/slog"
	"net/http"

	"Marks/components"
	"Marks/internal/database"

	"github.com/a-h/templ"
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

func (h *Handler) handleErrorNoObject(w http.ResponseWriter, message string, statusCode int) {
	h.logger.Error(message)
	w.WriteHeader(statusCode)
}

func (h *Handler) renderComponent(comp templ.Component, w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/html")
	if err := comp.Render(r.Context(), w); err != nil {
		h.handleError(w, "failed to render user bookmarks page", err, http.StatusInternalServerError)
		return
	}
}

func (h *Handler) doRedirect(w http.ResponseWriter, r *http.Request, location string, code int) {
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}

	uri := fmt.Sprintf("%s://%s/%s", scheme, r.Host, location)
	http.Redirect(w, r, uri, code)
}

func (h *Handler) ErrorPage(w http.ResponseWriter, r *http.Request) {
	statusCode := r.PathValue("statusCode")
	h.renderComponent(components.Error(statusCode), w, r)
}
