package controllers

import (
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"survey/app/controllers/api"
	"survey/app/controllers/auth"
	"survey/app/controllers/survey"

	"github.com/gorilla/mux"
	"github.com/sunday00/go-console"
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

type surveyInstance struct{}

type surveyControllers interface {
	StoreSurvey(w http.ResponseWriter, r *http.Request)
	ReadSurvey(w http.ResponseWriter, r *http.Request)
	StoreAnswer(w http.ResponseWriter, r *http.Request)
	ReadResults(w http.ResponseWriter, r *http.Request)
	GetMySurveys(w http.ResponseWriter, r *http.Request)
	GetAvailableSurveys(w http.ResponseWriter, r *http.Request)
}

var Survey surveyControllers

func init() {
	Auth = &authInstance{}
	Api = &apiInstance{}
	Survey = &surveyInstance{}
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	// http.Redirect(w, r, "/index.html", http.StatusTemporaryRedirect)

	if strings.Contains(r.URL.Path, "static") {
		reg, _ := regexp.Compile(".+\\/static")
		uri := fmt.Sprint(reg.ReplaceAllString(r.URL.Path, ""))
		console.KeyValue("t:", uri)

		http.ServeFile(w, r, "front/build/static"+uri)
	} else {
		http.ServeFile(w, r, "front/build/index.html")
	}
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

func (s *surveyInstance) StoreSurvey(w http.ResponseWriter, r *http.Request) {
	survey.StoreSurvey(w, r)
}

func (s *surveyInstance) ReadSurvey(w http.ResponseWriter, r *http.Request) {
	survey.ReadSurvey(w, r)
}

func (s *surveyInstance) StoreAnswer(w http.ResponseWriter, r *http.Request) {
	survey.StoreAnswer(w, r)
}

func (s *surveyInstance) ReadResults(w http.ResponseWriter, r *http.Request) {
	survey.ReadResults(w, r)
}

func (s *surveyInstance) GetMySurveys(w http.ResponseWriter, r *http.Request) {
	survey.GetMySurveys(w, r)
}

func (s *surveyInstance) GetAvailableSurveys(w http.ResponseWriter, r *http.Request) {
	survey.GetAvailableSurveys(w, r)
}
