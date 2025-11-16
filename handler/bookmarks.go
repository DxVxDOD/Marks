package handler

import (
	"fmt"
	"log/slog"
	"net/http"
)

func (h *Handler) PostBookmark(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		h.handleError(w, "fialed to parse form", err, http.StatusInternalServerError)
		return
	}

	username := r.PathValue("username")

	bookmarkForm, err := parseBookmarkForm(r)
	if err != nil {
		h.logger.Error("failed to parse form: ", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("/home/%v", username), http.StatusSeeOther)
		return
	}

	if err := h.WriteBookmark(r.Context(), username, bookmarkForm); err != nil {
		h.logger.Error("failed to write bookmarks to DB: ", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("/home/%v", username), http.StatusSeeOther)
		return
	}

	h.doRedirect(w, r, fmt.Sprintf("/home/%v", username), http.StatusSeeOther)
}

func (h *Handler) DeleteBookmark(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		h.handleError(w, "fialed to parse form", err, http.StatusInternalServerError)
		return
	}

	username := r.PathValue("username")
	title := r.PathValue("title")

	if err := h.RemoveBookmark(r.Context(), username, title); err != nil {
		h.handleError(w, "fialed to parse form", err, http.StatusInternalServerError)
		return
	}

	h.doRedirect(w, r, fmt.Sprintf("/home/%v", username), http.StatusSeeOther)
}
