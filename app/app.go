package app

import (
	"net/http"
	"survey/app/controllers"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
)

var rd *render.Render

func MakeHandler() http.Handler {

	rd = render.New()
	r := mux.NewRouter()

	n := negroni.New(
		negroni.NewRecovery(),
		negroni.NewLogger(),
		negroni.HandlerFunc(Middlewares),
		negroni.NewStatic(http.Dir("front/build")),
		// 프론트 엔드 다 되면 public 바꾸거나 그쪽으로 심볼릭 걸것
	)

	n.UseHandler(r)

	r.HandleFunc("/api/auth/{vendor}/callback/{action}", controllers.Auth.GetTokenHandler).Methods("GET").Name("auth.callback")
	r.HandleFunc("/api/auth/{vendor}/{action}", controllers.Auth.GetTokenHandler).Methods("GET").Name("auth")
	r.HandleFunc("/api/auth/store", controllers.Auth.StoreHandler).Methods("POST").Name("auth.store")
	r.HandleFunc("/api/auth/sign", controllers.Auth.SignHandler).Methods("POST").Name("auth.sign")
	r.HandleFunc("/api/auth/check", controllers.Auth.CheckSigned).Methods("POST").Name("auth.check")
	r.HandleFunc("/api/auth/signout", controllers.Auth.SignOut).Methods("POST").Name("auth.out")

	r.HandleFunc("/api/search/{thing}", controllers.Api.SearchHandler).Methods("GET").Name("search.jobs")

	r.HandleFunc("/api/survey/store", controllers.Survey.StoreSurvey).Methods("POST").Name("survey.store")
	r.HandleFunc("/api/survey/read/{survey}", controllers.Survey.ReadSurvey).Methods("GET").Name("survey.read")
	r.HandleFunc("/api/survey/answer/{survey}", controllers.Survey.StoreAnswer).Methods("POST").Name("survey.answer")

	r.HandleFunc("/api/survey/result/{survey}", controllers.Survey.ReadResults).Methods("GET").Name("survey.result")

	r.HandleFunc("/api/info/surveys", controllers.Survey.GetMySurveys).Methods("GET").Name("survey.my")
	r.HandleFunc("/api/surveys/index", controllers.Survey.GetAvailableSurveys).Methods("GET").Name("survey.available")

	r.NotFoundHandler = http.HandlerFunc(controllers.IndexHandler)

	return n
}
