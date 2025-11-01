package handler

import (
	"fmt"
	"log/slog"
	"net/http"
	"strconv"
	"strings"

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
		UserID:      userID,
		Url:         url,
		Title:       title,
		Description: description,
	}
}

func (h *Handler) AddBookmark(w http.ResponseWriter, r http.Request) {
	if err := r.ParseForm(); err != nil {
		h.logger.Error("fialed to parse form", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// bookmarkData := &database.AddBookmarkWithDescriptionParams{}
	// newBookmark, err := h.queries.AddBookmarkWithDescription(r.Context(), &database.AddBookmarkWithDescriptionParams{
	// 	userID,
	// 	url,
	// })
}
