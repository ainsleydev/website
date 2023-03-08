// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package app

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/api"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Bootstrap(e *echo.Echo, config *environment.Config) {
	echo.NotFoundHandler = api.NotFoundHandler
	e.HTTPErrorHandler = api.ErrorHandler
	e.Use(api.Auth(config))
	e.Use(api.CORS(config))
	e.Use(api.RequestID())
	e.Use(api.Logger())
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{Level: 5}))
	e.Pre(middleware.AddTrailingSlash())
}
