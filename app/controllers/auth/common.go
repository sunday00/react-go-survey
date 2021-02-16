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
	VendorID string `json:"vendorId"`
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

// ReqUserInfo struct object from request
type ReqUserInfo struct {
	ID      int64    `json:"ID"`
	User    mainInfo `json:"User"`
	Photo   string   `json:"Photo"`
	SubInfo subInfo  `json:"SubInfo"`
}

// ResponseJWTAndSessionProcess save session, responce JWT, store user
func ResponseJWTAndSessionProcess(mode string, w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	reqUserInfo := &ReqUserInfo{}
	json.Unmarshal(body, reqUserInfo)

	if mode == "store" {
		saveProcess(reqUserInfo)
	}

	if mode == "refresh" {
		sess := libs.GetBulkSession("user", r)
		m := []byte(sess)
		err := json.Unmarshal(m, reqUserInfo)

		if err != nil {
			console.PrintColoredLn(err, console.Panic)
		}
	}

	token, _ := GenerateJwtToken(reqUserInfo.ID, reqUserInfo.User.Vendor, reqUserInfo.User.VendorID)

	libs.SetCookieWithExpireHour("jwt", token, 30, w)
	SetUserSessions(reqUserInfo, w, r)

	if mode == "refresh" {
		return
	}

	response := fmt.Sprintf("{\"access_key\" : \"%s\", \"success\": 1}", token)
	// json.NewEncoder(w).Encode(response)
	fmt.Fprint(w, response)
}

func saveProcess(reqUserInfo *ReqUserInfo) {
	user := models.NewUser()
	user.VendorID = reqUserInfo.User.VendorID
	user.Vendor = reqUserInfo.User.Vendor
	user.Job = reqUserInfo.SubInfo.Job
	user.Group = reqUserInfo.SubInfo.Group
	user.SubGroup = reqUserInfo.SubInfo.SubGroup
	user.Interested = reqUserInfo.SubInfo.Interested

	id := user.Save()
	reqUserInfo.ID = id
}

// GenerateJwtToken returns JWT token for user.
func GenerateJwtToken(id int64, vendor, vendorID string) (string, error) {
	godotenv.Load()
	atClaims := jwt.MapClaims{}
	atClaims["id"] = id
	atClaims["vendor"] = vendor
	atClaims["vendorId"] = vendorID
	atClaims["exp"] = time.Now().Add(time.Minute * 30).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		return "", err
	}
	return token, nil

}

// SetUserSessions make session for reuse user info during user logged
func SetUserSessions(user *ReqUserInfo, w http.ResponseWriter, r *http.Request) {
	libs.SetSimpleSession("user", user, w, r)
}

// CheckSigned constantly check user logged via jwt and session
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

	var claimMap map[string]int64
	jt, _ := json.Marshal(t.Claims)
	json.Unmarshal(jt, &claimMap)
	exp := claimMap["exp"]
	now := time.Now().Unix()

	sess := libs.GetBulkSession("user", r)

	console.PrintColoredF("remained time: %v\n", console.White, (exp-now)/60)
	if (exp-now)/60 <= 5 {
		//TODO:: this is 야매 refresh
		ResponseJWTAndSessionProcess("refresh", w, r)
	}

	fmt.Fprint(w, sess)

}

func addDataSubInfo(vendor, vendorID string) *models.UserModel {
	user := models.NewUser()
	subdata := user.FindByVendorWithTags(vendor, vendorID)

	return subdata
}

// SignOut delete session and cookie and all token
func SignOut(w http.ResponseWriter, r *http.Request) {
	libs.FlushUserSession(w, r)
	libs.ResponceSimpleSuccess(w)
}
