// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"fmt"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCORS(t *testing.T) {
	tt := map[string]struct {
		input  func(r *http.Request)
		config environment.Config
		want   int
	}{
		"Unauthorized": {
			input: func(r *http.Request) {
				r.Header.Set(echo.HeaderOrigin, "https://ainsley.dev")
			},
			config: environment.Config{},
			want:   http.StatusUnauthorized,
		},
	}

	e := echo.New()
	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodPost, "/", nil)
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
