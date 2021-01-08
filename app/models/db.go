package models

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	// sql driver
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type dbInterface interface{}

var DB *sql.DB

func init() {
	godotenv.Load()

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
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

}
