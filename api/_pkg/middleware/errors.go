// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"net/http"

	"github.com/getsentry/sentry-go"

	sdk "github.com/ainsleydev/website/api/_sdk"

	"github.com/ainsleyclark/errors"
	"github.com/ainsleydev/website/api/_pkg/logger"
	"github.com/labstack/echo/v4"
)

// ErrorHandler writes a json-encoded error message to the response.
func ErrorHandler(err error, ctx echo.Context) {
	code := http.StatusInternalServerError
	resp := errorGetter(err)
	e, ok := err.(*errors.Error)
	if ok {
		code = e.HTTPStatusCode()
		resp = sdk.HTTPError{
			Code:      e.Code,
			Error:     err.Error(),
			Message:   e.Message,
			Operation: e.Operation,
		}
	}
	err = ctx.JSON(code, resp)
	if err != nil && errors.Code(err) == errors.INTERNAL {
		sentry.CaptureException(err)
	}
	if err != nil {
		logger.WithError(err).Error()
	}
}

// errorGetter is a stub for testing.
var errorGetter = getHTTPError

// getHTTPError returns an SDK error with the error attached.
func getHTTPError(err error) any {
	return sdk.HTTPError{
		Message: err.Error(),
	}
}
