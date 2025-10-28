package app

import (
	"fmt"
	"io/fs"
	"net/http"
	"os"

	"Marks/components"
	"Marks/handler"
)

func (a *App) loadPages(router *http.ServeMux) {
	h := handler.New(a.logger, a.sqliteDB)

	router.Handle("GET /", h.Component(components.Home()))

	router.HandleFunc("GET /api/user/{id}", h.GetUserMarks)
	router.HandleFunc("POST /api/user", h.AddUser)
}

func (a *App) loadStaticFiles() (http.Handler, error) {
	if os.Getenv("BUILD_MODE") == "DEV" {
		return http.FileServer(http.Dir("static")), nil
	}

	static, err := fs.Sub(a.files, "static")
	if err != nil {
		return nil, fmt.Errorf("failed to load subdir static: %w", err)
	}

	return http.FileServerFS(static), nil
}

func (a *App) loadRoutes() (http.Handler, error) {
	static, err := a.loadStaticFiles()
	if err != nil {
		return nil, fmt.Errorf("failed to load static files: %w", err)
	}

	router := http.NewServeMux()

	router.Handle("GET /static/", http.StripPrefix("/static/", static))

	a.loadPages(router)

	return router, nil
}
