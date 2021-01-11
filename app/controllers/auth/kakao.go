package auth

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/kakao"

	"survey/app/libs"
)

// KakaoHandler is http handler for google oauth2
func KakaoHandler(w http.ResponseWriter, r *http.Request, action string) {

	godotenv.Load()
	oauthConfig.ClientID = os.Getenv("KAKAO_CLIEND_ID")
	oauthConfig.ClientSecret = os.Getenv("KAKAO_SECRET_KEY")
	oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/kakao/callback/register"
	oauthConfig.Scopes = nil
	oauthConfig.Endpoint = kakao.Endpoint

	if strings.Contains(r.URL.Path, "/callback/register") {
		callbackHandler(w, r)
		return
	}

	if action == "register" {
		registerHandler(w, r)
		return
	}
}

func getKakaoUserInfoByExchange(code string, w http.ResponseWriter, r *http.Request) ([]byte, error) {
	t := ""
	accessToken, _ := r.Cookie("access_token")
	if accessToken == nil { // issuing new access_token
		token, err := oauthConfig.Exchange(context.Background(), code)

		// if err != nil && err.(*oauth2.RetrieveError).Response.StatusCode == 400 {
		if err != nil {
			libs.Response401(w)
			return nil, err
		}

		t = "Bearer " + token.AccessToken
		libs.SetCookieWithExpireHour("access_token", t, 60, w) // save token for cookie
	} else {
		t = accessToken.Value
	}

	// get user info from google
	reqURL, _ := url.Parse("https://kapi.kakao.com/v2/user/me")
	req := &http.Request{
		Method: "GET",
		URL:    reqURL,
		Header: map[string][]string{
			"Authorization": {t},
		},
	}

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatal("Error reading response. ", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == 401 || resp.StatusCode == 403 {
		libs.Response401(w)
		return nil, err
	}

	data, err := ioutil.ReadAll(resp.Body)
	body := make(map[string]interface{})

	err = json.Unmarshal(data, &body)

	return data, err
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	state := libs.GenerateCsrfCookie(w)    // csrf
	libs.SetSimpleCookie("csrf", state, w) // csrf cookie

	url := oauthConfig.AuthCodeURL(state)
	// redirect url for login
	fmt.Fprint(w, url) //response for react can redirect
}

func callbackHandler(w http.ResponseWriter, r *http.Request) {

	oauthState, _ := r.Cookie("csrf")

	if oauthState != nil && oauthState.Value != "" && oauthState.Value == r.FormValue("state") {
		libs.DelSimpleCookie("csrf", w)

		// data, _ := getGoogleUserInfoByPostForm(r.FormValue("code"), w)
		data, err := getKakaoUserInfoByExchange(r.FormValue("code"), w, r) // result

		if err != nil {
			libs.Response401(w)
			return
		}

		fmt.Fprint(w, string(data)) // json data for react
		return
	}

	libs.Response401(w)

}
