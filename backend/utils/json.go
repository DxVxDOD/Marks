package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

type error_response struct {
	Error string `json:"error"`
}

func Respond_JSON(w http.ResponseWriter, status int, payload interface{}) {
	data, err := json.Marshal(payload)
	if err != nil {
		log.Printf("failed to marshal json response: %v", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(http.StatusText(http.StatusInternalServerError)))
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(data)
}

func Respond_error(w http.ResponseWriter, status int, message string) {
	if status >= 500 {
		log.Printf("responding with 5xx level error: %v", message)
	}

	Respond_JSON(w, status, error_response{Error: message})
}
