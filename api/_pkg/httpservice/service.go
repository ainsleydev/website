// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package httpservice

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/api"
	"github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
)

func (h Handler) SendContactForm(ctx echo.Context) error {
	const op = "Handler.SendContactForm"

	err := api.Authenticate(ctx)
	if err != nil {
		return api.InternalError(ctx, errors.NewInvalid(err, "Error, unable to authenticate", op))
	}

	request := sdk.ContactFormRequest{}
	err = ctx.Bind(&request)
	if err != nil {
		return api.BadRequest(ctx, errors.NewInvalid(err, "Error, malformed payload", op))
	}

	if request.Honeypot != "" {
		return api.OK(ctx, nil, "Successfully sent contact form")
	}

	return nil
}
