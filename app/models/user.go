package models

import (
	"go-console"
	"time"
)

type userModel struct {
	ID         int       `json:"id"`
	VendorID   string    `json:"vendorId"`
	Vendor     string    `json:"vendor"`
	Job        string    `json:"subInfo.job"`
	Group      string    `json:"subInfo.group"`
	SubGroup   string    `json:"subInfo.subGroup"`
	Interested []string  `json:"subInfo.interested"`
	CreatedAt  time.Time `json:"created_at"`
}

func init() {

	DB.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id					INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			vendorId		VARCHAR(100) NOT NULL ,
			vendor			VARCHAR(10) NOT NULL ,
			job       	VARCHAR(10),
			groupName  	VARCHAR(10),
			subGroup  	VARCHAR(10),
			createdAt 	DATETIME
		);
	`)

	DB.Exec(`
		CREATE TABLE IF NOT EXISTS tags (
			id					INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			title				VARCHAR(100) UNIQUE NOT NULL
		);
	`)

	DB.Exec(`
		CREATE TABLE IF NOT EXISTS user_tags (
			user_id	INT NOT NULL,
			tag_id INT NOT NULL,
			FOREIGN KEY (user_id)
				REFERENCES users(id)
				ON DELETE NO ACTION,
			FOREIGN KEY (tag_id)
				REFERENCES tags(id)
				ON DELETE NO ACTION
		);
	`)

}

func NewUser() *userModel {
	return &userModel{}
}

func (u *userModel) Save() {
	Conn()
	pstmt, err := DB.Prepare(`
		INSERT INTO users (
			vendorId, vendor, job, groupName, subGroup, createdAt
		) VALUES (
			?,?,?,?,?, NOW()
		)
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}

	result, _ := pstmt.Exec(u.VendorID, u.Vendor, u.Job, u.Group, u.SubGroup)
	id, _ := result.LastInsertId()

	for _, tag := range u.Interested {
		newTag := NewTag()
		newTag.Title = tag
		tagID := newTag.FindByTitle()
		if tagID < 0 {
			tagID = newTag.Save()
		}

		pstmt2, err := DB.Prepare(`
		INSERT INTO user_tags VALUES ( ?,? )
		`)

		if err != nil {
			console.PrintColoredLn(err, console.Panic)
		}

		pstmt2.Exec(id, tagID)
	}

}
