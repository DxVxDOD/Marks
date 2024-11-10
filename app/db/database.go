package db

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"marks/app/config"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	Err_missing_migrations_path = errors.New("MIGRATIONS_PATH env var not set")
	Err_missing_database_url    = errors.New("DB_URL env var not set")
)

func load_config_from_url() (*pgxpool.Config, error) {
	db_url, ok := os.LookupEnv("DB_URL")
	if !ok {
		return nil, fmt.Errorf("DB_URL env var not set")
	}

	config, err := pgxpool.ParseConfig(db_url)
	if err != nil {
		return nil, fmt.Errorf("failed to parse config: %w", err)
	}

	return config, nil
}

func load_config() (*pgxpool.Config, error) {
	cfg, err := config.NewDatabase()
	if err != nil {
		return load_config_from_url()
	}

	return pgxpool.ParseConfig(fmt.Sprintf(
		"user=%s password=%s host=%s port=%d db_name=%s ssl_mode=%s",
		cfg.Username, cfg.Password, cfg.Host, cfg.Port, cfg.DB_Name, cfg.SSL_Mode,
	))
}

func db_url() (string, error) {
	cfg, err := config.NewDatabase()
	if err != nil {
		db_url, ok := os.LookupEnv("DB_URL")
		if !ok {
			return "", fmt.Errorf("must set DB_URL env var")
		}

		return db_url, nil
	}

	return cfg.URL(), nil
}

func Connect(ctx context.Context, logger *slog.Logger) (*pgxpool.Pool, error) {
	config, err := load_config()
	if err != nil {
		return nil, err
	}

	conn, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return nil, fmt.Errorf("could not connect to database: %w", err)
	}

	logger.Debug("Running migrations")

	migrations_url, exists := os.LookupEnv("MIGRATIONS_URL")
	if !exists {
		migrations_url = "file://sql/migrations"
	}

	url, err := db_url()
	if err != nil {
		return nil, err
	}

	migrator, err := migrate.New(migrations_url, url)
	if err != nil {
		return nil, fmt.Errorf("migrate new: %s", err)
	}

	if err := migrator.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}

	return conn, nil
}
