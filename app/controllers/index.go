package controllers

import (
	"net/http"
	"survey/app/controllers/auth"

	"github.com/gorilla/mux"
)

type authInstance struct{}

type authController interface {
	GetTokenHandler(w http.ResponseWriter, r *http.Request)
	StoreHandler(w http.ResponseWriter, r *http.Request)
	CheckSigned(w http.ResponseWriter, r *http.Request)
}

var Auth authController

func init() {
	Auth = &authInstance{}
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/index.html", http.StatusTemporaryRedirect)
}

func (a *authInstance) GetTokenHandler(w http.ResponseWriter, r *http.Request) {
	vendor := mux.Vars(r)["vendor"]
	action := mux.Vars(r)["action"]

	if vendor == "google" {
		auth.GoogleHandler(w, r, action)
	}

	if vendor == "kakao" {
		auth.KakaoHandler(w, r, action)
	}
}

func (a *authInstance) StoreHandler(w http.ResponseWriter, r *http.Request) {
	auth.Store(w, r)
}

func (a *authInstance) CheckSigned(w http.ResponseWriter, r *http.Request) {
	auth.CheckSigned(w, r)
}
