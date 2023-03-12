package main

import (
	"github.com/ainsleyclark/ainsley.dev/api"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/logger"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	err := godotenv.Load("../../.env")
	if err != nil {
		logger.Fatal(err)
	}
	api.Bootstrap(e)
	logger.Fatal(e.Start(":3000"))
}
