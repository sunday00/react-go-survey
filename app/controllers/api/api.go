package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"survey/app/models"
)

func GetAllJobs(w http.ResponseWriter, r *http.Request) {
	userModel := models.NewUser()

	var jobsSlice []string
	params := r.FormValue("params")
	if params != "" {
		jobsSlice = userModel.GetAllJobsContainsKeyword(params)
	} else {
		jobsSlice = userModel.GetAllJobs()
	}

	jobs, _ := json.Marshal(jobsSlice)

	fmt.Fprint(w, string(jobs))
}
