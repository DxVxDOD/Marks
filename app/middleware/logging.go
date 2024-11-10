package middleware

import (
	"log/slog"
	"net/http"
	"time"
)

type wrapped_writer struct {
	http.ResponseWriter
	status_code int
}

func (w *wrapped_writer) Write_header(status_code int) {
	w.ResponseWriter.WriteHeader(status_code)
	w.status_code = status_code
}

func Logging(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		wrapped := &wrapped_writer{
			ResponseWriter: w,
			status_code:    http.StatusOK,
		}

		next.ServeHTTP(wrapped, r)

		logger.Info(
			"handle request",
			slog.Int("statusCode", wrapped.status_code),
			slog.String("remoteAddr", r.RemoteAddr),
			slog.String("xffHeader", r.Header.Get("X-Forwarded-For")),
			slog.String("method", r.Method),
			slog.String("path", r.URL.Path),
			slog.Any("duration", time.Since(start)),
		)
	})
}
