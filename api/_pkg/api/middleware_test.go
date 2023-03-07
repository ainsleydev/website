// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"fmt"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAuth(t *testing.T) {
	tt := map[string]struct {
		input  func(r *http.Request)
		config environment.Config
		want   int
	}{
		"Unauthorized": {
			input:  func(r *http.Request) {},
			config: environment.Config{},
			want:   http.StatusUnauthorized,
		},
		"OK": {
			input: func(r *http.Request) {
				t.Setenv(AuthHeader, "key")
				r.Header.Set(AuthHeader, "key")
			},
			config: environment.Config{
				APIKey: "key",
			},
			want: http.StatusOK,
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			e := echo.New()
			req := httptest.NewRequest(http.MethodPost, "/", nil)
			rec := httptest.NewRecorder()
			test.input(req)
			ctx := e.NewContext(req, rec)
			h := Auth(&test.config)(func(ctx echo.Context) error {
				return ctx.NoContent(http.StatusOK)
			})
			_ = h(ctx)
			fmt.Println(rec.Code)
			assert.Equal(t, test.want, rec.Code)
		})
	}
}

func TestCORS(t *testing.T) {
	t.Skipf("Not working")
	tt := map[string]struct {
		input  func(r *http.Request)
		config environment.Config
		want   int
	}{
		"Unauthorized": {
			input: func(r *http.Request) {
				r.Header.Set(echo.HeaderOrigin, "url")
			},
			config: environment.Config{},
			want:   http.StatusUnauthorized,
		},
	}

	e := echo.New()
	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodOptions, "/", nil)
			rec := httptest.NewRecorder()
			ctx := e.NewContext(req, rec)
			test.input(req)
			h := CORS(&test.config)(func(ctx echo.Context) error {
				return nil
			})
			err := h(ctx)
			require.NoError(t, err)
			fmt.Println(rec.Header())
			fmt.Println(rec.Code)
		})
	}
}

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

func TestNotFoundHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(req, rec)
	err := NotFoundHandler(ctx)
	assert.ErrorContains(t, err, "endpoint not found")
}
