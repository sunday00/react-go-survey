package models

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/sunday00/go-console"

	// sql driver
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type dbInterface interface{}

// DB is DB object
var DB *sql.DB

func init() {
	Conn()
}

// Conn is connect for db
func Conn() *sql.DB {
	godotenv.Load()

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_DBDB"),
	)

	db, err := sql.Open(os.Getenv("DB_DRIVER"), connStr)
	if err != nil {
		log.Fatal(err)
	}

	DB = db
	console.PrintColoredLn("DB connected", console.Success)
	return db
}

func Close() {
	console.PrintColoredLn("DB Closed", console.Warning)
	defer DB.Close()
}
