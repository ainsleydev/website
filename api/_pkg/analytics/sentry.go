// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package analytics

import (
	"time"

	"github.com/ainsleydev/website/api/_pkg/environment"

	"github.com/ainsleyclark/errors"
	"github.com/getsentry/sentry-go"
)

// InitSentry initialises the Sentry client and returns a function to close it.
// Returns errors.INTERNAL the client failed to initialise.
func InitSentry(config *environment.Config) (func(), error) {
	const op = "Analytics.InitSentry"

	err := sentry.Init(sentry.ClientOptions{
		Dsn: config.SentryDSN,
		// Enable printing of SDK debug messages.
		// Useful when getting started or trying to figure something out.
		Debug: config.IsDevelopment(),
	})
	if err != nil {
		return func() {}, errors.NewInternal(err, "Could not initialise Sentry SDK", op)
	}

	// Example Message
	// sentry.CaptureMessage("It works!")

	// Flush buffered events before the program terminates.
	// Set the timeout to the maximum duration the program can afford to wait.
	return func() {
		sentry.Flush(2 * time.Second)
	}, nil
}
