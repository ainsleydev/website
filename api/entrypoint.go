// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/api"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/httpservice"
	sdk "github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"net/http"
)

var (
	app     *echo.Echo
	handler *httpservice.Handler
)

func init() {
	app = echo.New()
	handler = &httpservice.Handler{}
	echo.NotFoundHandler = api.NotFoundHandler
	app.Use(api.Auth())
	app.Use(api.EmptyBody)
	app.Use(middleware.GzipWithConfig(middleware.GzipConfig{Level: 5}))
	app.Pre(middleware.AddTrailingSlash())
	sdk.RegisterHandlersWithBaseURL(app, handler, "/api")
}

// Handler is the entrypoint TODO
func Handler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	app.ServeHTTP(w, r)
}
