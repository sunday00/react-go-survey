package controllers

import (
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {

	http.Redirect(w, r, "/index.html", http.StatusTemporaryRedirect)
}
