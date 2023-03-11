// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package httpservice

import (
	"fmt"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/gateway/mail"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/gateway/slack"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/logger"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/stringutil"
	"github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
	"net/http"
	"time"
)

// ContactSubmission is the type that represents the data needed
// in order to send to Slack and via the Mailer.
type ContactSubmission struct {
	sdk.ContactFormRequest
	Email string
	Time  time.Time
}

// submissionSendSubject is the subject header to send to gateways.
const submissionSendSubject = "ainsley.dev - New contact form submission"

// SendContactForm sends a contact form submission to Slack as well as via email.
// If a honeypot is sent with the request, the handler will return a
// http.StatusOK to avoid bot requests.
// The email is extracted and validated, so the user should not be
// able to send a message without an email address within it.
func (h Handler) SendContactForm(ctx echo.Context) error {
	const op = "Handler.SendContactForm"

	request := sdk.ContactFormRequest{}
	err := ctx.Bind(&request)
	if err != nil {
		return errors.NewInvalid(err, "Error, malformed payload", op)
	}

	if request.Honeypot != "" {
		logger.Info("")
		return ctx.JSON(http.StatusOK, sdk.HTTPResponse{
			Message: "Sent successfully",
		})
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

	submission := ContactSubmission{
		ContactFormRequest: request,
		Email:              stringutil.EmailFromString(request.Message),
		Time:               time.Now(),
	}

	// First send the notification to the Slack thread.
	err = h.Slack.Send(ctx.Request().Context(),
		slack.Channels.Contact,
		submissionSendSubject,
		submission.Fields(),
	)
	if err != nil {
		return errors.NewInvalid(err, "Error sending contact form", op)
	}

	// Then send an email.
	_, err = h.Mailer.Send(&mail.Transmission{
		Recipients: []string{"hello@ainsley.dev"},
		Subject:    submissionSendSubject,
		HTML:       submission.HTML(),
		PlainText:  submission.Text(),
	})
	if err != nil {
		return errors.NewInvalid(err, "Error sending contact form", op)
	}

	return ctx.JSON(http.StatusOK, sdk.HTTPResponse{
		Message: "Sent successfully",
	})
}

// Text returns the text formatted string of a contact form submission.
func (c ContactSubmission) Text() string {
	return fmt.Sprintf(
		"Email: %s\n\nMessage: %s\n\n Time: %s\n",
		c.Email,
		c.Message,
		c.Time.Format(time.RFC850),
	)
}

// Fields returns the Slack attachment fields of a contact form submission.
func (c ContactSubmission) Fields() []slack.Field {
	return []slack.Field{
		{
			Title: "Email",
			Value: c.Email,
		},
		{
			Title: "Message",
			Value: c.Message,
		},
		{
			Title: "Time",
			Value: c.Time.Format(time.RFC850),
		},
	}
}

// HTML returns the HTML formatted string of a contact form submission.
func (c ContactSubmission) HTML() string {
	return fmt.Sprintf(
		"<p><strong>Email :</strong> %s</p><p><strong>Message:</strong> %s</p><p><strong>Time:</strong> %s</p>",
		c.Email,
		c.Message,
		c.Time.Format(time.RFC850),
	)
}
