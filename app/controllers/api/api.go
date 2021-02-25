package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"survey/app/models"
)

func GetInitialTags(w http.ResponseWriter, r *http.Request) {
	userModel := models.NewUser()
	tagModel := models.NewTag()

	initialTags := make(map[string][]string)
	initialTags["jobs"] = userModel.GetAllJobs()
	initialTags["groups"] = userModel.GetAllGroups()
	initialTags["subGroups"] = userModel.GetAllSubGroups()
	initialTags["interested"] = tagModel.GetAllTags()

	initialTagsM, _ := json.Marshal(initialTags)

	fmt.Fprint(w, string(initialTagsM))
}

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

func GetAllGroups(w http.ResponseWriter, r *http.Request) {
	userModel := models.NewUser()

	var groupsSlice []string
	params := r.FormValue("params")
	if params != "" {
		groupsSlice = userModel.GetAllGroupsContainsKeyword(params)
	} else {
		groupsSlice = userModel.GetAllGroups()
	}

	groups, _ := json.Marshal(groupsSlice)

	fmt.Fprint(w, string(groups))
}

func GetAllSubGroups(w http.ResponseWriter, r *http.Request) {
	userModel := models.NewUser()

	var groupsSlice []string
	params := r.FormValue("params")
	if params != "" {
		groupsSlice = userModel.GetAllSubGroupsContainsKeyword(params)
	} else {
		groupsSlice = userModel.GetAllSubGroups()
	}

	groups, _ := json.Marshal(groupsSlice)

	fmt.Fprint(w, string(groups))
}

func GetAllInterests(w http.ResponseWriter, r *http.Request) {
	tagModel := models.NewTag()

	var interestsSlice []string
	params := r.FormValue("params")
	if params != "" {
		interestsSlice = tagModel.GetAllTagsContainsKeyword(params)
	} else {
		interestsSlice = tagModel.GetAllTags()
	}

	interests, _ := json.Marshal(interestsSlice)

	fmt.Fprint(w, string(interests))
}
