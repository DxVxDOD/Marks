package handler

import (
	"fmt"
	"net/http"
	"strings"
)

type BookmarkForm struct {
	URL         string
	Title       string
	TagName     string
	Description string
}

func parseBookmarkForm(r *http.Request) (*BookmarkForm, error) {
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

	tagSlice, ok := r.Form["tag"]
	if !ok {
		return nil, fmt.Errorf("missing tag")
	}
	tagName := strings.Join(tagSlice, " ")

	descriptionSlice := r.Form["description"]
	description := strings.Join(descriptionSlice, " ")

	return &BookmarkForm{
		URL:         url,
		Title:       title,
		TagName:     tagName,
		Description: description,
	}, nil
}
