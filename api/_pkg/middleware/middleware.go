// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

// Load bootstraps the servers' middleware.
func Load(server *echo.Echo, config *environment.Config) {
	server.Use(Auth(config))
	server.Use(CORS(config))
	server.Use(RequestID())
	server.Use(Logger())
	server.Use(echomiddleware.GzipWithConfig(echomiddleware.GzipConfig{Level: 5}))
	server.Pre(echomiddleware.AddTrailingSlash())
	echo.NotFoundHandler = NotFoundHandler
	server.HTTPErrorHandler = ErrorHandler
}
