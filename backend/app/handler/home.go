package handler

import (
	"marks/utils"
	"net/http"
	"os"

	"github.com/olivere/vite"
)

func (h *Marks) Home_Dev(w http.ResponseWriter, r *http.Request) {
	vite_handler, err := vite.NewHandler(vite.Config{
		FS:      os.DirFS("./frontend"),
		IsDev:   true,
		ViteURL: "http://localhost:5173",
	})
	if err != nil {
		utils.Respond_error(w, 500, http.StatusText(http.StatusInternalServerError))
		return
	}

	if r.URL.Path == "/" || r.URL.Path == "/index.html" {
		// Server the index.html file
		ctx := r.Context()
		ctx = vite.MetadataToContext(ctx, vite.Metadata{
			Title: "Hello Puffy",
		})
		ctx = vite.ScriptsToContext(ctx, `<script>console.log('Hello, nice to meet you in the console!')</script>`)
		vite_handler.ServeHTTP(w, r.WithContext(ctx))
		return
	}

	vite_handler.ServeHTTP(w, r)
}

func (h *Marks) Home(w http.ResponseWriter, r *http.Request) {
	// Create a new handler
	vite_handler, err := vite.NewHandler(vite.Config{
		FS:    *h.FS,
		IsDev: false,
	})
	if err != nil {
		utils.Respond_error(w, 500, http.StatusText(http.StatusInternalServerError))
		return
	}

	if r.URL.Path == "/" || r.URL.Path == "index.html" {
		// Server the index.html file
		ctx := r.Context()
		ctx = vite.MetadataToContext(ctx, vite.Metadata{
			Title: "Need to edit",
		})
		ctx = vite.ScriptsToContext(ctx, `<script>console.log('Hello, nice to meet you in the console!')</script>`)
		vite_handler.ServeHTTP(w, r.WithContext(ctx))
		return
	}

	vite_handler.ServeHTTP(w, r)
}
