package handler

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"Marks/components"
	"Marks/internal/database"
)

func parseBookmarkWithDescriptionForm(r *http.Request) (*database.AddBookmarkWithDescriptionParams, error) {
	strUserID := r.PathValue("userID")
	userID, err := strconv.ParseInt(strUserID, 10, 64)
	if err != nil {
		return nil, fmt.Errorf("userID not int")
	}

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

func (h *Handler) AddBookmark(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		h.handleError(w, "fialed to parse form", err, http.StatusInternalServerError)
		return
	}

	bookmark, err := parseBookmarkWithDescriptionForm(r)
	if err != nil {
		h.handleError(w, "malformed request", err, http.StatusBadRequest)
		return
	}

	if _, err := h.queries.AddBookmarkWithDescription(r.Context(), *bookmark); err != nil {
		h.handleError(w, "could not write to DB", err, http.StatusInternalServerError)
		return
	}

	// scheme := "http"
	// if r.TLS != nil {
	// 	scheme = "https"
	// }
	//
	// uri := fmt.Sprintf("%s://%s/%d", scheme, r.Host, bookmark.UserID)

	// http.Redirect(w, r, uri, http.StatusCreated)
}

func (h *Handler) RenderBookmarksByUserID(w http.ResponseWriter, r *http.Request) {
	bookmarks, err := h.queries.GetAllUserBookmarks(r.Context(), 1)
	if err != nil {
		h.handleError(w, "could not write to DB could not retrieve bookmarks", err, http.StatusNotFound)
		return
	}

	if err := components.BookmarksByUserID(bookmarks).Render(r.Context(), w); err != nil {
		h.handleError(w, "failed to render user bookmarks page", err, http.StatusInternalServerError)
	}
}
