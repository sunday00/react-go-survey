package app

import (
	"net/http"
	"os"
	"survey/app/libs"

	"github.com/sunday00/go-console"

	"github.com/joho/godotenv"
)

func Middlewares(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	godotenv.Load()
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("CLIENT_DOMAIN"))
	w.Header().Set("credentials", "true")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	CheckCSRF(w, r, CheckSignIn)
	CheckSignIn(w, r)

	//========

	next(w, r)
}

func CheckCSRF(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	csrf, _ := r.Cookie("csrf")
	console.KeyValue("csrf", csrf)

	next(w, r)
}

func CheckSignIn(w http.ResponseWriter, r *http.Request) {

	user := libs.GetSimpleSession("user.User", r)

	console.PrintColoredLn(user, console.Success)
}
