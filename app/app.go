package app

import (
	"net/http"
	"survey/app/controllers"

	"github.com/gorilla/pat"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
)

var rd *render.Render

func MakeHandler() http.Handler {

	rd = render.New()
	r := pat.New()

	n := negroni.New(
		negroni.NewRecovery(),
		negroni.NewLogger(),
		negroni.HandlerFunc(Middlewares),
		negroni.NewStatic(http.Dir("public")),
	)
	// 프론트 엔드 다 되면 public 바꾸거나 그쪽으로 심볼릭 걸것
	n.UseHandler(r)

	r.Get("/", controllers.IndexHandler)

	return n
}
