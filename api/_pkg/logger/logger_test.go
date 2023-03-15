// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package logger

import (
	"bytes"
	"fmt"
	"github.com/ainsleyclark/errors"
	"testing"

	"github.com/ainsleyclark/ainsley.dev/api/_pkg/environment"
	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
)

func TestBootstrap(t *testing.T) {
	Bootstrap(&environment.Config{BrandName: "brand"})
	assert.Equal(t, logrus.TraceLevel, DefaultLogger.Level)
}

func TestLogger(t *testing.T) {
	tt := map[string]struct {
		fn   func()
		want string
	}{
		"Trace": {
			func() {
				Trace("trace")
			},
			"trace",
		},
		"Debug": {
			func() {
				Debug("debug")
			},
			"debug",
		},
		"Info": {
			func() {
				Info("info")
			},
			"info",
		},
		"Warn": {
			func() {
				Warn("warning")
			},
			"warning",
		},
		"Error": {
			func() {
				Error("error")
			},
			"error",
		},
		"TraceF": {
			func() {
				Tracef("%s - trace", "arg")
			},
			"arg - trace",
		},
		"DebugF": {
			func() {
				Debugf("%s - debug", "arg")
			},
			"arg - debug",
		},
		"InfoF": {
			func() {
				Infof("%s - info", "arg")
			},
			"arg - info",
		},
		"WarnF": {
			func() {
				Warnf("%s - warn", "arg")
			},
			"arg - warn",
		},
		"ErrorF": {
			func() {
				Errorf("%s - error", "arg")
			},
			"arg - error",
		},
		"With Field": {
			func() {
				WithField("test", "with-field").Error()
			},
			"with-field",
		},
		"With Fields": {
			func() {
				WithFields(logrus.Fields{"test": "with-fields"}).Error()
			},
			"with-fields",
		},
	}

	for name, test := range tt {
		t.Run(name, func(t *testing.T) {
			defer func() {
				DefaultLogger = logrus.New()
			}()
			buf := &bytes.Buffer{}
			DefaultLogger.SetLevel(logrus.TraceLevel)
			DefaultLogger.SetOutput(buf)
			test.fn()
			assert.Contains(t, buf.String(), test.want)
		})
	}
}

func TestWithError(t *testing.T) {
	defer func() {
		DefaultLogger = logrus.New()
	}()
	buf := &bytes.Buffer{}
	DefaultLogger.SetLevel(logrus.TraceLevel)
	DefaultLogger.SetOutput(buf)
	WithError(&errors.Error{Code: "code", Message: "message", Operation: "op", Err: fmt.Errorf("err")}).Error()
	assert.Contains(t, buf.String(), "level=error")
}

func TestLogger_Fatal(t *testing.T) {
	buf := &bytes.Buffer{}
	DefaultLogger.SetLevel(logrus.TraceLevel)
	DefaultLogger.SetOutput(buf)
	defer func() {
		DefaultLogger = logrus.New()
	}()
	DefaultLogger.ExitFunc = func(i int) {}
	Fatal("fatal")
	assert.Contains(t, buf.String(), "fatal")
}

func TestLogger_Panic(t *testing.T) {
	buf := &bytes.Buffer{}
	DefaultLogger.SetLevel(logrus.TraceLevel)
	DefaultLogger.SetOutput(buf)
	assert.Panics(t, func() {
		Panic("panic")
	})
	assert.Contains(t, buf.String(), "panic")
}

func TestLogger_SetOutput(t *testing.T) {
	buf := &bytes.Buffer{}
	SetOutput(buf)
	assert.Equal(t, buf, DefaultLogger.Out)
}

func TestSetLevel(t *testing.T) {
	defer func() {
		DefaultLogger = logrus.New()
	}()
	SetLevel(logrus.WarnLevel)
	assert.Equal(t, logrus.WarnLevel, DefaultLogger.GetLevel())
}

func TestSetLogger(t *testing.T) {
	defer func() {
		DefaultLogger = logrus.New()
	}()
	l := logrus.New()
	SetLogger(l)
	assert.Equal(t, l, DefaultLogger)
}
