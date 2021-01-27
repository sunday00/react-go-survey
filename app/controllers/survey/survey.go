package survey

import (
	"fmt"
	"net/http"
)

func StoreSurvey(w http.ResponseWriter, r *http.Request) {
	// tagModel := models.NewTag()

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
