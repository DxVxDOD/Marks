package handler

import (
	"fmt"
	"log/slog"
	"net/http"

	"Marks/components"
)

// func parseBookmarkWithDescriptionForm(r *http.Request, userID int64) (*database.AddBookmarkWithDescriptionParams, error) {
// 	titleSlice, ok := r.Form["title"]
// 	if !ok {
// 		return nil, fmt.Errorf("missing title")
// 	}
// 	title := strings.Join(titleSlice, " ")
//
// 	urlSlice, ok := r.Form["url"]
// 	if !ok {
// 		return nil, fmt.Errorf("missing url")
// 	}
// 	url := strings.Join(urlSlice, " ")
//
// 	descriptionSlice, ok := r.Form["description"]
// 	if !ok {
// 		return nil, fmt.Errorf("missing description")
// 	}
// 	description := strings.Join(descriptionSlice, " ")
//
// 	return &database.AddBookmarkWithDescriptionParams{
// 		UserID: userID,
// 		Url:    url,
// 		Title:  title,
// 		Description: sql.NullString{
// 			String: description,
// 			Valid:  description != "",
// 		},
// 	}, nil
// }

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
