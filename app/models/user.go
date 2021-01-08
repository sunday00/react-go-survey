package models

import (
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
			Job       	VARCHAR(10),
			GroupName  	VARCHAR(10),
			SubGroup  	VARCHAR(10),
			CreatedAt 	DATETIME
		);
	`)

	DB.Exec(`
		CREATE TABLE IF NOT EXISTS tags (
			id					INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
			title				VARCHAR(100) NOT NULL
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
