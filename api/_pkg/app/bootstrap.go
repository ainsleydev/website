// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package app

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/middleware"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

func Bootstrap(e *echo.Echo, config *environment.Config) {
	echo.NotFoundHandler = middleware.NotFoundHandler
	e.HTTPErrorHandler = middleware.ErrorHandler
	e.Use(middleware.Auth(config))
	e.Use(middleware.CORS(config))
	e.Use(middleware.RequestID())
	e.Use(middleware.Logger())
	e.Use(echomiddleware.GzipWithConfig(echomiddleware.GzipConfig{Level: 5}))
	e.Pre(echomiddleware.AddTrailingSlash())
}
