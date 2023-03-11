// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package middleware

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/logger"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"time"
)

func Logger() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			req := ctx.Request()
			res := ctx.Response()
			start := time.Now()

			err := next(ctx)
			stop := time.Now()

			fields := logrus.Fields{
				"url":         req.RequestURI,
				"host":        req.Host,
				"method":      req.Method,
				"status":      res.Status,
				"remote_addr": req.RemoteAddr,
				"latency":     stop.Sub(start).String(),
				"request_id":  ctx.Get(RequestIDContextKey),
				"user_agent":  req.UserAgent(),
			}

			errMsg := "Request failed"
			if err != nil {
				e, ok := err.(*errors.Error)
				if ok {
					fields["code"] = e.Code
					fields["error"] = e.Err
					errMsg = e.Message
				} else {
					fields["error"] = err.Error()
				}
			}

			if err == nil {
				logger.WithFields(fields).Info("Request succeeded")
			} else {
				logger.WithFields(fields).Error(errMsg)
			}

			return err
		}
	}
}
