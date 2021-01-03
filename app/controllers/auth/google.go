package auth

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"os"

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

func GoogleHandler(w http.ResponseWriter, r *http.Request, action string) {
	if action == "register" {
		oauthConfig.RedirectURL = "http://" + os.Getenv("CLIENT_DOMAIN") + "/auth/google/callback/register"
		registerHandler(w, r)
	}
}

func generateStateOauthCookie(w http.ResponseWriter) string {
	// expiration := time.Now().Add(24 * time.Hour)
	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	// cookie := &http.Cookie{Name: "oauthstate", Value: state, Expires: expiration}
	// http.SetCookie(w, cookie)
	return state
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	state := generateStateOauthCookie(w)
	url := oauthConfig.AuthCodeURL(state)
	println(url)
}
