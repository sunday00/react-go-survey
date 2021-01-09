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
	CheckSignIn(w, r)

	//========

	next(w, r)
}

func CheckSignIn(w http.ResponseWriter, r *http.Request) {
	user := libs.GetSimpleSession("user.User", r)

	console.PrintColoredLn(user["Gender"], console.Success)
}
