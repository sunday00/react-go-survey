package auth

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var oauthConfig = oauth2.Config{
	RedirectURL:  "",
	ClientID:     "",
	ClientSecret: "",
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
	Endpoint:     google.Endpoint,
}

func init() {
	godotenv.Load()
	oauthConfig.ClientID = os.Getenv("GOOGLE_CLIENT_ID")
	oauthConfig.ClientSecret = os.Getenv("GOOGLE_SECRET_KEY")
}

func setSimpleCookie(name, value string, w http.ResponseWriter) {
	expiration := time.Now().Add(24 * time.Hour)                          // coo
	cookie := &http.Cookie{Name: name, Value: value, Expires: expiration} // coo
	http.SetCookie(w, cookie)
}

// GoogleHandler is http handler for google oauth2
func GoogleHandler(w http.ResponseWriter, r *http.Request, action string) {

	if strings.Contains(r.URL.Path, "/callback/register") {
		callbackHandler(w, r)
		return
	}

	if action == "register" {
		oauthConfig.RedirectURL = os.Getenv("CLIENT_DOMAIN") + "/auth/google/callback/register"
		registerHandler(w, r)
	}
}

func generateStateOauthCookie(w http.ResponseWriter) string {
	expiration := time.Now().Add(24 * time.Hour) // coo
	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := &http.Cookie{Name: "oauthstate", Value: state, Expires: expiration} // coo
	http.SetCookie(w, cookie)                                                     //coo
	return state
}

func getGoogleUserInfo(code string, w http.ResponseWriter) ([]byte, error) {
	token, err := oauthConfig.Exchange(context.Background(), code)

	if err != nil {
		return nil, fmt.Errorf("failed to Exchange %s", err.Error())
	}

	resp, err := http.Get(os.Getenv("GOOGLE_USER_INFO_URL") + token.AccessToken)

	if err != nil {
		return nil, fmt.Errorf("failed to get user info %s", err.Error())
	}

	data, err := ioutil.ReadAll(resp.Body)
	setSimpleCookie("userInfo", string(data), w)

	return data, err
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	state := generateStateOauthCookie(w)
	url := oauthConfig.AuthCodeURL(state)
	fmt.Fprint(w, url)
}

func callbackHandler(w http.ResponseWriter, r *http.Request) {
	for _, cookie := range r.Cookies() {
		if cookie.Name == "userInfo" {
			fmt.Fprint(w, cookie)
			return
		}
	}

	data, _ := getGoogleUserInfo(r.FormValue("code"), w)
	fmt.Fprint(w, string(data))
}
