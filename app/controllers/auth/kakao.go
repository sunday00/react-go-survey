package auth

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"

	"survey/app/libs"
)

func init() {
	godotenv.Load()

}

// GoogleHandler is http handler for google oauth2
func KakaoHandler(w http.ResponseWriter, r *http.Request, action string) {

	if strings.Contains(r.URL.Path, "/callback/register") {
		callbackHandler(w, r)
		return
	}

	if action == "register" {
		registerHandler(w, r)
		return
	}
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	state := generateStateOauthCookie(w)         // csrf
	libs.SetSimpleCookie("oauthstate", state, w) // csrf cookie

	option := oauth2.SetAuthURLParam("access_type", "offline")
	url := oauthConfig.AuthCodeURL(state, option) // redirect url for login
	fmt.Fprint(w, url)                            //response for react can redirect
}

func callbackHandler(w http.ResponseWriter, r *http.Request) {

	oauthState, _ := r.Cookie("oauthstate")

	if oauthState != nil && oauthState.Value == r.FormValue("state") {
		// TODO:: fix this
		libs.DelSimpleCookie("oauthstate", w) // empty csrf token.... but works weired...

		// data, _ := getGoogleUserInfoByPostForm(r.FormValue("code"), w)
		data, _ := getGoogleUserInfoByExchange(r.FormValue("code"), w, r) // result
		fmt.Fprint(w, string(data))                                       // json data for react
	}

}
