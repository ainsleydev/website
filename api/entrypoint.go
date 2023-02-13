// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"fmt"
	"github.com/ainsleyclark/ainsley.dev/api/httpservice"
	"github.com/labstack/echo/v4"
	"net/http"
)

var (
	app     *echo.Echo
	handler *httpservice.Handler
)

func init() {
	app = echo.New()
	handler = &httpservice.Handler{}
	echo.NotFoundHandler = func(c echo.Context) error {
		fmt.Println(c.Request().URL)
		return nil
	}
	httpservice.RegisterHandlersWithBaseURL(app, handler, "/api")
}

// Handler is the entrypoint TODO
func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
