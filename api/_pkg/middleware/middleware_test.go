// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"testing"

	"github.com/ainsleydev/website/api/_pkg/environment"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestLoad(t *testing.T) {
	e := echo.New()
	Load(e, &environment.Config{})
	assert.NotNil(t, e.HTTPErrorHandler)
}
