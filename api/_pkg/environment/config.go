// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package environment

import (
	"github.com/ainsleyclark/errors"
	"github.com/caarlos0/env/v7"
)

// Config defines the environment variables for the application.
type Config struct {
	Env             string   `env:"VERCEL_ENV"`
	URL             string   `env:"VERCEL_URL" envDefault:"http://localhost:3000"`
	Region          string   `env:"VERCEL_REGION"`
	APIKey          string   `env:"API_KEY,required"`
	BrandName       string   `env:"BRAND_NAME,required"`
	BrandColour     string   `env:"BRAND_COLOUR"`
	SlackToken      string   `env:"SLACK_TOKEN,required"`
	MailAPIKey      string   `env:"MAIL_API_KEY,required"`
	MailFromAddress string   `env:"MAIL_FROM_ADDRESS,required"`
	MailFromName    string   `env:"MAIL_FROM_NAME,required"`
	MailRecipients  []string `env:"MAIL_RECIPIENTS,required" envSeparator:":"`
}

// See: https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables
const (
	// Development env definition.
	Development string = "development"
	// Preview env definition.
	Preview = "preview"
	// Production env definition.
	Production = "production"
)

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

// IsDevelopment determines if the current environment is development.
func (c *Config) IsDevelopment() bool {
	return c.Env == Development
}

// IsPreview determines if the current environment is a preview branch.
func (c *Config) IsPreview() bool {
	return c.Env == Preview
}

// IsProduction determines if the current environment is production.
func (c *Config) IsProduction() bool {
	return c.Env == Production
}
