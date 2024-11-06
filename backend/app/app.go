package app

import (
	"context"
	"embed"
	"errors"
	"fmt"
	"log/slog"
	"marks/app/db"
	"marks/app/middleware"
	"marks/utils"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/olivere/vite"
	"github.com/redis/go-redis/v9"
)

type App struct {
	logger *slog.Logger
	router *http.ServeMux
	db     *pgxpool.Pool
	rdb    *redis.Client
}

var (
	// go:embed all:dist
	dist embed.FS

	// go:embed all:public
	public embed.FS

	index_template = `<!doctype html>
	<html lang="en" class="h-full scroll-smooth">
	  <head>
		<meta charset="UTF-8" />
			{{ .Vite.Tags }}
	 </head>
	  <body class="min-h-screen antialiased">
		<div id="root"></div>
	  </body>
	</html>
	`
	nestedHTML = `<!doctype html>
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
</html>`
)

func New(logger *slog.Logger) *App {
	router := http.NewServeMux()

	redis_adr, exists := os.LookupEnv("REDIS_ADR")
	if !exists {
		redis_adr = "localhost:6379"
	}

	app := &App{
		logger: logger,
		router: router,
		rdb: redis.NewClient(&redis.Options{
			Addr: redis_adr,
		}),
	}

	return app
}

func (a *App) Start_dev(ctx context.Context) error {
	db, err := db.Connect(ctx, a.logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	a.db = db

	port_string, ok := os.LookupEnv("PORT")
	if !ok {
		return fmt.Errorf("failed to load port env var")
	}

	port, err := strconv.Atoi(string(port_string))
	if err != nil {
		fmt.Errorf("failed to convert string to int: %w", err)
	}

	a.router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		vite_handler, err := vite.NewHandler(vite.Config{
			FS:      os.DirFS("."),
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
			vite_handler.ServeHTTP(w, r)
			return
		}

		vite_handler.ServeHTTP(w, r)
	})

	return nil
}

func (a *App) Start(ctx context.Context) error {
	db, err := db.Connect(ctx, a.logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	a.db = db

	port_string, ok := os.LookupEnv("PORT")
	if !ok {
		return fmt.Errorf("failed to load port env var")
	}
	port, err := strconv.Atoi(string(port_string))
	if err != nil {
		return fmt.Errorf("failed to convert string to int: %w", err)
	}

	server := http.Server{
		Addr:    ":" + string(port),
		Handler: middleware.Logging(a.logger, a.router),
	}

	done := make(chan struct{})
	go func() {
		err := server.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			a.logger.Error("failed to listen and serve", slog.Any("error", err))
		}
		close(done)
	}()

	a.logger.Info("Server listening", slog.String("addr", ":"+string(port)))
	select {
	case <-done:
		break
	case <-ctx.Done():
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
		server.Shutdown(ctx)
		cancel()
	}

	return nil
}
