package survey

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"survey/app/libs"
	"survey/app/models"

	"github.com/gorilla/mux"
	"github.com/sunday00/go-console"
)

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

	mainId := survey.Save()

	questionBody := make(map[string][]interface{})
	json.Unmarshal(data, &questionBody)
	questions := models.NewQuestion()
	questions.BulkSave(mainId, questionBody["questions"])

	fmt.Fprintf(w, "{\"success\" : 1, \"id\" : %64d}", mainId)

}

func ReadSurvey(w http.ResponseWriter, r *http.Request) {
	surveyNo, _ := strconv.ParseInt(mux.Vars(r)["survey"], 10, 64)

	survey := models.NewSurvey()
	survey.FindById(surveyNo)

	jsonResult, _ := json.Marshal(survey)

	fmt.Fprintf(w, "{\"success\" : 1, \"result\" : %v}", string(jsonResult))
}

func StoreAnswer(w http.ResponseWriter, r *http.Request) {
	type TMP struct {
		SurveyNo int64         `json:"surveyNo"`
		Answers  []interface{} `json:"answers"`
	}

	tmp := TMP{}

	data, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(data, &tmp)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	var userID int64
	userID, _ = strconv.ParseInt(libs.GetSimpleSession("user.ID", r)["str"].(string), 10, 64)

	answer := models.NewAnswer()

	answer.BulkSave(tmp.SurveyNo, tmp.Answers, userID)

	fmt.Fprint(w, "{\"success\" : 1}")
}

func ReadResults(w http.ResponseWriter, r *http.Request) {
	surveyNo, _ := strconv.ParseInt(mux.Vars(r)["survey"], 10, 64)

	answers := models.NewAnswer()

	results := answers.FindBySurveyId(surveyNo)
	m, _ := json.Marshal(results)

	fmt.Fprintf(w, "{\"success\" : 1, \"results\": %s}", string(m))
}
