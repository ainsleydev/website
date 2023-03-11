// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package logger

import (
	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestLocalFormatter_Format(t *testing.T) {
	const prefix = "prefix"
	//now := time.Now()

	tt := map[string]struct {
		input logrus.Entry
		want  string
	}{
		"Debug": {
			logrus.Entry{
				Level: logrus.DebugLevel,
			},
			"DEBUG",
		},
		"Warn": {
			logrus.Entry{
				Level: logrus.WarnLevel,
			},
			"WARN",
		},
		"Error": {
			logrus.Entry{
				Level: logrus.ErrorLevel,
			},
			"ERROR",
		},
		"Default": {
			logrus.Entry{
				Level: logrus.InfoLevel,
			},
			"INFO",
		},
		"Fields": {
			logrus.Entry{
				Data: logrus.Fields{
					"fields": logrus.Fields{
						"key": "value",
					},
				},
			},
			"value",
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			l := localFormatter{Prefix: prefix}
			got, err := l.Format(&test.input)
			assert.NoError(t, err)
			assert.Contains(t, string(got), test.want)
		})
	}
}
