package main

import (
	"net/http"

	app "survey/app"
)

func main() {
	println("Server is now started")

	h := app.MakeHandler()

	err := http.ListenAndServe(":3001", h)
	if err != nil {
		panic(err)
	}

}
