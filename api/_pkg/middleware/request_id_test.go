// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRequestID(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	h := RequestID()(func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})
	err := h(ctx)
	require.NoError(t, err)
	assert.NotEmpty(t, ctx.Get(RequestIDContextKey))
	assert.NotEmpty(t, rec.Header().Get(RequestIDHeader))
}
