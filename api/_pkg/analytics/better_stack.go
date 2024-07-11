package analytics

import (
	"bytes"
	"encoding/json"
	"net/http"
	"sync"
	"time"

	"github.com/ainsleyclark/errors"
	"github.com/sirupsen/logrus"

	"github.com/ainsleydev/website/api/_pkg/environment"
	"github.com/ainsleydev/website/api/_pkg/logger"
)

// BetterStackHook is a Logrus hook for BetterStack.
type BetterStackHook struct {
	client    *http.Client
	config    *environment.Config
	url       string
	eventCh   chan *logrus.Entry // Channel to buffer log entries
	closeCh   chan struct{}      // Channel used to signal closure of the hook
	closeOnce sync.Once          // Ensures Close is only called once
}

const betterStackInjestURL = "https://in.logs.betterstack.com"

// NewBetterStackHook creates a new BetterStackHook.
func NewBetterStackHook(config *environment.Config) *BetterStackHook {
	hook := &BetterStackHook{
		client:    http.DefaultClient,
		config:    config,
		url:       betterStackInjestURL,
		eventCh:   make(chan *logrus.Entry),
		closeCh:   make(chan struct{}),
		closeOnce: sync.Once{},
	}
	// Start the processing goroutine
	go hook.run()
	return hook
}

// Levels returns the levels that this hook is fired for.
func (h *BetterStackHook) Levels() []logrus.Level {
	return logrus.AllLevels
}

// Close gracefully shuts down the hook, ensuring all logs are processed.
func (h *BetterStackHook) Close() {
	time.Sleep(3 * time.Second) // Fixing: BetterStackHook.Fire: hook is closed, Could not close hook
	h.closeOnce.Do(func() {
		close(h.eventCh)
		<-h.closeCh
	})
}

// Fire is called by Logrus when a log event occurs.
func (h *BetterStackHook) Fire(entry *logrus.Entry) error {
	const op = "BetterStackHook.Fire"

	select {
	case <-h.closeCh:
		// Hook has been closed and cannot process the log entry.
		return errors.NewInternal(
			errors.New("hook is closed"),
			"Could not close hook",
			op,
		)
	default:
		// Send the log entry to Better Stack
		h.eventCh <- entry
		return nil
	}
}

// run processes log entries from the eventCh and sends them to BetterStack.
func (h *BetterStackHook) run() {
	for entry := range h.eventCh {
		if err := h.sendLog(entry); err != nil {
			logger.Error("Sending log entry to Better Stack: " + err.Error())
		}
	}
	close(h.closeCh)
}

// Fire is called when a log event occurs.
func (h *BetterStackHook) sendLog(entry *logrus.Entry) error {
	if entry == nil {
		return errors.New("nil logrus entry")
	}

	// Marshal the data map to JSON.
	payload, err := json.Marshal(map[string]any{
		"message":     entry.Message,
		"environment": h.config.Env,
		"level":       entry.Level,
		"timestamp":   entry.Time,
		"data":        entry.Data,
	})
	if err != nil {
		return err
	}

	// Create the POST request to Better Stack.
	req, err := http.NewRequest("POST", h.url, bytes.NewBuffer(payload))
	if err != nil {
		return err
	}

	// Set the appropriate headers.
	req.Header.Set("Authorization", "Bearer "+h.config.BetterStackToken)
	req.Header.Set("Content-Type", "application/json")

	// Perform the request.
	resp, err := h.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return nil
}
