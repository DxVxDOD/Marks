package app

import (
	"fmt"
	"io/fs"
	"net/http"
	"os"

	"Marks/handler"
)

func (a *App) loadPages(router *http.ServeMux) {
	h := handler.New(a.logger, a.db)
	router.HandleFunc("GET /home/{username}", h.Home)
	router.HandleFunc("GET /home/{username}/{tag}", h.Home)
	router.HandleFunc("GET /error/{statusCode}", h.ErrorPage)
}

func (a *App) loadAPIs(router *http.ServeMux) {
	h := handler.New(a.logger, a.db)

	router.HandleFunc("POST /api/user", h.AddUser)
	router.HandleFunc("POST /api/bookmark/{username}", h.PostBookmark)
}

func (a *App) loadStaticFiles() (http.Handler, error) {
	if os.Getenv("BUILD_MODE") == "DEV" {
		return http.FileServer(http.Dir("static")), nil
	}

	static, err := fs.Sub(a.staticFiles, "static")
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
	a.loadAPIs(router)

	return router, nil
}
