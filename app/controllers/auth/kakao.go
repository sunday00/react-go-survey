package auth

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/kakao"

	"github.com/sunday00/go-console"

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
		kakaoCallbackHandler(w, r, "register")
		return
	}

	if strings.Contains(r.URL.Path, "/callback/signin") {
		oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/kakao/callback/signin"
		kakaoCallbackHandler(w, r, "signin")
		return
	}

	if action == "register" {
		kakaoAuthHandler(w, r)
		return
	}

	if action == "signin" {
		oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/kakao/callback/signin"
		kakaoAuthHandler(w, r)
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

func kakaoAuthHandler(w http.ResponseWriter, r *http.Request) {
	state := libs.GenerateCsrfCookie(w)    // csrf
	libs.SetSimpleCookie("csrf", state, w) // csrf cookie

	url := oauthConfig.AuthCodeURL(state)
	// redirect url for login
	fmt.Fprint(w, url) //response for react can redirect
}

func kakaoCallbackHandler(w http.ResponseWriter, r *http.Request, mode string) {

	oauthState, _ := r.Cookie("csrf")

	if oauthState != nil && oauthState.Value != "" && oauthState.Value == r.FormValue("state") {
		libs.DelSimpleCookie("csrf", w)

		// data, _ := getGoogleUserInfoByPostForm(r.FormValue("code"), w)
		data, err := getKakaoUserInfoByExchange(r.FormValue("code"), w, r) // result

		if err != nil {
			libs.Response401(w)
			return
		}
		console.PrintColoredLn(mode, console.Info)
		if mode == "signin" {
			byt := []byte(data)
			var dat map[string]interface{}
			json.Unmarshal(byt, &dat)

			num, _ := strconv.ParseFloat(fmt.Sprintf("%v", dat["id"]), 64)
			vendorID := strings.Split(fmt.Sprintf("%f", num), ".")
			// vendorID := strconv.FormatInt(num, 10)

			subInfo := addDataSubInfo("kakao", vendorID[0])
			subJSON, _ := json.Marshal(subInfo)

			fmt.Fprintf(w, "{\"data\" : %s, \"sub\" : %s}", string(data), string(subJSON))
			return
		}

		fmt.Fprint(w, string(data)) // json data for react
		return
	}

	libs.Response401(w)

}
