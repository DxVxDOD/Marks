package handler

import (
	"database/sql"
	"fmt"
	"log/slog"
	"net/http"
	"strconv"
	"strings"

	"Marks/components"
	"Marks/internal/database"
)

func parseBookmarkForm(r http.Request) (*database.AddBookmarkWithDescriptionParams, error) {
	userIDSlice, ok := r.Form["userID"]
	if !ok {
		return nil, fmt.Errorf("missing userID")
	}

	strUserID := strings.Join(userIDSlice, " ")

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

func (h *Handler) AddBookmark(w http.ResponseWriter, r http.Request) {
	if err := r.ParseForm(); err != nil {
		h.logger.Error("fialed to parse form", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	bookmark, err := parseBookmarkForm(r)
	if err != nil {
		h.logger.Error("Malformed request", slog.Any("error", err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if _, err := h.queries.AddBookmarkWithDescription(r.Context(), *bookmark); err != nil {
		h.logger.Error("could not write to DB", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}

	uri := fmt.Sprintf("%s://%s/%d", scheme, r.Host, bookmark.UserID)

	http.Redirect(w, &r, uri, http.StatusCreated)
}

func (h *Handler) RenderBookmarksByUserID(w http.ResponseWriter, r http.Request) {
	bookmarks, err := h.queries.GetAllUserBookmarks(r.Context(), 0)
	if err != nil {
		h.logger.Error("could not retrieve bookmarks", slog.Any("error", err))
		w.WriteHeader(http.StatusNotFound)
		return
	}

	if err := components.BookmarksByUserID(bookmarks).Render(r.Context(), w); err != nil {
		h.logger.Error("Failed to render user bookmarks page", slog.Any("error", err))
	}
}
