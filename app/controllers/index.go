package controllers

import (
	"net/http"
	"survey/app/controllers/auth"

	"github.com/gorilla/mux"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {

	http.Redirect(w, r, "/index.html", http.StatusTemporaryRedirect)
}

func AuthHandler(w http.ResponseWriter, r *http.Request) {
	vendor := mux.Vars(r)["vendor"]
	action := mux.Vars(r)["action"]

	if vendor == "google" {
		auth.GoogleHandler(w, r, action)
	}

	if vendor == "kakao" {
		auth.KakaoHandler(w, r, action)
	}

}

func AuthStoreHandler(w http.ResponseWriter, r *http.Request) {
	auth.Store(w, r)
}
