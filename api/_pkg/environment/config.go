// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package environment

import (
	"github.com/ainsleyclark/errors"
	"github.com/caarlos0/env/v7"
)

// Config represents the environment variables set in build
// used a system configuration for the application.
type Config struct {
	VercelEnv       string `env:"VERCEL_ENV"`
	VercelURL       string `env:"VERCEL_URL"`
	VercelRegion    string `env:"VERCEL_REGION"`
	APIKey          string `env:"A_DEV_API_KEY,required"`
	SlackToken      string `env:"A_DEV_SLACK_TOKEN,required"`
	MailAPIKey      string `env:"A_DEV_MAIL_API_KEY,required"`
	MailFromAddress string `env:"A_DEV_MAIL_FROM_ADDRESS,required"`
	MailFromName    string `env:"A_DEV_MAIL_FROM_NAME,required"`
}

// New populates environment, loads, and validates the
// environment
// Returns errors.INTERNAL if parsing failed.
func New() (*Config, error) {
	const op = "Environment.Load"
	cfg := Config{}
	err := env.Parse(&cfg)
	if err != nil {
		return nil, errors.NewInternal(err, "Error parsing environment", op)
	}
	return &cfg, nil
}
