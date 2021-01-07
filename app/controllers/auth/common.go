package auth

import (
	"io/ioutil"
	"log"
	"net/http"

	"golang.org/x/oauth2"
)

var oauthConfig = oauth2.Config{}

func Store(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	//TODO:: make auth model, schema,
	// save serialnumber, vendor, subinfo
	// response stored message

	log.Println(string(body))
	println(string(body))
}
