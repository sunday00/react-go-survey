package auth

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"survey/app/models"

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

	user.Save()
	// save serialnumber, vendor, subinfo
	// response stored message

	// log.Println(string(body))
	// println(string(body))
}
