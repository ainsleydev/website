// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package httpservice

import (
	"github.com/ainsleydev/website/api/_pkg/environment"
	"github.com/ainsleydev/website/api/_pkg/gateway/mail"
	"github.com/ainsleydev/website/api/_pkg/gateway/slack"
)

// Handler defines the type that implements the OpenAPI spec.
type Handler struct {
	Config *environment.Config
	Slack  slack.Sender
	Mailer mail.Mailer
}

// BasePath is the base API path for routing.
const BasePath = "/api"
