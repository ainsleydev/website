// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"fmt"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	sdk "github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/ainsleyclark/errors"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
)

// AuthHeader is the header used for authentication.
const AuthHeader = "X-API-Key"

const RequestIDHeader = echo.HeaderXRequestID

const RequestIDContextKey = "request_id"

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
				Message:   "API Key mismatch",
				Operation: "API.Auth",
			})
		},
	})
}

func CORS(cfg *environment.Config) echo.MiddlewareFunc {
	return middleware.CORSWithConfig(middleware.CORSConfig{
		Skipper: middleware.DefaultSkipper,
		AllowMethods: []string{
			http.MethodGet,
			http.MethodHead,
			http.MethodPut,
			http.MethodPatch,
			http.MethodPost,
			http.MethodDelete,
		},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			AuthHeader,
		},
		AllowOrigins: []string{
			cfg.VercelURL,
		},
	})
}

// RequestID assigns a unique identifier to the contact under RequestIDContextKey.
// The header RequestIDHeader is also sent the UUID
// to the calling client.
func RequestID() echo.MiddlewareFunc {
	return middleware.RequestIDWithConfig(middleware.RequestIDConfig{
		TargetHeader: RequestIDHeader,
		Generator: func() string {
			return uuid.New().String()
		},
		RequestIDHandler: func(ctx echo.Context, requestID string) {
			ctx.Set(RequestIDContextKey, requestID)
		},
	})
}

// NotFoundHandler is the handler when the calling client requests
// and endpoint that doesn't exist.
func NotFoundHandler(ctx echo.Context) error {
	return errors.NewNotFound(
		errors.New("endpoint not found"),
		fmt.Sprintf("Error, the endpoint: %s does not exist", ctx.Request().URL),
		"API.Middleware",
	)
}
