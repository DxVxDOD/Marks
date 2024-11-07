package main

import (
	"context"
	"log/slog"
	"marks/app"
	"os"
	"os/signal"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)

	dev, ok := os.LookupEnv("DEV")
	if ok {
		defer cancel()

		a := app.New(logger)

		if err := a.Start_dev(ctx); err != nil {
			logger.Error("failed to start server"+dev, slog.Any("error", err))
		}
	} else {
		defer cancel()

		a := app.New(logger)

		if err := a.Start(ctx); err != nil {
			logger.Error("failed to start server", slog.Any("error", err))
		}
	}

}
