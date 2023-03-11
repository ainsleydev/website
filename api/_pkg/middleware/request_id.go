// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

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
