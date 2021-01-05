package auth

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"survey/app/libs"
)

var oauthConfig = oauth2.Config{
	RedirectURL:  "",
	ClientID:     "",
	ClientSecret: "",
	Scopes: []string{
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/user.birthday.read",
		"https://www.googleapis.com/auth/user.gender.read",
		"openid",
	},
	Endpoint: google.Endpoint,
}

func init() {
	godotenv.Load()
	oauthConfig.ClientID = os.Getenv("GOOGLE_CLIENT_ID")
	oauthConfig.ClientSecret = os.Getenv("GOOGLE_SECRET_KEY")
	oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/google/callback/register"
}

// GoogleHandler is http handler for google oauth2
func GoogleHandler(w http.ResponseWriter, r *http.Request, action string) {

	if strings.Contains(r.URL.Path, "/callback/register") {
		googleCallbackHandler(w, r)
		return
	}

	if action == "register" {
		googleRegisterHandler(w, r)
		return
	}
}

func generateStateOauthCookie(w http.ResponseWriter) string {
	b := make([]byte, 16)
	rand.Read(b)
	state := base64.StdEncoding.EncodeToString(b)

	return state
}

func getGoogleUserInfoByPostForm(code string, w http.ResponseWriter) ([]byte, error) {

	client := http.Client{}

	resp, err := client.PostForm("https://www.googleapis.com/oauth2/v4/token",
		url.Values{
			"code":          {code},
			"client_id":     {oauthConfig.ClientID},
			"client_secret": {oauthConfig.ClientSecret},
			"redirect_uri":  {oauthConfig.RedirectURL},
			"grant_type":    {"authorization_code"},
			"access_type":   {"offline"},
		},
	)

	data, err := ioutil.ReadAll(resp.Body)

	body := make(map[string]interface{})
	err = json.Unmarshal(data, &body)

	println(body["access_token"].(string))
	println(body["id_token"].(string))

	return data, err
}

func getGoogleUserInfoByExchange(code string, w http.ResponseWriter, r *http.Request) ([]byte, error) {
	t := ""
	accessToken, _ := r.Cookie("access_token")
	if accessToken == nil { // issuing new access_token
		token, _ := oauthConfig.Exchange(context.Background(), code, oauth2.SetAuthURLParam("access_type", "offline"))
		t = token.AccessToken
		libs.SetSimpleCookie("access_token", "Barer "+t, w) // save token for cookie
		// TODO: should not simple cookie. expiration time is
		// token.Expiry time
	} else {
		t = accessToken.Value
		t = strings.Replace(t, "Barer ", "", -1)
	}

	resp, err := http.Get("https://people.googleapis.com/v1/people/me?personFields=photos,names,emailAddresses,genders,birthdays&access_token=" + t)
	// get user info from google

	data, err := ioutil.ReadAll(resp.Body)
	body := make(map[string]interface{})
	err = json.Unmarshal(data, &body)

	return data, err
}

func googleRegisterHandler(w http.ResponseWriter, r *http.Request) {
	state := generateStateOauthCookie(w)         // csrf
	libs.SetSimpleCookie("oauthstate", state, w) // csrf cookie

	option := oauth2.SetAuthURLParam("access_type", "offline")
	url := oauthConfig.AuthCodeURL(state, option) // redirect url for login
	fmt.Fprint(w, url)                            //response for react can redirect
}

func googleCallbackHandler(w http.ResponseWriter, r *http.Request) {

	oauthState, _ := r.Cookie("oauthstate")

	if oauthState != nil && oauthState.Value != "" && oauthState.Value == r.FormValue("state") {
		// TODO:: fix this
		libs.DelSimpleCookie("oauthstate", w) // empty csrf token.... but works weired...

		// data, _ := getGoogleUserInfoByPostForm(r.FormValue("code"), w)
		data, _ := getGoogleUserInfoByExchange(r.FormValue("code"), w, r) // result
		fmt.Fprint(w, string(data))                                       // json data for react
		return
	}

	libs.DelSimpleCookie("oauthstate", w)
	libs.DelSimpleCookie("access_token", w)
	w.WriteHeader(http.StatusUnauthorized)
	http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)

}
