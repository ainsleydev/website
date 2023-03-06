// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package mail

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/ainsleyclark/errors"
	"log"

	"github.com/ainsleyclark/go-mail/drivers"
	"github.com/ainsleyclark/go-mail/mail"
)

type (
	// Mailer defines the sender for go-mail returning a
	// Response or error when an email is sent.
	Mailer interface {
		// Send accepts a mail.Transmission to send an email through a particular
		// driver/provider. Transmissions will be validated before sending.
		//
		// A mail.Response or an error will be returned. In some circumstances
		// the body and status code will be attached to the response for debugging.
		//
		// Returns errors.INTERNAL if the mail could not be sent.
		Send(t *Transmission) (Response, error)
	}
	// Client represents the HTTP client for posting and returning
	// data from the NLP keyword extraction API.
	Client struct {
		mailer mail.Mailer
	}
	// Transmission represents the JSON structure accepted by
	// and returned from the driver's API. Recipients,
	// HTML and a subject is required to send the
	// email.
	Transmission = mail.Transmission
	// Response represents the data passed back from a
	// successful transmission.
	Response = mail.Response
)

// New returns a new Mail Client.
func New(cfg *environment.Config) (*Client, error) {
	const op = "Mail.New"
	mailer, err := drivers.NewSparkPost(mail.Config{
		URL:         "https://api.eu.sparkpost.com",
		APIKey:      cfg.MailAPIKey,
		FromAddress: cfg.MailFromAddress,
		FromName:    cfg.MailFromName,
	})
	if err != nil {
		return nil, errors.NewInternal(err, "Error creating Mail client", op)
	}
	return &Client{
		mailer: mailer,
	}, nil
}

func (c *Client) Send(tx *Transmission) (Response, error) {
	const op = "Mail.Send"
	result, err := c.mailer.Send(tx)
	if err != nil {
		return Response{}, errors.NewInternal(err, "Error sending email", op)
	}
	log.Println("TODO: Result" + result.ID)
	return result, nil
}
