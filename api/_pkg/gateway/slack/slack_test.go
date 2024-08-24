// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package slack

import (
	"context"
	"testing"

	"github.com/ainsleydev/website/api/_pkg/environment"

	"github.com/pkg/errors"
	"github.com/slack-go/slack"
	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	got := New(&environment.Config{SlackToken: "token"})
	assert.Equal(t, "token", got.config.SlackToken)
	assert.NotNil(t, got.slackSendFunc)
}

func TestSlack_Send(t *testing.T) {
	t.Run("Success", func(t *testing.T) {
		s := Client{
			config: &environment.Config{},
			slackSendFunc: func(_ context.Context, _ string, _ ...slack.MsgOption) (string, string, error) {
				return "", "", nil
			},
		}
		got := s.Send(context.TODO(), "channel", "subject", nil)
		assert.NoError(t, got)
	})

	t.Run("Error", func(t *testing.T) {
		s := Client{
			config: &environment.Config{},
			slackSendFunc: func(_ context.Context, _ string, _ ...slack.MsgOption) (string, string, error) {
				return "id", "timestamp", errors.New("error")
			},
		}
		got := s.Send(context.TODO(), "channel", "subject", nil)
		want := "failed to send message to Slack channel 'id' at time 'timestamp': error"
		assert.ErrorContains(t, got, want)
	})
}
