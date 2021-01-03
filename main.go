package main

import (
	"net/http"

	"github.com/joho/godotenv"

	app "survey/app"
)

func main() {
	println("Server is now started")

	godotenv.Load()

	h := app.MakeHandler()

	err := http.ListenAndServe(":3001", h)
	if err != nil {
		panic(err)
	}

}
