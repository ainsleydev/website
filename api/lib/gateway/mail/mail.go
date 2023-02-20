// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package mail

import (
	"github.com/ainsleyclark/go-mail/drivers"
	"github.com/ainsleyclark/go-mail/mail"
	"github.com/pkg/errors"
	"golang.org/x/net/context"
	"log"
)

type (
	Client struct {
		mailer mail.Mailer
	}
)

func New() (*Client, error) {
	cfg := mail.Config{
		URL:         "https://api.eu.sparkpost.com",
		APIKey:      "my-key",
		FromAddress: "website@ainsley.dev",
		FromName:    "Gopher",
	}
	mailer, err := drivers.NewSparkPost(cfg)
	if err != nil {
		return nil, err
	}
	return &Client{
		mailer: mailer,
	}, nil
}

func (c *Client) Send(ctx context.Context, subject, message string) error {
	tx := &mail.Transmission{
		Recipients: []string{"hello@gophers.com"},
		CC:         []string{"cc@gophers.com"},
		BCC:        []string{"bcc@gophers.com"},
		Subject:    "My email",
		HTML:       "<h1>Hello from Go Mail!</h1>",
		PlainText:  "Hello from Go Mail!",
		Headers: map[string]string{
			"X-Go-Mail": "Test",
		},
	}
	result, err := c.mailer.Send(tx)
	if err != nil {
		return errors.Wrapf(err,
			"failed to send Email to %s",
			"TODO",
		)
	}
	log.Println("TODO: Result" + result.ID)
	return nil
}
