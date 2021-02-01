package models

import (
	"encoding/json"

	"github.com/sunday00/go-console"
)

// OptionModel is model for question for Survey
type OptionModel struct {
	MainId     int    `json:"mainId"`
	QuestionId int    `json:"questionId"`
	ID         int    `json:"optionId"`
	Value      string `json:"value"`
	Skip       int    `json:"skip"`
}

func init() {
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS options (
			mainId					INT,
			questionId			INT,
			id							INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			value						VARCHAR(255) NOT NULL ,
			skip 						INT,
			FOREIGN KEY (mainId, questionId)
				REFERENCES questions(mainId, id)
				ON DELETE CASCADE
		) AUTO_INCREMENT=1;
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

}

// NewQuestion returns QuesionModel instance
func NewOptions() *OptionModel {
	return &OptionModel{}
}

// Save question //TODO: complete this function
func (o *OptionModel) Save() int64 {

	pstmt, err := DB.Prepare(`
		INSERT INTO options (
			
		) VALUES (
			
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
func (o *OptionModel) BulkSave(mainId int64, questionId int64, options []interface{}) {

	pstmt, err := DB.Prepare(`
		INSERT INTO options (
			mainId, questionId, value, skip
		) VALUES (
			?, ?, ?, ?
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	defer pstmt.Close()

	for _, option := range options {
		tmpByte, _ := json.Marshal(option)
		op := &OptionModel{}
		json.Unmarshal(tmpByte, op)

		result, err := pstmt.Exec(
			mainId, questionId, op.Value, op.Skip,
		)

		if err != nil {
			console.PrintColored("pstmt: ", console.White)
			console.PrintColoredLn(err, console.Danger)
		}

		_, err = result.LastInsertId()

		if err != nil {
			console.PrintColored("extract Option Id: ", console.White)
			console.PrintColoredLn(err, console.Danger)
		}

	}

}
