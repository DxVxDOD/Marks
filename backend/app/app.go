package app

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"marks/app/db"
	"marks/app/middleware"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type App struct {
	logger *slog.Logger
	router *http.ServeMux
	db     *pgxpool.Pool
	rdb    *redis.Client
}

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
