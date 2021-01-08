package auth

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"survey/app/models"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
)

var oauthConfig = oauth2.Config{}

type subInfo struct {
	Job        string
	Group      string
	SubGroup   string
	Interested []string
}

type ReqUserInfo struct {
	User    map[string]string
	Photo   string
	Subinfo subInfo
}

func Store(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	reqUserInfo := &ReqUserInfo{}
	json.Unmarshal(body, reqUserInfo)

	user := models.NewUser()
	user.VendorID = reqUserInfo.User["vendorId"]
	user.Vendor = reqUserInfo.User["vendor"]
	user.Job = reqUserInfo.Subinfo.Job
	user.Group = reqUserInfo.Subinfo.Group
	user.SubGroup = reqUserInfo.Subinfo.SubGroup
	user.Interested = reqUserInfo.Subinfo.Interested

	id := user.Save()

	token, _ := GenerateJwtToken(id, user.Vendor, user.VendorID)

	response := fmt.Sprintf("{\"access_key\" : \"%s\", \"success\": 1}", token)
	fmt.Fprint(w, json.NewEncoder(w).Encode(response))

}

func GenerateJwtToken(id int64, vendor, vendorId string) (string, error) {
	godotenv.Load()
	atClaims := jwt.MapClaims{}
	atClaims["id"] = id
	atClaims["vendor"] = vendor
	atClaims["vendorId"] = vendorId
	atClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		return "", err
	}
	return token, nil

}
