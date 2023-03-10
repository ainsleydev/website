package httpservice

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/gateway/mail"
	"github.com/ainsleyclark/ainsley.dev/gen/mocks"
	sdk "github.com/ainsleyclark/ainsley.dev/gen/sdk/go"
	"github.com/ainsleyclark/errors"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHandler_SendContactForm(t *testing.T) {
	tt := map[string]struct {
		payload any
		mock    func(slack *mocks.Sender, mailer *mocks.Mailer)
		want    any
	}{
		"Bind Error": {
			payload: "wrong",
			want:    "Error, malformed payload",
		},
		"Honey Pot": {
			payload: sdk.ContactFormRequest{
				Honeypot: "bad bot",
			},
			want: "Sent successfully",
		},
		"No Email": {
			payload: sdk.ContactFormRequest{},
			want:    "Please provide an email address in the message",
		},
		"Slack Failure": {
			payload: sdk.ContactFormRequest{
				Message: "Hello hello@ainsley.dev!",
			},
			mock: func(slack *mocks.Sender, mailer *mocks.Mailer) {
				slack.On("Send", context.TODO(), mock.Anything, mock.Anything, mock.Anything).
					Return(errors.New("error"))
			},
			want: "Error sending contact form",
		},
		"Mail Failure": {
			payload: sdk.ContactFormRequest{
				Message: "Hello hello@ainsley.dev!",
			},
			mock: func(slack *mocks.Sender, mailer *mocks.Mailer) {
				slack.On("Send", context.TODO(), mock.Anything, mock.Anything, mock.Anything).
					Return(nil)
				mailer.On("Send", mock.Anything).
					Return(mail.Response{}, errors.New("error"))
			},
			want: "Error sending contact form",
		},
		"OK": {
			payload: sdk.ContactFormRequest{
				Message: "Hello hello@ainsley.dev!",
			},
			mock: func(slack *mocks.Sender, mailer *mocks.Mailer) {
				slack.On("Send", context.TODO(), mock.Anything, mock.Anything, mock.Anything).
					Return(nil)
				mailer.On("Send", mock.Anything).
					Return(mail.Response{}, nil)
			},
			want: "Sent successfully",
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			server := httptest.NewServer(nil)
			defer server.Close()

			slack := mocks.NewSender(t)
			mail := mocks.NewMailer(t)
			if test.mock != nil {
				test.mock(slack, mail)
			}
			h := Handler{
				Slack:  slack,
				Mailer: mail,
			}

			b, err := json.Marshal(test.payload)
			require.NoError(t, err)
			req := httptest.NewRequest(http.MethodPost, "/cancel", strings.NewReader(string(b)))
			req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
			rec := httptest.NewRecorder()
			c := echo.New().NewContext(req, rec)

			err = h.SendContactForm(c)
			if err != nil {
				assert.ErrorContains(t, err, test.want.(string))
				return
			}
			assert.Equal(t, http.StatusOK, rec.Code)
			assert.Contains(t, rec.Body.String(), test.want)
		})
	}
}

var submission = ContactSubmission{
	ContactFormRequest: sdk.ContactFormRequest{
		Message: "message",
	},
	Email: "hello@ainsley.dev",
}

func TestContactSubmission_Text(t *testing.T) {
	want := fmt.Sprintf("New contact form submission\nEmail: hello@ainsley.dev\nMessage: message")
	got := submission.Text()
	assert.Contains(t, got, want)
}

func TestContactSubmission_HTML(t *testing.T) {
	want := fmt.Sprintf("<h2>New contact form submission/h2><p><strong>Email :</strong> hello@ainsley.dev</p><p><strong>Message:</strong> message</p>p><strong>Time:</strong>")
	got := submission.HTML()
	assert.Contains(t, got, want)
}

func TestContactSubmission_Subject(t *testing.T) {
	want := "ainsley.dev - New contact form submission"
	got := submission.Subject()
	assert.Equal(t, want, got)
}
