package analytics

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/sirupsen/logrus"
)

// BetterStackHook is a Logrus hook for BetterStack.
type BetterStackHook struct {
	client      *http.Client
	sourceToken string
}

// NewBetterStackHook creates a new BetterStackHook.
func NewBetterStackHook(token string) *BetterStackHook {
	return &BetterStackHook{
		client:      http.DefaultClient,
		sourceToken: token,
	}
}

// Levels returns the levels that this hook is fired for.
func (h *BetterStackHook) Levels() []logrus.Level {
	return logrus.AllLevels
}

// Fire is called when a log event occurs.
func (h *BetterStackHook) Fire(entry *logrus.Entry) error {
	// Serialize the log entry to JSON
	payload, err := json.Marshal(entry.Data)
	if err != nil {
		return err
	}

	// Create the POST request to BetterStack
	req, err := http.NewRequest("POST", "https://in.logs.betterstack.com", bytes.NewBuffer(payload))
	if err != nil {
		return err
	}

	// Set the appropriate headers
	req.Header.Set("Authorization", "Bearer "+h.sourceToken)
	req.Header.Set("Content-Type", "application/json")

	// Perform the request
	resp, err := h.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return nil
}
