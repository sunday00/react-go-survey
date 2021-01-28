package survey

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"survey/app/libs"
	"survey/app/models"
	"time"

	"github.com/sunday00/go-console"
)

type mainInfo struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	StartAt     time.Time `json:"start"`
	EndAt       time.Time `json:"end"`
}

// ReqUserInfo struct object from request
type ReqSurveyInfo struct {
	ID          int64
	MainSetting mainInfo
	// SubSetting     subSetting
	// Surveys				 [int]survey
}

func StoreSurvey(w http.ResponseWriter, r *http.Request) {
	survey := models.NewSurvey()
	sess := libs.GetSimpleSession("user.User", r)
	user := models.NewUser()
	user = user.FindByVendor(libs.ToString(sess["vendor"]), libs.ToString(sess["vendorId"]))

	data, _ := ioutil.ReadAll(r.Body)
	body := make(map[string]map[string]string)
	json.Unmarshal(data, &body)

	survey.Title = body["main"]["title"]
	survey.Description = body["main"]["description"]
	survey.StartAt = libs.ToDate(body["main"]["start"])
	survey.EndAt = libs.ToDate(body["main"]["end"])
	survey.CreatedBy = user

	mainId := survey.Save()

	console.PrintColoredLn(mainId, console.Info)

	// var interestsSlice []string
	// params := r.FormValue("params")
	// if params != "" {
	// 	interestsSlice = tagModel.GetAllTagsContainsKeyword(params)
	// } else {
	// 	interestsSlice = tagModel.GetAllTags()
	// }

	// interests, _ := json.Marshal(interestsSlice)

	fmt.Fprint(w, string("OK"))

}
