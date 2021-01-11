package models

import (
	"github.com/sunday00/go-console"
)

// TagModel is model for Tags
type TagModel struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

func init() {
	// tags table is made by user model.
	// because user have tags and need foreign key.
}

// NewTag returns tag model instance
func NewTag() *TagModel {
	return &TagModel{}
}

// Save tags
func (t *TagModel) Save() int64 {
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

// FindByTitle returns tag
func (t *TagModel) FindByTitle() int64 {

	var id int64

	err := DB.QueryRow(`
		SELECT id FROM tags WHERE title = ?
	`, t.Title).Scan(&id)

	if err != nil {
		return -1
	}

	return id
}
