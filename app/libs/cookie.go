package libs

import (
	"net/http"
	"time"
)

func SetSimpleCookie(name, value string, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().Add(24 * time.Hour)
	cookie := &http.Cookie{Name: name, Value: value, Expires: expiration} // coo
	http.SetCookie(w, cookie)
}

func DelSimpleCookie(name string, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now()
	cookie := &http.Cookie{Name: name, Value: "", Expires: expiration}
	http.SetCookie(w, cookie)
}
