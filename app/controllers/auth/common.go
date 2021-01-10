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

	"github.com/sunday00/go-console"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
)

var oauthConfig = oauth2.Config{}

type mainInfo struct {
	VendorId string `json:"vendorId"`
	Vendor   string `json:"vendor"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Gender   string `json:"gender"`
	AgeRange int    `json:"ageRange"`
}

type subInfo struct {
	Job        string   `json:"job"`
	Group      string   `json:"group"`
	SubGroup   string   `json:"subGroup"`
	Interested []string `json:"interested"`
}

type ReqUserInfo struct {
	ID      int64
	User    mainInfo
	Photo   string
	SubInfo subInfo
}

func Store(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	reqUserInfo := &ReqUserInfo{}
	json.Unmarshal(body, reqUserInfo)

	user := models.NewUser()
	user.VendorID = reqUserInfo.User.VendorId
	user.Vendor = reqUserInfo.User.Vendor
	user.Job = reqUserInfo.SubInfo.Job
	user.Group = reqUserInfo.SubInfo.Group
	user.SubGroup = reqUserInfo.SubInfo.SubGroup
	user.Interested = reqUserInfo.SubInfo.Interested

	id := user.Save()
	reqUserInfo.ID = id

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
	libs.SetSimpleSession("user", user, w, r)

}

func CheckSigned(w http.ResponseWriter, r *http.Request) {
	jwtCookie, err := r.Cookie("jwt")

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
		return
	}

	jwtStr := jwtCookie.Value

	if jwtStr == "" {
		return
	}

	jwtMap := jwt.MapClaims{}

	t, err := jwt.ParseWithClaims(jwtStr, jwtMap, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_KEY")), nil
	})

	if !t.Valid {
		//TODO:: if expired use refresh token
		libs.ResponseError(w)
	}

	// idStr := libs.GetSimpleSession("user.ID", r)
	// userStr := libs.GetSimpleSession("user.User", r)
	// photoStr := libs.GetSimpleSession("user.Photo", r)
	// subInfoStr := libs.GetSimpleSession("user.SubInfo", r)

	// console.KeyValue("id", idStr["str"])
	// console.KeyValue("user", userStr)
	// console.KeyValue("photo", photoStr["str"])
	// console.KeyValue("subInfo", subInfoStr)

	fmt.Fprint(w, libs.GetBulkSession("user", r))

}
