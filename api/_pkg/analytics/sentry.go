// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package analytics

import (
	"time"

	"github.com/ainsleyclark/errors"
	"github.com/getsentry/sentry-go"
)

func InitSentry() (func(), error) {
	const op = "Analytics.InitSentry"

	err := sentry.Init(sentry.ClientOptions{
		Dsn: "https://3c74bf58e8594bceacf79c6e88194c1d@o4504923390083072.ingest.sentry.io/4504923447754752",
		// Enable printing of SDK debug messages.
		// Useful when getting started or trying to figure something out.
		Debug: true,
	})
	if err != nil {
		return func() {}, errors.NewInternal(err, "Could not initialise Sentry SDK", op)
	}

	sentry.CaptureMessage("It works!")

	// Flush buffered events before the program terminates.
	// Set the timeout to the maximum duration the program can afford to wait.
	return func() {
		sentry.Flush(2 * time.Second)
	}, nil
}
