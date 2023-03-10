// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package httpservice

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/gateway/mail"
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/gateway/slack"
)

// Handler - TODO
type Handler struct {
	Slack  slack.Sender
	Mailer mail.Mailer
}
