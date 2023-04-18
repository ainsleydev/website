// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package mail

import (
	"testing"

	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/ainsleyclark/errors"
	"github.com/ainsleyclark/go-mail/mail"
	mocks "github.com/ainsleyclark/go-mail/mocks/mail"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestNew(t *testing.T) {
	tt := map[string]struct {
		input environment.Config
		want  any
	}{
		"Success": {
			environment.Config{
				MailAPIKey:      "key",
				MailFromAddress: "address",
				MailFromName:    "krang",
			},
			nil,
		},
		"Error": {
			environment.Config{},
			"Error creating Mail client",
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			got, err := New(&test.input)
			if err != nil {
				assert.Contains(t, errors.Message(err), test.want)
				return
			}
			assert.NotNil(t, got)
		})
	}
}

func TestClient_Send(t *testing.T) {
	tt := map[string]struct {
		mock func(m *mocks.Mailer)
		want any
	}{
		"Success": {
			func(m *mocks.Mailer) {
				m.On("Send", mock.Anything).
					Return(mail.Response{StatusCode: 200}, nil)
			},
			mail.Response{StatusCode: 200},
		},
		"Error": {
			func(m *mocks.Mailer) {
				m.On("Send", mock.Anything).
					Return(mail.Response{}, errors.New("error"))
			},
			"Error sending email",
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			m := &mocks.Mailer{}
			if test.mock != nil {
				test.mock(m)
			}
			c := Client{mailer: m}
			got, err := c.Send(&mail.Transmission{})
			if err != nil {
				assert.Contains(t, errors.Message(err), test.want)
				return
			}
			assert.Equal(t, test.want, got)
		})
	}
}
