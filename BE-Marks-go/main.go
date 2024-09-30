package main

import (
	"log"
	"net/http"

	"github.com/DxVxDOD/Marks/tree/go-back-end/handlers"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env files")
	}

	router := http.NewServeMux()

	router.HandleFunc("GET /", handlers.Get_all_bookmarks)

	server := http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	log.Println("Starting server on port :8080")

	server.ListenAndServe()
}
