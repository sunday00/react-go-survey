package app

import (
	"net/http"
	"survey/app/controllers"
	"survey/app/models"

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
		negroni.NewStatic(http.Dir("public")),
		// 프론트 엔드 다 되면 public 바꾸거나 그쪽으로 심볼릭 걸것
	)

	n.UseHandler(r)

	r.HandleFunc("/auth/{vendor}/callback/{action}", controllers.Auth.GetTokenHandler).Methods("GET").Name("auth.callback")
	r.HandleFunc("/auth/{vendor}/{action}", controllers.Auth.GetTokenHandler).Methods("GET").Name("auth")
	r.HandleFunc("/auth/store", controllers.Auth.StoreHandler).Methods("POST").Name("auth.store")
	r.HandleFunc("/auth/check", controllers.Auth.CheckSigned).Methods("POST").Name("auth.check")

	r.HandleFunc("/", controllers.IndexHandler).Methods("GET")

	models.DB.Close()

	return n
}
