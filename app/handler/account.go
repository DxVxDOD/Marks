package handler

import (
	"marks/utils"
	"net/http"
	"os"

	"github.com/olivere/vite"
)

var account_html = `<!doctype html>
<html lang="en" class="h-full scroll-smooth">
  <head>
    <meta charset="UTF-8" />
	{{- if .Metadata }}
		{{ .Metadata }}
	{{- end }}
	{{- if .IsDev }}
		{{ .PluginReactPreamble }}
		<script type="module" src="{{ .ViteURL }}/@vite/client"></script>
		{{ if ne .ViteEntry "" }}
			<script type="module" src="{{ .ViteURL }}/{{ .ViteEntry }}"></script>
		{{ else }}
			<script type="module" src="{{ .ViteURL }}/src/main.tsx"></script>
		{{ end }}
	{{- else }}
		{{- if .StyleSheets }}
		{{ .StyleSheets }}
		{{- end }}
		{{- if .Modules }}
		{{ .Modules }}
		{{- end }}
		{{- if .PreloadModules }}
		{{ .PreloadModules }}
		{{- end }}
	{{- end }}
	{{- if .Scripts }}
		{{ .Scripts }}
	{{- end }}
 </head>
  <body class="min-h-screen antialiased">
    <div id="root"></div>
  </body>
</html>
`

func (h *Marks) Account_dev(w http.ResponseWriter, r *http.Request) {
	// Handle the vite server
	vite_handler, err := vite.NewHandler(vite.Config{
		FS:        os.DirFS("frontend"),
		IsDev:     true,
		ViteEntry: "src/account.tsx",
		ViteURL:   "http://localhost:5173",
	})
	if err != nil {
		utils.Respond_error(w, 500, http.StatusText(http.StatusInternalServerError)+err.Error())
		return
	}

	vite_handler.RegisterTemplate("/account", account_html)

	if r.URL.Path == "/account" {
		// Server the index.html.file
		ctx := r.Context()
		ctx = vite.MetadataToContext(ctx, vite.Metadata{
			Title: "Hello puff",
		})
		ctx = vite.ScriptsToContext(ctx, `<script>console.log('Hello Nested!, nice to meet you in the console!')</script>`)
		vite_handler.ServeHTTP(w, r.WithContext(ctx))
		return
	}

	vite_handler.ServeHTTP(w, r)
}

// Below production handlers to separate the file servers

func (h *Marks) Account(w http.ResponseWriter, r *http.Request) {
	// Create a new handler
	vite_handler, err := vite.NewHandler(vite.Config{
		FS:        *h.FS,
		IsDev:     false,
		ViteEntry: "frontend/account.tsx",
	})
	if err != nil {
		utils.Respond_error(w, 500, http.StatusText(http.StatusInternalServerError))
		return
	}

	vite_handler.RegisterTemplate("/account", account_html)

	if r.URL.Path == "/account" {
		// Server the index.html file
		ctx := r.Context()
		ctx = vite.MetadataToContext(ctx, vite.Metadata{
			Title: "Need to change",
		})
		ctx = vite.ScriptsToContext(ctx, `<script>console.log('Hello Nested, nice to meet you in the console!')</script>`)
		vite_handler.ServeHTTP(w, r.WithContext(ctx))
		return
	}

	vite_handler.ServeHTTP(w, r)
}
