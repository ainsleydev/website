// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"net/http"

	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/ainsleyclark/ainsley.dev/api/_sdk"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// AuthHeader is the header used for authentication.
const AuthHeader = "X-API-Key"

// Auth validates API authentication and determines if
// the AuthHeader value is of equal value.
// Returns errors.INVALID if there is a mismatch.
func Auth(cfg *environment.Config) echo.MiddlewareFunc {
	return middleware.KeyAuthWithConfig(middleware.KeyAuthConfig{
		KeyLookup:              "header:" + AuthHeader,
		ContinueOnIgnoredError: false,
		Validator: func(auth string, ctx echo.Context) (bool, error) {
			return auth == cfg.APIKey, nil
		},
		ErrorHandler: func(err error, ctx echo.Context) error {
			return ctx.JSON(http.StatusUnauthorized, sdk.HTTPError{
				Code:      "<unauthorized>",
				Error:     err.Error(),
				Message:   "Not authorised",
				Operation: "API.Auth",
			})
		},
	})
}
