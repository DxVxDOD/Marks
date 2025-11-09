package handler

import (
	"database/sql"
	"fmt"
	"log/slog"
	"net/http"
	"strings"

	"Marks/components"
	"Marks/internal/database"
)

func parseBookmarkWithDescriptionForm(r *http.Request, userID int64) (*database.AddBookmarkWithDescriptionParams, error) {
	titleSlice, ok := r.Form["title"]
	if !ok {
		return nil, fmt.Errorf("missing title")
	}
	title := strings.Join(titleSlice, " ")

	urlSlice, ok := r.Form["url"]
	if !ok {
		return nil, fmt.Errorf("missing url")
	}
	url := strings.Join(urlSlice, " ")

	descriptionSlice, ok := r.Form["description"]
	if !ok {
		return nil, fmt.Errorf("missing description")
	}
	description := strings.Join(descriptionSlice, " ")

	return &database.AddBookmarkWithDescriptionParams{
		UserID: userID,
		Url:    url,
		Title:  title,
		Description: sql.NullString{
			String: description,
			Valid:  description != "",
		},
	}, nil
}

func (h *Handler) PostBookmark(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		h.handleError(w, "fialed to parse form", err, http.StatusInternalServerError)
		return
	}

	username := r.PathValue("username")

	user, err := h.queries.GetUserByUsername(r.Context(), username)
	if err != nil {
		h.handleError(w, "could not get user by username", err, http.StatusNotFound)
		return
	}

	tagSlice, ok := r.Form["tag"]
	if !ok {
		h.handleErrorNoObject(w, "missing tag", http.StatusBadRequest)
		return
	}
	tagName := strings.Join(tagSlice, " ")

	bookmarkData, err := parseBookmarkWithDescriptionForm(r, user.ID)
	if err != nil {
		h.handleError(w, "malformed request", err, http.StatusBadRequest)
		return
	}

	newBookmark, err := h.queries.AddBookmarkWithDescription(r.Context(), *bookmarkData)
	if err != nil {
		h.handleError(w, "could not add bookmark to DB", err, http.StatusInternalServerError)
		return
	}

	tag, err := h.queries.AddTag(r.Context(), database.AddTagParams{
		UserID: user.ID,
		Name:   tagName,
	})
	if err != nil {
		h.handleError(w, "could not add tag to DB", err, http.StatusInternalServerError)
		return
	}

	// tag := &database.Tag{}

	if _, err := h.queries.AddBookmarkTag(r.Context(), database.AddBookmarkTagParams{
		BookmarkID: newBookmark.ID,
		TagID:      tag.ID,
	}); err != nil {
		h.handleError(w, "could not write to DB", err, http.StatusInternalServerError)
	}

	h.doRedirect(w, r, fmt.Sprintf("/home/%v", username), http.StatusSeeOther)
}

func (h *Handler) Home(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	if len(username) < 1 {
		h.doRedirect(w, r, "/login", http.StatusBadRequest)
		return
	}

	user, err := h.queries.GetUserByUsername(r.Context(), username)
	if err != nil {
		h.logger.Error("could not get user by username", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("error/%v", http.StatusNotFound), http.StatusNotFound)
		return
	}

	tags, err := h.queries.GetAllUserTags(r.Context(), user.ID)
	if err != nil {
		h.logger.Error("could not get tags by userID", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("error/%v", http.StatusNotFound), http.StatusNotFound)
		return
	}

	bookmarks, err := h.queries.GetAllUserBookmarks(r.Context(), user.ID)
	if err != nil {
		h.logger.Error("could not get bookmarks by userID", slog.Any("Error: ", err))
		h.doRedirect(w, r, fmt.Sprintf("error/%v", http.StatusNotFound), http.StatusNotFound)
		return
	}
	if len(bookmarks) < 1 {
		h.renderComponent(components.HomeNoBookmarks(username), w, r)
		return
	}

	h.renderComponent(components.Home(bookmarks, tags, username), w, r)
}
