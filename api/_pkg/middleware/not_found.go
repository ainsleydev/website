// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"fmt"

	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
)

// NotFoundHandler is the handler when the calling client requests
// and endpoint that doesn't exist.
func NotFoundHandler(ctx echo.Context) error {
	return errors.NewNotFound(
		errors.New("endpoint not found"),
		fmt.Sprintf("Error, the endpoint: %s does not exist", ctx.Request().URL),
		"API.Middleware",
	)
}
