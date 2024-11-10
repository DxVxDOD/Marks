package handler

import (
	"embed"
	"io/fs"
	"log/slog"
	"marks/internal/database"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Marks struct {
	Logger *slog.Logger
	Repo   *database.Queries
	FS     *fs.FS
}

var dist embed.FS

func New(logger *slog.Logger, db *pgxpool.Pool) *Marks {
	fs, err := fs.Sub(dist, "dist")
	if err != nil {
		panic(err)
	}
	return &Marks{
		Repo:   database.New(db),
		Logger: logger,
		FS:     &fs,
	}
}
