package app

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"strconv"
	"time"

	"Marks/middleware"

	_ "github.com/mattn/go-sqlite3"
)

type App struct {
	files    fs.FS
	logger   *slog.Logger
	config   Config
	sqliteDB *sql.DB
}

func getPort(defaultPort int) int {
	portStr, ok := os.LookupEnv("PORT")
	if !ok {
		return defaultPort
	}

	port, err := strconv.Atoi(portStr)
	if err != nil {
		return defaultPort
	}

	return port
}

func New(logger *slog.Logger, config Config, files fs.FS) (*App, error) {
	sqlitePath, ok := os.LookupEnv("SQLITE_PATH")
	if !ok {
		return nil, fmt.Errorf("missing SQLITE_PATH")
	}

	db, err := sql.Open("sqlite3", sqlitePath)
	if err != nil {
		return nil, fmt.Errorf("error opening db connection: %v", err)
	}

	db.SetMaxOpenConns(1)
	db.SetMaxIdleConns(1)
	db.SetConnMaxLifetime(0)

	if _, err := db.Exec("PRAGMA foreign_keys = ON;"); err != nil {
		return nil, fmt.Errorf("could not turn on foreign keys: %v", err)
	}

	if _, err := db.Exec("PRAGMA journal_mode = WAL;"); err != nil {
		return nil, fmt.Errorf("could not set WAL mode: %v", err)
	}

	return &App{
		config:   config,
		logger:   logger,
		files:    files,
		sqliteDB: db,
	}, nil
}

func (a *App) Start(ctx context.Context) error {
	if err := a.sqliteDB.PingContext(ctx); err != nil {
		return fmt.Errorf("pinged sqlite: %v", err)
	}

	router, err := a.loadRoutes()
	if err != nil {
		return fmt.Errorf("failed to load routes: %w", err)
	}

	middlewares := middleware.Chain(middleware.Logging(a.logger))

	port := getPort(3000)

	server := &http.Server{
		Addr:           fmt.Sprintf(":%d", port),
		Handler:        middlewares(router),
		MaxHeaderBytes: 1 << 20,
	}

	errCh := make(chan error, 1)

	go func() {
		err := server.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- fmt.Errorf("failed to listen and serve: %w", err)
		}

		close(errCh)
	}()

	a.logger.Info("server running", slog.Int("port: ", port))

	select {
	case <-ctx.Done():
		break
	case err := <-errCh:
		return err
	}

	serverCtx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	if err := server.Shutdown(serverCtx); err != nil {
		return fmt.Errorf("failed to shudown gracefully: %v", err)
	}

	return nil
}
