// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package environment

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	t.Run("Error", func(t *testing.T) {
		_, err := New()
		assert.Error(t, err)
	})
	t.Run("OK", func(t *testing.T) {
		t.Setenv("API_KEY", "key")
		t.Setenv("BRAND_NAME", "name")
		t.Setenv("SLACK_TOKEN", "token")
		t.Setenv("MAIL_API_KEY", "key")
		t.Setenv("MAIL_FROM_ADDRESS", "from")
		t.Setenv("MAIL_FROM_NAME", "name")
		t.Setenv("MAIL_RECIPIENTS", "to")
		got, err := New()
		assert.NoError(t, err)
		assert.Equal(t, "key", got.APIKey)
		assert.Equal(t, "token", got.SlackToken)
	})
}

func TestConfig_IsDevelopment(t *testing.T) {
	c := Config{Env: "development"}
	got := c.IsDevelopment()
	assert.True(t, got)
}

func TestConfig_IsPreview(t *testing.T) {
	c := Config{Env: "preview"}
	got := c.IsPreview()
	assert.True(t, got)
}

func TestConfig_IsProduction(t *testing.T) {
	c := Config{Env: "production"}
	got := c.IsProduction()
	assert.True(t, got)
}
