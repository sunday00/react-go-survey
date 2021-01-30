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

type subInfo struct {
	Gender     string   `json:"gender"`
	Jobs       []string `json:"jobs"`
	Groups     []string `json:"groups"`
	SubGroups  []string `json:"subGroups"`
	Interested []string `json:"interested"`
	Age        int      `json:"age"`
	SubAgeMin  int      `json:"subAgeMin"`
	SubAgeMax  int      `json:"subAgeMax"`
}

// ReqUserInfo struct object from request
type ReqSurveyInfo struct {
	ID          int64
	MainSetting mainInfo
	SubSetting  subInfo
	// Surveys				 [int]survey
}

func StoreSurvey(w http.ResponseWriter, r *http.Request) {
	survey := models.NewSurvey()
	sess := libs.GetSimpleSession("user.User", r)
	user := models.NewUser()
	user = user.FindByVendor(libs.ToString(sess["vendor"]), libs.ToString(sess["vendorId"]))

	data, _ := ioutil.ReadAll(r.Body)
	body := make(map[string]map[string]interface{})
	json.Unmarshal(data, &body)

	survey.Title = libs.ToString(body["main"]["title"])
	survey.Description = libs.ToString(body["main"]["description"])
	survey.StartAt = libs.ToDate(libs.ToString(body["main"]["start"]))
	survey.EndAt = libs.ToDate(libs.ToString(body["main"]["end"]))
	survey.CreatedBy = user

	survey.Gender = libs.ToString(body["sub"]["gender"])
	survey.Jobs = libs.ToSlice(body["sub"]["jobs"])
	survey.Groups = libs.ToSlice(body["sub"]["groups"])
	survey.SubGroups = libs.ToSlice(body["sub"]["subGroups"])
	survey.Interested = libs.ToSlice(body["sub"]["interested"])
	survey.Age = libs.ToInt(body["sub"]["age"])

	if survey.Age == 999 {
		survey.SubAgeMin = libs.ToInt(body["sub"]["subAgeMin"])
		survey.SubAgeMax = libs.ToInt(body["sub"]["subAgeMax"])
	} else {
		survey.SubAgeMin = survey.Age
		survey.SubAgeMax = survey.Age
	}

	//TODO:: NOW FAINALLY SAVE MAINLY QUESTIONS

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
