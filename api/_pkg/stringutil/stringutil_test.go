// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package stringutil

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestEmailIsInString(t *testing.T) {
	tt := map[string]struct {
		input string
		want  bool
	}{
		"Blank": {
			"",
			false,
		},
		"Placeholder": {
			"Hey ainsley.dev,",
			false,
		},
		"With Email": {
			"Hey ainsley.dev, my email is hello@ainsley.dev",
			true,
		},
		"Edge": {
			"Hey ainsley.dev, my email is hello@",
			false,
		},
		"Double": {
			"Hey ainsley.dev, my email is hello@ainsley.dev, test@ainsley.dev",
			true,
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			got := EmailIsInString(test.input)
			assert.Equal(t, test.want, got)
		})
	}
}

func TestEmailFromString(t *testing.T) {
	tt := map[string]struct {
		input string
		want  string
	}{
		"Blank": {
			"none",
			"",
		},
		"Email": {
			"hello@ainsley.dev",
			"hello@ainsley.dev",
		},
		"In Message": {
			"Hey ainsley.dev, my email is hello@ainsley.dev",
			"hello@ainsley.dev",
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			got := EmailFromString(test.input)
			assert.Equal(t, test.want, got)
		})
	}
}
