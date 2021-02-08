package models

import (
	"encoding/json"
	"log"

	"github.com/sunday00/go-console"
)

// SurveyModel is model for Survey
type QuestionModel struct {
	MainId  int64          `json:"mainId"`
	ID      int64          `json:"no"`
	Title   string         `json:"q"`
	Type    string         `json:"type"`
	Len     int            `json:"len"`
	Options []*OptionModel `json:"options"`
}

func init() {
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS questions (
			mainId					INT,
			id							INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			title						VARCHAR(100) NOT NULL ,
			type 						VARCHAR(10),
			len							INT,
			FOREIGN KEY (mainId)
				REFERENCES survey(id)
				ON DELETE CASCADE
		);
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

}

// NewQuestion returns QuesionModel instance
func NewQuestion() *QuestionModel {
	return &QuestionModel{}
}

// Save question
func (s *QuestionModel) Save() int64 {

	pstmt, err := DB.Prepare(`
		INSERT INTO questions (
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

	result, err := pstmt.Exec()

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

// Save questions
func (s *QuestionModel) BulkSave(mainId int64, questions []interface{}) {

	pstmt, err := DB.Prepare(`
		INSERT INTO questions (
			mainId, title, type, len
		) VALUES (
			?, ?, ?, ?
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	defer pstmt.Close()

	for _, question := range questions {

		tmpByte, _ := json.Marshal(question)
		quest := &QuestionModel{}
		json.Unmarshal(tmpByte, quest)

		if quest.Title == "" {
			continue
		}

		result, err := pstmt.Exec(
			mainId, quest.Title, quest.Type, quest.Len,
		)

		if err != nil {
			console.PrintColored("pstmt: ", console.White)
			console.PrintColoredLn(err, console.Danger)
		}

		id, err := result.LastInsertId()

		if err != nil {
			console.PrintColored("extract Question Id: ", console.White)
			console.PrintColoredLn(err, console.Danger)
		}

		var optionBody map[string][]interface{}
		json.Unmarshal(tmpByte, &optionBody)
		options := NewOptions()
		options.BulkSave(mainId, id, optionBody["options"])
	}

}

func (q *QuestionModel) FindBySurveyId(id int64) []*QuestionModel {
	rows, err := DB.Query(`
		SELECT 
			id, title, type, len
		FROM questions WHERE mainId = ?
	`, id)

	var Questions []*QuestionModel

	// dev for in syntax
	optionModel := NewOptions()
	options := optionModel.FindBySurveyId(id)

	for rows.Next() {
		Question := &QuestionModel{}
		err := rows.Scan(&Question.ID, &Question.Title, &Question.Type, &Question.Len)

		if err != nil {
			log.Fatal(err)
		}

		// optionModel := NewOptions()
		// Question.Options = optionModel.FindByQuestionId(Question.ID)
		for _, option := range options {
			if option.QuestionId == int(Question.ID) {
				Question.Options = append(Question.Options, option)
			}
		}

		Questions = append(Questions, Question)
	}

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	return Questions

}
