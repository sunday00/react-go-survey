package app

import (
	"net/http"
)

func Middlewares(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	CheckSignIn(w, r)

	//========

	next(w, r)
}

func CheckSignIn(w http.ResponseWriter, r *http.Request) {
	// if GetUserID(r) != "" {
	// 	if strings.Contains(r.URL.Path, "/sign") {
	// 		http.Redirect(w, r, "/todo.html", http.StatusTemporaryRedirect)
	// 		return
	// 	}
	// 	return
	// }

	// if strings.Contains(r.URL.Path, "/sign") || strings.Contains(r.URL.Path, "/auth") {
	// 	return
	// }

	// http.Redirect(w, r, "/sign.html", http.StatusTemporaryRedirect)
	// return
}
