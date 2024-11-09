package app

import (
	"context"
	"errors"
	"fmt"
	"log"
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
	Logger *slog.Logger
	Router *http.ServeMux
	DB     *pgxpool.Pool
	RDB    *redis.Client
}

func New(logger *slog.Logger) *App {
	router := http.NewServeMux()

	redis_adr, exists := os.LookupEnv("REDIS_ADR")
	if !exists {
		redis_adr = "localhost:6379"
	}

	app := &App{
		Logger: logger,
		Router: router,
		RDB: redis.NewClient(&redis.Options{
			Addr: redis_adr,
		}),
	}

	return app
}

func (a *App) Start_dev(ctx context.Context) error {
	db, err := db.Connect(ctx, a.Logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	a.DB = db

	port_string, ok := os.LookupEnv("PORT")
	if !ok {
		return fmt.Errorf("failed to load port env var")
	}

	log.Print(port_string)

	port, err := strconv.Atoi(string(port_string))
	if err != nil {
		return fmt.Errorf("failed to convert string to int: %w", err)
	}

	port_verified := strconv.Itoa(port)

	log.Print(port)

	a.load_dev_routes()

	server := http.Server{
		Addr:    ":" + port_verified,
		Handler: middleware.Logging(a.Logger, a.Router),
	}

	done := make(chan struct{})
	go func() {
		err := server.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			a.Logger.Error("failed to listen and serve", slog.Any("error", err))
		}
		close(done)
	}()

	a.Logger.Info("Server listening", slog.String("addr", ":"+port_verified))
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

func (a *App) Start(ctx context.Context) error {
	db, err := db.Connect(ctx, a.Logger)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	a.DB = db

	port_string, ok := os.LookupEnv("PORT")
	if !ok {
		return fmt.Errorf("failed to load port env var")
	}
	port, err := strconv.Atoi(string(port_string))
	if err != nil {
		return fmt.Errorf("failed to convert string to int: %w", err)
	}

	port_verified := strconv.Itoa(port)

	server := http.Server{
		Addr:    ":" + port_verified,
		Handler: middleware.Logging(a.Logger, a.Router),
	}

	a.load_routes()

	done := make(chan struct{})
	go func() {
		err := server.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			a.Logger.Error("failed to listen and serve", slog.Any("error", err))
		}
		close(done)
	}()

	a.Logger.Info("Server listening", slog.String("addr", ":"+port_verified))
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
