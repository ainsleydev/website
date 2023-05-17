// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"bytes"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/ainsleyclark/errors"
	"github.com/ainsleydev/website/api/_pkg/logger"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
)

func TestHandler(t *testing.T) {
	tt := map[string]struct {
		input echo.HandlerFunc
		want  string
	}{
		"Info": {
			func(c echo.Context) error {
				return nil
			},
			"level=info msg=\"Request succeeded\"",
		},
		"Standard Error": {
			func(c echo.Context) error {
				return fmt.Errorf("error")
			},
			"level=error msg=\"Request failed\"",
		},
		"Error": {
			func(c echo.Context) error {
				return errors.NewInternal(errors.New("error"), "message", "op")
			},
			"code:internal error:error",
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			defer func() {
				logger.DefaultLogger = logrus.New()
			}()
			buf := &bytes.Buffer{}
			logger.DefaultLogger.SetOutput(buf)

			e := echo.New()
			req := httptest.NewRequest(http.MethodPost, "/", nil)
			rec := httptest.NewRecorder()
			ctx := e.NewContext(req, rec)
			h := Logger()(test.input)
			_ = h(ctx) // Test logger, not output.
			assert.Contains(t, buf.String(), test.want)
		})
	}
}
