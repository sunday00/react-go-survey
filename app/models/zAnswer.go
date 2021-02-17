package models

import (
	"encoding/json"
	"log"
	"time"

	"github.com/sunday00/go-console"
)

// AnswerModel is model for Survey
type AnswerModel struct {
	MainId     int64     `json:"mainId"`
	QuestionId string    `json:"k"`
	Type       string    `json:"t"`
	ID         int64     `json:"id"`
	Answers    []string  `json:"v"`
	UserId     int64     `json:"userId"`
	CreatedAt  time.Time `json:"createdAt"`
}

type Result struct {
	Val    string
	Cnt    int64
	Answer string
}

type ResultSet struct {
	ID      int64
	Type    string
	Title   string
	Answers []*Result
}

func init() {
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS answers (
			mainId					INT,
			questionId			INT,
			id							INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			answer					INT,
			userId					INT,
			createdAt				DATETIME,
			FOREIGN KEY (mainId)
				REFERENCES survey(id)
				ON DELETE CASCADE,
			FOREIGN KEY (questionId)
				REFERENCES questions(id)
				ON DELETE CASCADE,
			FOREIGN KEY (answer)
				REFERENCES options(id)
				ON DELETE CASCADE,	
			FOREIGN KEY (userId)
				REFERENCES users(id)
				ON DELETE NO ACTION
		);
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	_, err = DB.Exec(`
		CREATE TABLE IF NOT EXISTS essays (
			mainId					INT,
			questionId			INT,
			id							INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			answer					TEXT,
			userId					INT,
			createdAt				DATETIME,
			FOREIGN KEY (mainId)
				REFERENCES survey(id)
				ON DELETE CASCADE,
			FOREIGN KEY (questionId)
				REFERENCES questions(id)
				ON DELETE CASCADE,
			FOREIGN KEY (userId)
				REFERENCES users(id)
				ON DELETE NO ACTION
		);
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

}

// NewAnswer returns AnswerModel instance
func NewAnswer() *AnswerModel {
	return &AnswerModel{}
}

// Save answer
func (a *AnswerModel) Save() int64 {

	pstmt, err := DB.Prepare(`
		INSERT INTO answers (
			mainId, questionId, id, answer, userId, createdAt
		) VALUES (
			?, ?, ?, ?, ?, NOW()
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

// Save answer
func (a *AnswerModel) BulkSave(mainId int64, answers []interface{}, userId int64) {

	pstmt, err := DB.Prepare(`
		INSERT INTO answers (
			mainId, questionId, answer, userId, createdAt
		) VALUES (
			?, ?, ?, ?, NOW()
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	defer pstmt.Close()

	pstmt2, err := DB.Prepare(`
		INSERT INTO essays (
			mainId, questionId, answer, userId, createdAt
		) VALUES (
			?, ?, ?, ?, NOW()
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	defer pstmt2.Close()

	for _, answer := range answers {

		tmpByte, _ := json.Marshal(answer)
		ans := &AnswerModel{}
		json.Unmarshal(tmpByte, ans)

		if ans.Type == "choice" {
			for _, choose := range ans.Answers {
				_, err := pstmt.Exec(
					mainId, ans.QuestionId, choose, userId,
				)

				if err != nil {
					console.PrintColored("pstmt: ", console.White)
					console.PrintColoredLn(err, console.Danger)
				}
			}
		} else if ans.Type == "essay" {
			_, err := pstmt2.Exec(
				mainId, ans.QuestionId, ans.Answers[0], userId,
			)

			if err != nil {
				console.PrintColored("pstmt: ", console.White)
				console.PrintColoredLn(err, console.Danger)
			}
		}
	}

}

// FindBySurveyId returns Answers array
func (a *AnswerModel) FindBySurveyId(id int64) []*ResultSet {

	var results []*ResultSet

	rows, err := DB.Query(`
		SELECT q.id, q.type, q.title, 
			CASE
				WHEN o.val IS NULL THEN ''
				ELSE o.val
			END as val,

			CASE
				WHEN a.cnt IS NULL THEN 0
				ELSE a.cnt
			END as cnt,

			CASE
				WHEN e.answer IS NULL THEN ''
				ELSE e.answer
			END as answer
		FROM questions q

		LEFT JOIN (
			SELECT questionId, id, value as val FROM options
			WHERE mainId = ?
		) o
		
		ON q.id = o.questionId
		
		LEFT JOIN (
			SELECT questionId, answer, COUNT(answer) cnt FROM answers
			GROUP BY questionId, answer
		) a
		
		ON q.id = a.questionId AND o.id = a.answer
		
		LEFT JOIN essays e on q.id = e.questionId
		
		WHERE q.mainId = ?
	`, id, id)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		result := &Result{}
		resultSet := &ResultSet{}

		err := rows.Scan(&resultSet.ID, &resultSet.Type, &resultSet.Title, &result.Val, &result.Cnt, &result.Answer)

		if err != nil {
			log.Fatal(err)
		}

		if len(results) == 0 || len(results) > 0 && results[len(results)-1].ID != resultSet.ID {
			results = append(results, resultSet)
		}

		currentResultSet := results[len(results)-1]
		if currentResultSet != nil && (len(currentResultSet.Answers) == 0 || currentResultSet.ID == resultSet.ID) {
			currentResultSet.Answers = append(currentResultSet.Answers, result)
		}

	}

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	return results

}
