package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Puff struct {
	Name string `json:"name"`
}

func Get_all_bookmarks(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hello World!", r.URL.Path)
	puffy := Puff{Name: "Beea"}
	json, err := json.Marshal(puffy)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Write(json)
}
