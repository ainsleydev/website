// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
	"net/http"
)

// ErrorCode writes the json-encoded error message to the response.
// If the error is of the validationErrors, it will be marshalled
// for correct formatting.
func ErrorCode(ctx echo.Context, err error, status ...int) error {
	var (
		e    = errors.ToError(err)
		data = sdk.HTTPError{
			Code:      e.Code,
			Operation: e.Operation,
			Error:     e.Err.Error(), // Want to panic if the error is nil to signify the wrong type has been passed.
		}
	)

	statusCode := e.HTTPStatusCode()
	if len(status) > 0 {
		statusCode = status[0]
	}

	return ctx.JSON(statusCode, data)
}

// OK writes a json-encoded message to the response with data and
// a 200 status.
func OK(ctx echo.Context, data any, message string) error {
	return ctx.JSON(http.StatusOK, sdk.HTTPResponse{
		Data:    data,
		Message: message,
	})
}

// InternalError writes the json-encoded error message to the response
// with a 500 internal server error.
func InternalError(ctx echo.Context, err error) error {
	return ErrorCode(ctx, err, http.StatusInternalServerError)
}

// NotImplemented writes the json-encoded error message to the
// response with a 501 not found status code.
func NotImplemented(ctx echo.Context, err error) error {
	return ErrorCode(ctx, err, http.StatusNotImplemented)
}

// NotFound writes the json-encoded error message to the response
// with a 404 not found status code.
func NotFound(ctx echo.Context, err error) error {
	return ErrorCode(ctx, err, http.StatusNotFound)
}

// Unauthorized writes the json-encoded error message to the response
// with a 401 unauthorized status code.
func Unauthorized(ctx echo.Context, err error) error {
	return ErrorCode(ctx, err, http.StatusUnauthorized)
}

// Forbidden writes the json-encoded error message to the response
// with a 403 forbidden status code.
func Forbidden(ctx echo.Context, err error) error {
	return ErrorCode(ctx, err, http.StatusForbidden)
}

// BadRequest writes the json-encoded error message to the response
// with a 400 bad request status code.
func BadRequest(ctx echo.Context, err error) error {
	return ErrorCode(ctx, err, http.StatusBadRequest)
}
