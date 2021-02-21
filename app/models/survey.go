package models

import (
	"encoding/json"
	"strings"
	"time"

	"github.com/sunday00/go-console"
)

// SurveyModel is model for Survey
type SurveyModel struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	StartAt     time.Time `json:"start"`
	EndAt       time.Time `json:"end"`

	Gender     string   `json:"gender"`
	Jobs       []string `json:"jobs"`
	Groups     []string `json:"groups"`
	SubGroups  []string `json:"subGroups"`
	Interested []string `json:"interested"`
	Age        int      `json:"age"`
	SubAgeMin  int      `json:"subAgeMin"`
	SubAgeMax  int      `json:"subAgeMax"`

	Questions []*QuestionModel `json:"surveys"`

	CreatedBy *UserModel `json:"user"`
	CreatedAt time.Time  `json:"created_at"`

	Cnt int `json:"cnt"`
}

func init() {
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS survey (
			id							INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			title						VARCHAR(100) NOT NULL ,
			description			TEXT NOT NULL ,
			startAt       	DATE,
			endAt 				 	DATE,

			gender 					VARCHAR(10),
			jobs						JSON,
			mainGroups			JSON,
			subGroups				JSON,
			interested			JSON,
			age							INT,
			subAgeMin				INT,
			subAgeMax				INT,

			userId  				INT,
			createdAt 			DATETIME,
			FOREIGN KEY (userId)
				REFERENCES users(id)
				ON DELETE NO ACTION
		);
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

}

// NewSurvey returns SurveyModel instance
func NewSurvey() *SurveyModel {
	return &SurveyModel{}
}

// Save tags
func (s *SurveyModel) Save() int64 {

	pstmt, err := DB.Prepare(`
		INSERT INTO survey (
			title, description, startAt, endAt, userId, createdAt,
			gender, jobs, mainGroups, subGroups, interested,
			age, subAgeMin, subAgeMax
		) VALUES (
			?, ?, ?, ?, ?, ?,
			?, ?, ?, ?, ?,
			?, ?, ?
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	defer pstmt.Close()

	jobsArrayString := "[\"" + strings.Join(s.Jobs[:], "\", \"") + "\"]"
	groupsArrayString := "[\"" + strings.Join(s.Groups[:], "\", \"") + "\"]"
	subGroupsArrayString := "[\"" + strings.Join(s.SubGroups[:], "\", \"") + "\"]"
	interestedArrayString := "[\"" + strings.Join(s.Interested[:], "\", \"") + "\"]"

	result, err := pstmt.Exec(
		s.Title, s.Description, s.StartAt, s.EndAt, s.CreatedBy.ID, time.Now(),
		s.Gender, jobsArrayString, groupsArrayString, subGroupsArrayString, interestedArrayString,
		s.Age, s.SubAgeMin, s.SubAgeMax,
	)

	if err != nil {
		console.PrintColored("pstmt: ", console.White)
		console.PrintColoredLn(err, console.Danger)
	}

	id, err := result.LastInsertId()

	if err != nil {
		console.PrintColored("extract Id: ", console.White)
		console.PrintColoredLn(err, console.Danger)
	}

	return id
}

// FindById returns one full survey for answer
func (s *SurveyModel) FindById(id int64) {
	type TMP struct {
		jobs       []uint8
		groups     []uint8
		subGroups  []uint8
		interested []uint8
	}

	tmp := TMP{}

	err := DB.QueryRow(`
		SELECT 
			id, title, description, startAt, endAt, gender,
			jobs, mainGroups, subGroups, interested, 
			age, subAgeMin, subAgeMax
		FROM survey WHERE id = ?
	`, id).Scan(
		&s.ID, &s.Title, &s.Description, &s.StartAt, &s.EndAt, &s.Gender,
		&tmp.jobs, &tmp.groups, &tmp.subGroups, &tmp.interested,
		&s.Age, &s.SubAgeMin, &s.SubAgeMax,
	)

	// stmp := fmt.Sprintf(string(tmp.jobs))
	json.Unmarshal(tmp.jobs, &s.Jobs)
	json.Unmarshal(tmp.groups, &s.Groups)
	json.Unmarshal(tmp.subGroups, &s.SubGroups)

	QustionModel := NewQuestion()
	questions := QustionModel.FindBySurveyId(id)
	s.Questions = questions

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

}

// FindListByUserId returns Whole surveys belongs to user
func (s *SurveyModel) FindListByUserId(id int64) []SurveyModel {

	var surveys []SurveyModel

	rows, err := DB.Query(`
	SELECT id, title, startAt, endAt, createdAt, COUNT(attend) cnt FROM (

    SELECT  s.id, s.title, s.startAt, s.endAt, s.createdAt, COUNT(distinct a.userId) attend
    FROM survey s

    LEFT JOIN answers a
    ON s.id = a.mainId

    WHERE s.userId = ? AND a.userId IS NOT NULL

    GROUP BY s.id, a.userId
	) t

	GROUP BY  id, attend
	`, id)

	for rows.Next() {
		survey := SurveyModel{}

		err = rows.Scan(&survey.ID, &survey.Title, &survey.StartAt, &survey.EndAt, &survey.CreatedAt, &survey.Cnt)

		if err != nil {
			console.PrintColoredLn(err, console.Panic)
		}

		surveys = append(surveys, survey)

	}

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	return surveys
}
