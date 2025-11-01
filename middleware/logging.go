package middleware

import (
	"log/slog"
	"net/http"
	"time"
)

type wrappedResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (w *wrappedResponseWriter) WriteHeader(statusCode int) {
	w.statusCode = statusCode
	w.ResponseWriter.WriteHeader(statusCode)
}

func logger(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		wrapped := &wrappedResponseWriter{
			ResponseWriter: w,
		}

		wrapped.statusCode = http.StatusOK

		start := time.Now()
		next.ServeHTTP(wrapped, r)
		duration := time.Since(start)

		logger.Info("hanled request",
			slog.String("method: ", r.Method),
			slog.String("path: ", r.URL.Path),
			slog.Int64("duration ns: ", duration.Nanoseconds()),
			slog.Int("status: ", wrapped.statusCode),
			slog.String("remote_addr: ", r.RemoteAddr),
			slog.String("x-forwarded-for", r.Header.Get("X-Forwarded-For")),
		)
	})
}

func Logging(logFunc *slog.Logger) Midleware {
	return func(next http.Handler) http.Handler {
		return logger(logFunc, next)
	}
}
