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
			err := h(ctx)
			require.NoError(t, err)
			assert.Equal(t, test.want, rec.Code)
		})
	}
}
