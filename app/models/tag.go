package models

import (
	"go-console"
)

type tagModel struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

func init() {
	// tags table is made by user model.
	// because user have tags and need foreign key.
}

func NewTag() *tagModel {
	return &tagModel{}
}

func (t *tagModel) Save() int64 {
	Conn()
	pstmt, err := DB.Prepare(`
		INSERT INTO tags (
			title
		) VALUES (
			?
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	defer pstmt.Close()

	result, _ := pstmt.Exec(t.Title)
	id, _ := result.LastInsertId()

	return id
}

func (t *tagModel) FindByTitle() int64 {

	var id int64

	err := DB.QueryRow(`
		SELECT id FROM tags WHERE title = ?
	`, t.Title).Scan(&id)

	if err != nil {
		return -1
	}

	return id
}
