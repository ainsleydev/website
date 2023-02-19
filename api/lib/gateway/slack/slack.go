// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package gateway

import (
	"context"
	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type (
	// Slack implements the notifier interface to send Slack.
	// messages with a given message.
	Slack struct {
		slackSendFunc slackSendFn
		channelID     string
	}
	// sendSlackFunc is the function used for sending to
	// a Slack channel, it's stubbed for testing.
	slackSendFn func(ctx context.Context, channelID string, options ...slack.MsgOption) (string, string, error)
)

// New creates a new Slack notifier.
// For more information about slack API token:
//
//	-> https://pkg.go.dev/github.com/slack-go/slack#New
func New(token, channelID string) *Slack {
	return &Slack{
		channelID:     channelID,
		slackSendFunc: slack.New(token).PostMessageContext,
	}
}

// Send takes a message subject and a message body and sends to the set channel.
// A Slack app with the chat:write.public and chat:write permissions must
// be installed to the workspace.
// See: https://api.slack.com/
func (s *Slack) Send(ctx context.Context, subject, message string) error {
	// Create the Slack attachment that we will send to the channel.
	attachment := slack.Attachment{
		Pretext: subject,
		Text:    message,
	}
	id, timestamp, err := s.slackSendFunc(ctx, s.channelID, slack.MsgOptionAttachments(attachment))
	if err != nil {
		return errors.Wrapf(err,
			"failed to send message to Slack channel '%s' at time '%s'",
			id,
			timestamp,
		)
	}
	return nil
}
