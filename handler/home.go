package handler

import (
	"fmt"
	"log/slog"
	"net/http"

	"Marks/components"
)

func (h *Handler) Home(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	if len(username) < 1 {
		h.doRedirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	user, err := h.queries.GetUserByUsername(r.Context(), username)
	if err != nil {
		h.logger.Error("could not get user by username", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("error/%v", http.StatusNotFound), http.StatusSeeOther)
		return
	}

	tags, err := h.queries.GetAllUserTags(r.Context(), user.ID)
	if err != nil {
		h.logger.Error("could not get tags by userID", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("error/%v", http.StatusNotFound), http.StatusSeeOther)
		return
	}

	bookmarks, err := h.queries.GetAllUserBookmarks(r.Context(), user.ID)
	if err != nil {
		h.logger.Error("could not get bookmarks by userID", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("error/%v", http.StatusNotFound), http.StatusSeeOther)
		return
	}
	if len(bookmarks) < 1 {
		h.renderComponent(components.HomeNoBookmarks(username), w, r)
		return
	}

	h.renderComponent(components.Home(bookmarks, tags, username), w, r)
}
