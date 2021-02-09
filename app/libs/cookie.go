package libs

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/sunday00/go-console"

	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

func SetSimpleCookie(name, value string, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().Add(24 * time.Hour)
	cookie := &http.Cookie{Name: name, Value: value, Path: "/", Expires: expiration, HttpOnly: true} // coo
	http.SetCookie(w, cookie)
}

func SetCookieWithExpireHour(name, value string, minute int, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().Add(time.Duration(minute) * time.Minute)
	cookie := &http.Cookie{Name: name, Value: value, Path: "/", Expires: expiration, HttpOnly: true} // coo
	http.SetCookie(w, cookie)
}

func DelSimpleCookie(name string, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().AddDate(0, 0, 0)
	cookie := &http.Cookie{Name: name, Value: "", Path: "/", Expires: expiration}
	http.SetCookie(w, cookie)
}

func GenerateCsrfCookie(w http.ResponseWriter) string {

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.StdEncoding.EncodeToString(b)

	return state

}

func SetSimpleSession(name string, value interface{}, w http.ResponseWriter, r *http.Request) {
	godotenv.Load()

	session, _ := store.New(r, name)
	session.Options = &sessions.Options{
		Path:     "/",
		HttpOnly: true,
		MaxAge:   30 * 60,
	}

	tmpMap := make(map[string]interface{})
	pre, _ := json.Marshal(value)
	json.Unmarshal(pre, &tmpMap)

	for k, v := range tmpMap {
		tmp, _ := json.Marshal(v)
		session.Values[k] = string(tmp)
	}

	err := session.Save(r, w)
	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}
}

func GetSimpleSession(name string, r *http.Request) map[string]interface{} {
	godotenv.Load()

	nameSplit := strings.Split(name, ".")
	session, _ := store.Get(r, nameSplit[0])

	v := []byte(fmt.Sprintf("%v", session.Values[nameSplit[1]]))
	vMap := make(map[string]interface{})
	err := json.Unmarshal(v, &vMap)

	if err != nil {
		vMap["str"] = session.Values[nameSplit[1]]
	}

	return vMap
}

func GetBulkSession(name string, r *http.Request) string {
	var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
	session, _ := store.Get(r, name)

	converted := make(map[string]interface{})
	for k, v := range session.Values {

		kk := k.(string)

		b := []byte(fmt.Sprintf("%v", v))
		vStr := make(map[string]string)
		err := json.Unmarshal(b, &vStr)
		converted[kk] = vStr

		if err != nil {
			b = []byte(fmt.Sprintf("%v", v))
			var vMap interface{}
			err = json.Unmarshal(b, &vMap)
			converted[kk] = vMap
		}
	}

	m, err := json.Marshal(converted)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	return string(m)
}

func FlushUserSession(w http.ResponseWriter, r *http.Request) {
	DelSimpleCookie("user", w)
	DelSimpleCookie("jwt", w)
	DelSimpleCookie("access_token", w)

	godotenv.Load()
	var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

	session, _ := store.New(r, "user")
	session.Options = &sessions.Options{
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	}

	session.Save(r, w)
}
