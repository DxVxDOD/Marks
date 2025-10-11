package main

import (
	"log"
	"net/http"
)

func main() {
	router := http.NewServeMux()
	router.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Hello, Puff, Mom, Dad, Ari")
	})

	server := http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	log.Println("Starting server on port :8080")
	server.ListenAndServe()
}
