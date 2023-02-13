// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package gateway

import (
	"github.com/slack-go/slack"
)

type (
	// Notifier defines the single method interface that
	// transmits messages to a gateway.
	Notifier interface {
		// Notify notifies a gateway of a message.
		Notify(string) error
	}
	// Slack implements the notifier interface to send Slack.
	// messages with a given message.
	Slack struct {
		slackSendFunc slackSendFn
		channelID     string
	}
	// sendSlackFunc is the function used for sending to
	// a Slack channel, it's stubbed for testing.
	slackSendFn func(channelID string, options ...slack.MsgOption) (string, string, error)
)

// NewSlack creates a new Slack gateway.
func NewSlack(token, channelID string) *Slack {
	return &Slack{
		channelID:     channelID,
		slackSendFunc: slack.New(token).PostMessage,
	}
}

func (s *Slack) Notify(message string) error {
	// Create the Slack attachment that we will send to the channel.
	attachment := slack.Attachment{
		Pretext: "Birthday Surprise!",
		Text:    message,
	}
	_, _, err := s.slackSendFunc(s.channelID, slack.MsgOptionAttachments(attachment))
	return err
}
