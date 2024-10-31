package app

import (
	"context"
	"log/slog"
	"net/http"
	"os"

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

}
