package main

import (
	"net/http"
	"time"

	app "survey/app"
	"survey/app/models"

	"github.com/joho/godotenv"
)

func main() {
	println("Server is now started")
	godotenv.Load()
	models.Conn()

	time.LoadLocation("Asia/Seoul")

	h := app.MakeHandler()

	err := http.ListenAndServe(":3001", h)
	if err != nil {
		panic(err)
	}

	models.Close()
}
