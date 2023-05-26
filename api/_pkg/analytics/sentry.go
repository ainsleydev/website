// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package analytics

import (
	"github.com/ainsleydev/website/api/_pkg/logger"
	"github.com/evalphobia/logrus_sentry"
	"github.com/sirupsen/logrus"
	"time"

	"github.com/ainsleyclark/errors"
	"github.com/getsentry/sentry-go"
)

func InitSentry(dsn string) (func(), error) {
	const op = "Analytics.InitSentry"

	err := sentry.Init(sentry.ClientOptions{
		Dsn: dsn,
		// Enable printing of SDK debug messages.
		// Useful when getting started or trying to figure something out.
		Debug: true,
	})
	if err != nil {
		return func() {}, errors.NewInternal(err, "Could not initialise Sentry SDK", op)
	}

	// Example Message
	// sentry.CaptureMessage("It works!")

	// Add a hook to send log lines to Sentry.
	hook, err := logrus_sentry.NewSentryHook(dsn, logrus.AllLevels)
	if err != nil {
		return func() {}, errors.NewInternal(err, "Could not initialise Sentry SDK", op)
	}
	logger.DefaultLogger.AddHook(hook)

	// Flush buffered events before the program terminates.
	// Set the timeout to the maximum duration the program can afford to wait.
	return func() {
		sentry.Flush(2 * time.Second)
	}, nil
}
