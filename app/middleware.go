package app

import (
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func Middlewares(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	godotenv.Load()
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("CLIENT_DOMAIN"))
	w.Header().Set("credentials", "true")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
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
