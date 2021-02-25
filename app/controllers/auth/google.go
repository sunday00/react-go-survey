package auth

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/sunday00/go-console"

	"github.com/joho/godotenv"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"survey/app/libs"
)

// GoogleHandler is http handler for google oauth2
func GoogleHandler(w http.ResponseWriter, r *http.Request, action string) {

	godotenv.Load()
	oauthConfig.ClientID = os.Getenv("GOOGLE_CLIENT_ID")
	oauthConfig.ClientSecret = os.Getenv("GOOGLE_SECRET_KEY")
	oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/google/callback/register"
	oauthConfig.Scopes = []string{
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/user.birthday.read",
		"https://www.googleapis.com/auth/user.gender.read",
		"openid",
	}
	oauthConfig.Endpoint = google.Endpoint

	if strings.Contains(r.URL.Path, "/callback/register") {
		googleCallbackHandler(w, r, "register")
		return
	}

	if strings.Contains(r.URL.Path, "/callback/signin") {
		oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/google/callback/signin"
		googleCallbackHandler(w, r, "signin")
		return
	}

	if action == "register" {
		googleAuthHandler(w, r)
		return
	}

	if action == "signin" {
		oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/google/callback/signin"
		googleAuthHandler(w, r)
		return
	}

}

func getGoogleUserInfoByExchange(code string, w http.ResponseWriter, r *http.Request) ([]byte, error) {
	t := ""
	accessToken, _ := r.Cookie("access_token")
	if accessToken == nil { // issuing new access_token
		token, err := oauthConfig.Exchange(context.Background(), code, oauth2.SetAuthURLParam("access_type", "offline"))

		// if err != nil && err.(*oauth2.RetrieveError).Response.StatusCode == 400 {
		if err != nil {
			console.KeyValue("err", err)
			libs.Response401(w)
			return nil, err
		}

		t = token.AccessToken
		libs.SetCookieWithExpireHour("access_token", "Bearer "+t, 60, w) // save token for cookie
	} else {
		t = accessToken.Value
		t = strings.Replace(t, "Bearer ", "", -1)
	}

	resp, err := http.Get("https://people.googleapis.com/v1/people/me?personFields=photos,names,emailAddresses,genders,birthdays&access_token=" + t)
	// get user info from google

	if resp.StatusCode == 401 || resp.StatusCode == 403 {
		console.KeyValue("err", err)
		libs.Response401(w)
		return nil, err
	}

	data, err := ioutil.ReadAll(resp.Body)
	body := make(map[string]interface{})
	err = json.Unmarshal(data, &body)

	defer resp.Body.Close()
	return data, err
}

func googleAuthHandler(w http.ResponseWriter, r *http.Request) {
	state := libs.GenerateCsrfCookie(w)    // csrf
	libs.SetSimpleCookie("csrf", state, w) // csrf cookie

	option := oauth2.SetAuthURLParam("access_type", "offline")
	url := oauthConfig.AuthCodeURL(state, option) // redirect url for login
	fmt.Fprint(w, url)                            //response for react can redirect
}

func googleCallbackHandler(w http.ResponseWriter, r *http.Request, mode string) {

	oauthState, _ := r.Cookie("csrf")

	if oauthState != nil && oauthState.Value != "" && oauthState.Value == r.FormValue("state") {
		libs.DelSimpleCookie("csrf", w)

		// data, _ := getGoogleUserInfoByPostForm(r.FormValue("code"), w)
		data, err := getGoogleUserInfoByExchange(r.FormValue("code"), w, r) // result

		if err != nil {
			console.KeyValue("err", err)
			libs.Response401(w)
			return
		}

		if mode == "signin" {
			byt := []byte(data)
			var dat map[string]interface{}
			json.Unmarshal(byt, &dat)
			vendorID := strings.Split(dat["resourceName"].(string), "/")

			subInfo := addDataSubInfo("google", vendorID[1])
			subJSON, _ := json.Marshal(subInfo)

			fmt.Fprintf(w, "{\"data\" : %s, \"sub\" : %s}", string(data), string(subJSON))
			return
		}

		fmt.Fprint(w, string(data)) // json data for react
		return
	}

	libs.Response401(w)

}
