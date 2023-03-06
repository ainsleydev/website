// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"fmt"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"os"
)

// AuthHeader is the header used for authentication.
const AuthHeader = "X-API-Key"

// Auth validates API authentication and determines if
// the AuthHeader value is of equal value.
// Returns errors.INVALID if there is a mismatch.
func Auth() echo.MiddlewareFunc {
	return middleware.KeyAuthWithConfig(middleware.KeyAuthConfig{
		KeyLookup:              "header:" + AuthHeader,
		ContinueOnIgnoredError: false,
		Validator: func(auth string, ctx echo.Context) (bool, error) {
			return auth == os.Getenv("A_DEV_API_KEY"), nil
		},
		ErrorHandler: func(err error, ctx echo.Context) error {
			return Unauthorized(ctx, errors.NewInvalid(err, "API Key mismatch", "OP"))
		},
	})
}

// NotFoundHandler - TODO
func NotFoundHandler(ctx echo.Context) error {
	return NotFound(ctx, errors.NewNotFound(
		errors.New("endpoint not found"),
		fmt.Sprintf("Error, the endpoint: %s does not exist", ctx.Request().URL),
		"API.Middleware",
	))
}

func EmptyBody(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		return next(ctx)
	}
}
