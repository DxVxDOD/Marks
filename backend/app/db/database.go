package db

import (
	"errors"
	"fmt"
	"os"

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
	cfg, err := 
}
