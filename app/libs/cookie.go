package libs

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"time"
)

func SetSimpleCookie(name, value string, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().Add(24 * time.Hour)
	cookie := &http.Cookie{Name: name, Value: value, Expires: expiration, HttpOnly: true} // coo
	http.SetCookie(w, cookie)
}

func SetCookieWithExpireHour(name, value string, hour int, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().Add(time.Duration(hour) * time.Hour)
	cookie := &http.Cookie{Name: name, Value: value, Expires: expiration, HttpOnly: true} // coo
	http.SetCookie(w, cookie)
}

func DelSimpleCookie(name string, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().AddDate(0, -1, 0)
	cookie := &http.Cookie{Name: name, Value: "", Expires: expiration}
	http.SetCookie(w, cookie)
}

func GenerateCsrfCookie(w http.ResponseWriter) string {

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.StdEncoding.EncodeToString(b)

	return state

}
