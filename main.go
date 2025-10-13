package main

import (
	"log"
	"net/http"

	"Marks/components"
	"Marks/handler"
)

func main() {
	router := http.NewServeMux()

	router.Handle("GET /", handler.Component(components.Home()))
	router.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	server := http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	log.Println("Starting server on port :8080")
	server.ListenAndServe()
}
