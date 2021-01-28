package models

import (
	"time"

	"github.com/sunday00/go-console"
)

// SurveyModel is model for Survey
type SurveyModel struct {
	ID          int        `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	StartAt     time.Time  `json:"start"`
	EndAt       time.Time  `json:"end"`
	CreatedBy   *UserModel `json:"user"`
	CreatedAt   time.Time  `json:"created_at"`
}

func init() {
	DB.Exec(`
		CREATE TABLE IF NOT EXISTS survey (
			id							INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			title						VARCHAR(100) NOT NULL ,
			description			TEXT NOT NULL ,
			startAt       	DATE,
			endAt 				 	DATE,
			userId  				INT,
			createdAt 			DATETIME,
			FOREIGN KEY (userId)
				REFERENCES users(id)
				ON DELETE NO ACTION
		);
	`)

}

// NewSurvey returns SurveyModel instance
func NewSurvey() *SurveyModel {
	return &SurveyModel{}
}

// Save tags
func (s *SurveyModel) Save() int64 {

	pstmt, err := DB.Prepare(`
		INSERT INTO survey (
			title, description, startAt, endAt, userId, createdAt
		) VALUES (
			?, ?, ?, ?, ?, ?
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	defer pstmt.Close()

	result, _ := pstmt.Exec(s.Title, s.Description, s.StartAt, s.EndAt, s.CreatedBy.ID, time.Now())
	id, _ := result.LastInsertId()

	return id
}
