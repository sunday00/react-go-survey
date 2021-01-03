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

	r.HandleFunc("/auth/{vendor}/{action}", controllers.AuthHandler).Methods("GET").Name("auth")
	r.HandleFunc("/", controllers.IndexHandler).Methods("GET")

	return n
}
