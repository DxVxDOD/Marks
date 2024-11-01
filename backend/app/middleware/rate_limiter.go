package middleware

import (
	"marks/utils"
	"math"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/redis/go-redis/v9"
)

type Rate_Limiter struct {
	Period   time.Duration
	Max_Rate int64
	Store    *redis.Client
}

var re = regexp.MustCompile(`\s?,\s?`)

func (rl *Rate_Limiter) write_rate_limit_headers(w http.ResponseWriter, used int64, expire_time time.Duration) {
	limit := rl.Max_Rate
	remaining := int64(math.Max(float64(limit-used), 0))
	reset := int64(math.Ceil(expire_time.Seconds()))

	w.Header().Add("X-RateLimit-Limit", strconv.FormatInt(limit, 10))
	w.Header().Add("X-RateLimit-Remaining", strconv.FormatInt(remaining, 10))
	w.Header().Add("X-RateLimit-Reset", strconv.FormatInt(reset, 10))
}

func (rl *Rate_Limiter) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Obtain the client IP form the XFF header
		client_ip := re.Split(r.Header.Get("X-Forwarded-For"), -1)[0]

		// If the xff header is empty, obtain the IP from the remoteAddr
		if client_ip == "" {
			parts := strings.Split(r.RemoteAddr, ":")
			client_ip = strings.Join(parts[0:len(parts)-1], ":")
		}

		now := time.Now()

		// Add the current event to the store
		rl.Store.ZAdd(r.Context(), client_ip, redis.Z{
			Member: now.UnixMicro(),
			Score:  float64(now.UnixMicro()),
		})

		// Calculate the cutoff
		cutoff := now.Add(rl.Period * -1).UnixMicro()

		// Remove all events before the cutoff
		rl.Store.ZRemRangeByScore(r.Context(), client_ip, "-inf", strconv.FormatInt(cutoff, 10))

		// Pull the remaining events from the sorted set
		events, _ := rl.Store.ZRange(r.Context(), client_ip, 0, -1).Result()

		// Get the earliest event time
		earliest_micro, _ := strconv.ParseInt(events[0], 10, 64)
		earliest := time.UnixMicro(earliest_micro)

		// Calculate how long until it resets and how many events have occurred
		resets := rl.Period - time.Since(earliest)
		event_count := int64(len(events))

		// write the rate limit headers
		rl.write_rate_limit_headers(w, event_count, resets)

		if event_count > rl.Max_Rate {
			utils.Respond_error(w, http.StatusTooManyRequests, http.StatusText(http.StatusTooManyRequests))
			return
		}

		next.ServeHTTP(w, r)
	})
}
