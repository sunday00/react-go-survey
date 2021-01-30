package libs

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/sunday00/go-console"
)

func ToInt(str interface{}) int {
	num, _ := strconv.Atoi(ToString(str))
	return num
}

func ToDate(str string) time.Time {
	d, err := time.Parse("2006-01-02", str)

	if err != nil {
		console.PrintColoredLn(err, console.Panic)
	}

	return d
}

func ToSlice(str interface{}) []string {
	var val []string

	res, _ := json.Marshal(str)
	json.Unmarshal(res, &val)

	return val
}

func ToString(inter interface{}) string {
	return fmt.Sprintf("%v", inter)
}
