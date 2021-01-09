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

func SetSimpleCookie(name, value string, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().Add(24 * time.Hour)
	cookie := &http.Cookie{Name: name, Value: value, Expires: expiration, HttpOnly: true} // coo
	http.SetCookie(w, cookie)
}

func SetCookieWithExpireHour(name, value string, minute int, w http.ResponseWriter) {
	time.LoadLocation("Asia/Seoul")
	expiration := time.Now().Add(time.Duration(minute) * time.Minute)
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

func SetSimpleSession(name string, value interface{}, w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

	session, _ := store.New(r, name)

	tmpMap := make(map[string]interface{})
	pre, _ := json.Marshal(value)
	json.Unmarshal(pre, &tmpMap)

	for k, v := range tmpMap {
		tmp, _ := json.Marshal(v)
		session.Values[k] = string(tmp)

		println(fmt.Sprintf("%s : %v", k, v))
	}

	err := session.Save(r, w)
	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}
}

func GetSimpleSession(name string, r *http.Request) map[string]interface{} {
	godotenv.Load()

	nameSplit := strings.Split(name, ".")

	var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
	session, _ := store.Get(r, nameSplit[0])

	v := []byte(fmt.Sprintf("%v", session.Values[nameSplit[1]]))
	vMap := make(map[string]interface{})
	json.Unmarshal(v, &vMap)

	return vMap
}
