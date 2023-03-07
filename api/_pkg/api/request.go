// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import "github.com/labstack/echo/v4"

type Request struct {
	URL      string
	Method   string
	ClientIP string
}

func GetRequest(ctx echo.Context) Request {
	req := ctx.Request()
	return Request{
		URL:      req.URL.String(),
		Method:   req.Method,
		ClientIP: req.RemoteAddr,
	}
}
