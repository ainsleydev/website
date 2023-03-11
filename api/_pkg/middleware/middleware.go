// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"github.com/labstack/echo/v4"
)

const RequestIDHeader = echo.HeaderXRequestID

const RequestIDContextKey = "request_id"
