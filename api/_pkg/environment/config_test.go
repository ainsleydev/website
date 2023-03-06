// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package environment

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNew(t *testing.T) {
	t.Run("Error", func(t *testing.T) {
		_, err := New()
		assert.Error(t, err)
	})
	t.Run("OK", func(t *testing.T) {
		t.Setenv("A_DEV_API_KEY", "key")
		t.Setenv("A_DEV_SLACK_TOKEN", "token")
		t.Setenv("A_DEV_MAIL_API_KEY", "key")
		t.Setenv("A_DEV_MAIL_FROM_ADDRESS", "from")
		t.Setenv("A_DEV_MAIL_FROM_NAME", "name")
		got, err := New()
		assert.NoError(t, err)
		assert.Equal(t, "key", got.APIKey)
		assert.Equal(t, "token", got.SlackToken)
	})
}
