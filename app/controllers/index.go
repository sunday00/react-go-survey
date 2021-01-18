package controllers

import (
	"net/http"
	"survey/app/controllers/api"
	"survey/app/controllers/auth"

	"github.com/gorilla/mux"
)

type authInstance struct{}

type authController interface {
	GetTokenHandler(w http.ResponseWriter, r *http.Request)
	StoreHandler(w http.ResponseWriter, r *http.Request)
	CheckSigned(w http.ResponseWriter, r *http.Request)
	SignHandler(w http.ResponseWriter, r *http.Request)
	SignOut(w http.ResponseWriter, r *http.Request)
}

var Auth authController

type apiInstance struct{}

type apiControllers interface {
	SearchHandler(w http.ResponseWriter, r *http.Request)
}

var Api apiControllers

func init() {
	Auth = &authInstance{}
	Api = &apiInstance{}
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
	auth.ResponseJWTAndSessionProcess("store", w, r)
}

func (a *authInstance) CheckSigned(w http.ResponseWriter, r *http.Request) {
	auth.CheckSigned(w, r)
}

func (a *authInstance) SignHandler(w http.ResponseWriter, r *http.Request) {
	auth.ResponseJWTAndSessionProcess("sign", w, r)
}

func (a *authInstance) SignOut(w http.ResponseWriter, r *http.Request) {
	auth.SignOut(w, r)
}

func (a *apiInstance) SearchHandler(w http.ResponseWriter, r *http.Request) {
	thing := mux.Vars(r)["thing"]
	// action := mux.Vars(r)["action"]

	if thing == "initialTags" {
		api.GetInitialTags(w, r)
	}

	if thing == "jobs" {
		api.GetAllJobs(w, r)
	}

	if thing == "groups" {
		api.GetAllGroups(w, r)
	}

	if thing == "subGroups" {
		api.GetAllSubGroups(w, r)
	}

	if thing == "interests" {
		api.GetAllInterests(w, r)
	}
}
