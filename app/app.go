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
		negroni.NewStatic(http.Dir("public")),
		// 프론트 엔드 다 되면 public 바꾸거나 그쪽으로 심볼릭 걸것
	)

	n.UseHandler(r)

	r.HandleFunc("/auth/{vendor}/callback/{action}", controllers.AuthHandler).Methods("GET").Name("auth.callback")
	r.HandleFunc("/auth/{vendor}/{action}", controllers.AuthHandler).Methods("GET").Name("auth")
	r.HandleFunc("/auth/store", controllers.AuthStoreHandler).Methods("POST").Name("auth.store")
	r.HandleFunc("/", controllers.IndexHandler).Methods("GET")

	return n
}
