package models

import (
	"log"
	"time"

	"github.com/sunday00/go-console"
)

// UserModel is model of user
type UserModel struct {
	ID         int64     `json:"id"`
	VendorID   string    `json:"vendorId"`
	Vendor     string    `json:"vendor"`
	Job        string    `json:"job"`
	Group      string    `json:"group"`
	SubGroup   string    `json:"subGroup"`
	Interested []string  `json:"interested"`
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

// NewUser returns user model
func NewUser() *UserModel {
	return &UserModel{}
}

// Save user and returns db id
func (u *UserModel) Save() int64 {
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

	result, err := pstmt.Exec(u.VendorID, u.Vendor, u.Job, u.Group, u.SubGroup)

	if err != nil {
		console.PrintColoredLn(err, console.Danger)
	}
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

	return id

}

// FindByVendor returns one user by vendor, vendorId. Not DB id
func (u *UserModel) FindByVendor(vendor, vendorID string) *UserModel {

	user := &UserModel{}

	err := DB.QueryRow(`
		SELECT id, vendor, vendorId, job, groupName, subGroup, createdAt FROM users WHERE vendor = ? AND vendorId = ?
	`, vendor, vendorID).Scan(&user.ID, &user.Vendor, &user.VendorID, &user.Job, &user.Group, &user.SubGroup, &user.CreatedAt)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	return user
}

// FindByVendorWithTags returns one user by vendor, vendorId. Not DB id
// returns with tags
func (u *UserModel) FindByVendorWithTags(vendor, vendorID string) *UserModel {

	user := &UserModel{}

	err := DB.QueryRow(`
		SELECT id, vendor, vendorId, job, groupName, subGroup, createdAt FROM users WHERE vendor = ? AND vendorId = ?
	`, vendor, vendorID).Scan(&user.ID, &user.Vendor, &user.VendorID, &user.Job, &user.Group, &user.SubGroup, &user.CreatedAt)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	tags, err := DB.Query(`
		SELECT t.title FROM tags t
			LEFT JOIN user_tags ut
			ON t.id = ut.tag_id
		WHERE ut.user_id = ?
	`, user.ID)

	for tags.Next() {
		var title string
		err := tags.Scan(&title)
		if err != nil {
			log.Fatal(err)
		}
		user.Interested = append(user.Interested, title)
	}

	return user
}

func (u *UserModel) GetAllJobs() []string {

	jobs := []string{}

	rows, err := DB.Query(`
		SELECT DISTINCT job FROM users ORDER BY job LIMIT 20
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var job string
		err := rows.Scan(&job)

		if err != nil {
			log.Fatal(err)
		}
		jobs = append(jobs, job)
	}

	return jobs
}

func (u *UserModel) GetAllJobsContainsKeyword(keyword string) []string {

	jobs := []string{}

	rows, err := DB.Query(`
		SELECT DISTINCT job FROM users WHERE job LIKE ? ORDER BY job LIMIT 20
	`, "%"+keyword+"%")

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var job string
		err := rows.Scan(&job)

		if err != nil {
			log.Fatal(err)
		}
		jobs = append(jobs, job)
	}

	return jobs
}

func (u *UserModel) GetAllGroups() []string {

	groups := []string{}

	rows, err := DB.Query(`
		SELECT DISTINCT groupName FROM users WHERE groupName IS NOT NULL ORDER BY groupName LIMIT 20
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var groupName string
		err := rows.Scan(&groupName)

		if err != nil {
			log.Fatal(err)
		}
		groups = append(groups, groupName)
	}

	return groups
}

func (u *UserModel) GetAllGroupsContainsKeyword(keyword string) []string {

	groups := []string{}

	rows, err := DB.Query(`
	SELECT DISTINCT groupName FROM users WHERE groupName LIKE ? ORDER BY groupName LIMIT 20
	`, "%"+keyword+"%")

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var groupName string
		err := rows.Scan(&groupName)

		if err != nil {
			log.Fatal(err)
		}
		groups = append(groups, groupName)
	}

	return groups
}

func (u *UserModel) GetAllSubGroups() []string {

	subGroups := []string{}

	rows, err := DB.Query(`
		SELECT DISTINCT subGroup FROM users WHERE subGroup IS NOT NULL ORDER BY subGroup LIMIT 20
	`)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var subGroup string
		err := rows.Scan(&subGroup)

		if err != nil {
			log.Fatal(err)
		}
		subGroups = append(subGroups, subGroup)
	}

	return subGroups
}

func (u *UserModel) GetAllSubGroupsContainsKeyword(keyword string) []string {

	subGroups := []string{}

	rows, err := DB.Query(`
	SELECT DISTINCT subGroup FROM users WHERE subGroup LIKE ? ORDER BY subGroup LIMIT 20
	`, "%"+keyword+"%")

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	for rows.Next() {
		var subGroup string
		err := rows.Scan(&subGroup)

		if err != nil {
			log.Fatal(err)
		}
		subGroups = append(subGroups, subGroup)
	}

	return subGroups
}
