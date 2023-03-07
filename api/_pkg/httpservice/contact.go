// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package httpservice

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/gateway/mail"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/gateway/slack"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/stringutil"
	"github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
	"net/http"
)

const (
	// successMessage is the message sent back to the caller
	// on successfully submission.
	successMessage = "Successfully sent contact form."

	subject = "ainsley.dev - New contact form submission"
)

func (h Handler) SendContactForm(ctx echo.Context) error {
	const op = "Handler.SendContactForm"

	request := sdk.ContactFormRequest{}
	err := ctx.Bind(&request)
	if err != nil {
		return errors.NewInvalid(err, "Error, malformed payload", op)
	}

	if request.Honeypot != "" {
		// Log
		return nil
	}

	// Check if the message contains an email address and
	// return a bad request if it doesn't.
	if !stringutil.EmailIsInString(request.Message) {
		return errors.NewInvalid(
			errors.New("no email in message"),
			"Please provide an email address in the message",
			op,
		)
	}

	// First send the notification to the Slack thread.
	err = h.Slack.Send(ctx.Request().Context(),
		slack.Channels.Contact,
		subject,
		request.Message,
	)
	if err != nil {
		return err
	}

	// Then send an email.
	// TODO: Need to log the result in the mailer.
	_, err = h.Mailer.Send(&mail.Transmission{
		Recipients: []string{"hello@ainsley.dev"},
		Subject:    subject,
		HTML:       request.Message,
		PlainText:  request.Message,
	})
	if err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, sdk.HTTPResponse{
		Message: "Sent successfully",
	})
}
