// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"encoding/json"
	sdk "github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/http/httptest"
	"testing"
)

var (
	TestError = &errors.Error{
		Code:      errors.INTERNAL,
		Message:   "message",
		Operation: "op",
		Err:       errors.New("error"),
	}
)

func Setup(t *testing.T, fn func(ctx echo.Context) error) *httptest.ResponseRecorder {
	t.Helper()
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	err := fn(ctx)
	require.NoError(t, err)
	return rec
}

func TestOK(t *testing.T) {
	var (
		data    = "test"
		message = "message"
	)
	rec := Setup(t, func(ctx echo.Context) error {
		return OK(ctx, data, message)
	})
	response := sdk.HTTPResponse{}
	err := json.NewDecoder(rec.Body).Decode(&response)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, data, response.Data)
	assert.Equal(t, message, response.Message)
}

func UtilErrorCode(t *testing.T, status int, fn func(ctx echo.Context) error) {
	t.Helper()
	rec := Setup(t, fn)
	response := sdk.HTTPError{}
	err := json.NewDecoder(rec.Body).Decode(&response)
	assert.NoError(t, err)
	assert.Equal(t, status, rec.Code)
	assert.Equal(t, TestError.Message, response.Message)
	assert.Equal(t, TestError.Operation, response.Operation)
	assert.Equal(t, TestError.Err.Error(), response.Error)
	assert.Equal(t, TestError.Code, response.Code)
}

func TestInternalError(t *testing.T) {
	UtilErrorCode(t, http.StatusInternalServerError, func(ctx echo.Context) error {
		return InternalError(ctx, TestError)
	})
}

func TestNotImplemented(t *testing.T) {
	UtilErrorCode(t, http.StatusNotImplemented, func(ctx echo.Context) error {
		return NotImplemented(ctx, TestError)
	})
}

func TestNotFound(t *testing.T) {
	UtilErrorCode(t, http.StatusNotFound, func(ctx echo.Context) error {
		return NotFound(ctx, TestError)
	})
}

func TestUnauthorized(t *testing.T) {
	UtilErrorCode(t, http.StatusUnauthorized, func(ctx echo.Context) error {
		return Unauthorized(ctx, TestError)
	})
}

func TestForbidden(t *testing.T) {
	UtilErrorCode(t, http.StatusForbidden, func(ctx echo.Context) error {
		return Forbidden(ctx, TestError)
	})
}

func TestBadRequest(t *testing.T) {
	UtilErrorCode(t, http.StatusBadRequest, func(ctx echo.Context) error {
		return BadRequest(ctx, TestError)
	})
}
