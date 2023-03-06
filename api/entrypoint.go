// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	api "github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/labstack/echo/v4/middleware"
	"net/http"

	"github.com/ainsleyclark/ainsley.dev/api/_pkg/httpservice"
	"github.com/labstack/echo/v4"
)

var (
	app     *echo.Echo
	handler *httpservice.Handler
)

func init() {
	app = echo.New()
	handler = &httpservice.Handler{}
	echo.NotFoundHandler = func(c echo.Context) error {
		// TODO
		return nil
	}
	app.Use(middleware.GzipWithConfig(middleware.GzipConfig{
		Level: 5,
	}))
	api.RegisterHandlersWithBaseURL(app, handler, "/api")
}

// Handler is the entrypoint TODO
func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
