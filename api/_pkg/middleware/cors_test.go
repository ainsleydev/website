// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCORS(t *testing.T) {
	cfg := environment.Config{
		URL: "http://test.com",
	}
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	req.Header.Set(echo.HeaderOrigin, cfg.URL)
	h := CORS(&cfg)(func(ctx echo.Context) error {
		return nil
	})
	err := h(ctx)
	require.NoError(t, err)
	assert.Equal(t, cfg.URL, rec.Header().Get(echo.HeaderAccessControlAllowOrigin))
}
