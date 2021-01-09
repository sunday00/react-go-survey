package auth

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"survey/app/libs"
	"survey/app/models"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
)

var oauthConfig = oauth2.Config{}

type mainInfo struct {
	VendorId string
	Vendor   string
	Email    string
	Name     string
	Gender   string
	AgeRange int
}

type subInfo struct {
	Job        string
	Group      string
	SubGroup   string
	Interested []string
}

type ReqUserInfo struct {
	User    mainInfo
	Photo   string
	Subinfo subInfo
}

func Store(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	reqUserInfo := &ReqUserInfo{}
	json.Unmarshal(body, reqUserInfo)

	user := models.NewUser()
	user.VendorID = reqUserInfo.User.VendorId
	user.Vendor = reqUserInfo.User.Vendor
	user.Job = reqUserInfo.Subinfo.Job
	user.Group = reqUserInfo.Subinfo.Group
	user.SubGroup = reqUserInfo.Subinfo.SubGroup
	user.Interested = reqUserInfo.Subinfo.Interested

	id := user.Save()

	token, _ := GenerateJwtToken(id, user.Vendor, user.VendorID)

	libs.SetCookieWithExpireHour("jwt", token, 30, w)
	SetUserSessions(reqUserInfo, w, r)

	response := fmt.Sprintf("{\"access_key\" : \"%s\", \"success\": 1}", token)
	// json.NewEncoder(w).Encode(response)
	fmt.Fprint(w, response)

}

func GenerateJwtToken(id int64, vendor, vendorId string) (string, error) {
	godotenv.Load()
	atClaims := jwt.MapClaims{}
	atClaims["id"] = id
	atClaims["vendor"] = vendor
	atClaims["vendorId"] = vendorId
	atClaims["exp"] = time.Now().Add(time.Minute * 30).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		return "", err
	}
	return token, nil

}

func SetUserSessions(user *ReqUserInfo, w http.ResponseWriter, r *http.Request) {
	// godotenv.Load()
	// var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
	// session, _ := store.New(r, "user")

	// session.Values["vendorId"] = user.User.VendorId
	// session.Values["vendor"] = user.User.VendorId
	// session.Values["email"] = user.User.Email
	// session.Values["name"] = user.User.Name
	// session.Values["gender"] = user.User.Gender
	// session.Values["ageRange"] = user.User.AgeRange
	// session.Values["photo"] = user.Photo
	// session.Values["job"] = user.Subinfo.Job
	// session.Values["group"] = user.Subinfo.Group
	// session.Values["subgroup"] = user.Subinfo.SubGroup
	// session.Values["interested"] = user.Subinfo.Interested

	// session.Save(r, w)

	libs.SetSimpleSession("user", user, w, r)

}
