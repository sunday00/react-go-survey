package main

import (
	"net/http"
	"time"

	"github.com/joho/godotenv"

	app "survey/app"
)

func main() {
	println("Server is now started")

	godotenv.Load()
	time.LoadLocation("Asia/Seoul")

	h := app.MakeHandler()

	err := http.ListenAndServe(":3001", h)
	if err != nil {
		panic(err)
	}

}
