//go:generate npx @tailwindcss/cli -i ./static/css/input.css -o ./static/css/style.css --minify
//go:generate templ generate
package main

import (
	"context"
	"embed"
	"log/slog"
	"os"
	"os/signal"

	"Marks/app"

	"github.com/joho/godotenv"
)

//go:embed static
var files embed.FS

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	if err := godotenv.Load(); err != nil {
		logger.Error("failed to load env vars", slog.Any("error", err))
	}

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	app, err := app.New(logger, app.Config{}, files)
	if err != nil {
		logger.Error("failed to create app", slog.Any("error", err))
	}

	if err := app.Start(ctx); err != nil {
		logger.Error("failed to start the app: ", slog.Any("error", err))
	}
}
