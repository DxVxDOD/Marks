package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"Marks/internal/database"
)

func parseUserForm(r *http.Request) (*database.AddUserParams, error) {
	usernameSlice, ok := r.Form["username"]
	if !ok {
		return nil, fmt.Errorf("missing username")
	}
	username := strings.Join(usernameSlice, " ")

	passwordSlice, ok := r.Form["password"]
	if !ok {
		return nil, fmt.Errorf("missing password")
	}
	password := strings.Join(passwordSlice, " ")

	return &database.AddUserParams{
		Username:     username,
		PasswordHash: password,
		Email: sql.NullString{
			Valid: false,
		},
	}, nil
}

func (h *Handler) AddUser(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		h.handleError(w, "faild to parse request form", err, http.StatusInternalServerError)
	}

	userData, err := parseUserForm(r)
	if err != nil {
		h.handleError(w, err.Error(), err, http.StatusBadRequest)
		return
	}

	if _, err := h.queries.AddUser(r.Context(), *userData); err != nil {
		h.handleError(w, "failed to create user", err, http.StatusInternalServerError)
		return
	}
}

func (h *Handler) GetUserByUsername(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	user, err := h.queries.GetUserByUsername(r.Context(), username)
	if err != nil {
		h.handleError(w, "could not get user by id", err, http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}
