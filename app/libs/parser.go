package libs

import (
	"fmt"
	"time"

	"github.com/sunday00/go-console"
)

func ToDate(str string) time.Time {
	d, err := time.Parse("2006-01-02", str)

	console.PrintColoredLn(err, console.Panic)

	return d
}

func ToString(inter interface{}) string {
	return fmt.Sprintf("%v", inter)
}
