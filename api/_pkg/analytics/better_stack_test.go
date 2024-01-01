package analytics

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"

	"github.com/ainsleydev/website/api/_pkg/environment"
)

func TestBetterStackHook_Levels(t *testing.T) {
	h := NewBetterStackHook(&environment.Config{})
	got := h.Levels()
	assert.Equal(t, logrus.AllLevels, got)
}

func TestBetterStackHook_Fire(t *testing.T) {
	tests := map[string]struct {
		setupHook func(*BetterStackHook)
		wantErr   bool
	}{
		"Valid Log Entry": {
			setupHook: func(h *BetterStackHook) { /* No special setup needed */ },
			wantErr:   false,
		},
		"After Close": {
			setupHook: func(h *BetterStackHook) { h.Close() },
			wantErr:   true,
		},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			config := &environment.Config{BetterStackToken: "test-token", Env: "test-env"}
			hook := NewBetterStackHook(config)
			test.setupHook(hook) // Setup hook based on the test case

			err := hook.Fire(&logrus.Entry{
				Logger:  logrus.New(),
				Data:    logrus.Fields{"key": "value"},
				Message: "Test message",
			})
			if test.wantErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestBetterStackHook_Close(t *testing.T) {
	hook := NewBetterStackHook(&environment.Config{})

	// First close should work as expected
	assert.NotPanics(t, func() {
		hook.Close()
	}, "First call to Close() should not panic")

	// Subsequent closes should also not panic (idempotent)
	assert.NotPanics(t, func() {
		hook.Close()
	}, "Subsequent calls to Close() should not panic")

	// Try to enqueue a log entry after close, should result in an error
	err := hook.Fire(&logrus.Entry{
		Logger:  logrus.New(),
		Data:    logrus.Fields{"key": "value"},
		Message: "Test message after close",
	})

	assert.Error(t, err, "Sending log entry after Close() should result in error")
}

func TestBetterStackHook_SendLog(t *testing.T) {
	tests := map[string]struct {
		setupServer func(*httptest.Server)
		entry       *logrus.Entry
		wantErr     bool
	}{
		"Successful Log Send": {
			setupServer: func(server *httptest.Server) {
				server.Config.Handler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
					w.WriteHeader(http.StatusOK)
				})
			},
			entry: &logrus.Entry{
				Logger:  logrus.New(),
				Data:    logrus.Fields{"key": "value"},
				Time:    time.Now(),
				Level:   logrus.InfoLevel,
				Message: "Test message",
			},
			wantErr: false,
		},
		"Error in JSON Marshaling": {
			setupServer: nil, // Not relevant for this test.
			entry: &logrus.Entry{
				Logger:  logrus.New(),
				Data:    logrus.Fields{"invalid": make(chan int)}, // Invalid field that causes marshaling error.
				Time:    time.Now(),
				Level:   logrus.InfoLevel,
				Message: "Test message",
			},
			wantErr: true,
		},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			server := httptest.NewServer(nil)
			defer server.Close()

			if test.setupServer != nil {
				test.setupServer(server)
			}

			hook := &BetterStackHook{
				client: server.Client(),
				config: &environment.Config{},
			}

			err := hook.sendLog(test.entry)
			assert.Equal(t, test.wantErr, err != nil)
		})
	}
}
