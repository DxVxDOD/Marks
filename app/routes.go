package app

import (
	"marks/app/handler"
	"net/http"
)

func (a *App) load_dev_routes() {
	public := handler.New(a.Logger, a.DB)
	user := handler.New(a.Logger, a.DB)
	// rate_limiter := middleware.Rate_Limiter{
	// 	Period:   time.Minute,
	// 	Max_Rate: 2,
	// 	Store:    a.rdb,
	// }

	// Public
	a.Router.Handle("/", http.HandlerFunc(public.Home_Dev))

	// User access routes
	a.Router.Handle("/account", http.HandlerFunc(user.Account_dev))

}

func (a *App) load_routes() {
	public := handler.New(a.Logger, a.DB)
	user := handler.New(a.Logger, a.DB)

	// Public access routes
	a.Router.Handle("/", http.HandlerFunc(public.Home))

	// User access routes
	a.Router.HandleFunc("/account", http.HandlerFunc(user.Account))
}
