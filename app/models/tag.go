package models

import (
	"log"

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

func (t *TagModel) GetAllTags() []string {

	tags := []string{}

	rows, err := DB.Query(`
		SELECT title FROM tags ORDER BY title LIMIT 20
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var title string
		err := rows.Scan(&title)

		if err != nil {
			log.Fatal(err)
		}
		tags = append(tags, title)
	}

	return tags
}

func (t *TagModel) GetAllTagsContainsKeyword(keyword string) []string {

	tags := []string{}

	rows, err := DB.Query(`
		SELECT title FROM tags WHERE title LIKE ? ORDER BY title LIMIT 20
	`, "%"+keyword+"%")

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var title string
		err := rows.Scan(&title)

		if err != nil {
			log.Fatal(err)
		}
		tags = append(tags, title)
	}

	return tags
}
