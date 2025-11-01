package middleware

import (
	"net/http"
	"slices"
)

type Midleware func(next http.Handler) http.Handler

func Chain(middlewares ...Midleware) Midleware {
	return func(next http.Handler) http.Handler {
		for _, x := range slices.Backward(middlewares) {
			next = x(next)
		}
		return next
	}
}
