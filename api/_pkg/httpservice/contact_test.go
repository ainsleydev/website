package httpservice

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	mocks "github.com/ainsleydev/website/api/_mocks"
	sdk "github.com/ainsleydev/website/api/_sdk"

	"github.com/ainsleyclark/errors"
	"github.com/ainsleydev/website/api/_pkg/environment"
	"github.com/ainsleydev/website/api/_pkg/gateway/mail"
	"github.com/ainsleydev/website/api/_pkg/gateway/slack"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
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
		"No Email": {
			payload: sdk.ContactFormRequest{},
			want:    "Please provide an email address in the message",
		},
		"Honey Pot": {
			payload: sdk.ContactFormRequest{
				Honeypot: "bad bot",
				Message:  "Hello test@hello.com",
			},
			want: "Sent successfully",
		},
		"Slack Failure": {
			payload: sdk.ContactFormRequest{
				Message: "Hello test@hello.com",
			},
			mock: func(slack *mocks.Sender, mailer *mocks.Mailer) {
				slack.On("Send", context.TODO(), mock.Anything, mock.Anything, mock.Anything).
					Return(errors.New("error"))
			},
			want: "Error sending contact form",
		},
		"Mail Failure": {
			payload: sdk.ContactFormRequest{
				Message: "Hello test@hello.com",
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
				Message: "Hello test@hello.com",
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
				Config: &environment.Config{},
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
	Email: "test@hello.com",
	Time:  time.Now(),
}

func TestContactSubmission_Text(t *testing.T) {
	want := "Email: test@hello.com\n\nMessage: message"
	got := submission.Text()
	assert.Contains(t, got, want)
}

func TestContactSubmission_Markdown(t *testing.T) {
	want := []slack.Field{
		{Title: "Email", Value: submission.Email},
		{Title: "Message", Value: submission.Message},
		{Title: "Time", Value: submission.Time.Format(time.RFC850)},
	}
	got := submission.Fields()
	assert.Equal(t, want, got)
}

func TestContactSubmission_HTML(t *testing.T) {
	want := "<p><strong>Email:</strong> test@hello.com</p><p><strong>Message:</strong> message</p><p><strong>Time:</strong>"
	got := submission.HTML()
	assert.Contains(t, got, want)
}
