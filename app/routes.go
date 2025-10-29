package app

import (
	"fmt"
	"io/fs"
	"net/http"
	"os"

	"Marks/components"
	"Marks/handler"

	"github.com/a-h/templ"
)

func (a *App) component(comp templ.Component) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html")
		if err := comp.Render(r.Context(), w); err != nil {
			a.logger.Error("failed to render component",
				"error", err,
				"path", r.URL.Path,
			)
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}
	})
}

func (a *App) loadPages(router *http.ServeMux) {
	router.Handle("GET /", a.component(components.Home()))
}

func (a *App) loadAPIs(router *http.ServeMux) {
	h := handler.New(a.logger, a.db)

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
	a.loadAPIs(router)

	return router, nil
}
