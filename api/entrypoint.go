// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"log"
	"net/http"

	"github.com/ainsleydev/website/api/_pkg/analytics"
	sdk "github.com/ainsleydev/website/api/_sdk"

	"github.com/labstack/echo/v4"

	"github.com/ainsleydev/website/api/_pkg/environment"
	"github.com/ainsleydev/website/api/_pkg/gateway/mail"
	"github.com/ainsleydev/website/api/_pkg/gateway/slack"
	"github.com/ainsleydev/website/api/_pkg/httpservice"
	"github.com/ainsleydev/website/api/_pkg/logger"
	"github.com/ainsleydev/website/api/_pkg/middleware"
)

var (
	// app is the main Echo application handler.
	app *echo.Echo
	// handler is the service to handle the incoming routes.
	handler *httpservice.Handler
)

// Handler is the main entrypoint to the application.
// Vercel detects this http.HandlerFunc signature to use
// within serverless functions.
// It bootstraps the main application by creating a new Echo instance
// and registering the API routes.
func Handler(w http.ResponseWriter, r *http.Request) {
	app = echo.New()
	h, teardown := Bootstrap(app)
	handler = h
	defer teardown()
	sdk.RegisterHandlersWithBaseURL(app, handler, httpservice.BasePath)
	app.ServeHTTP(w, r)
}

// Bootstrap the main application by initialising packages, logging
// middleware and creating the main handler.
func Bootstrap(server *echo.Echo) (*httpservice.Handler, func()) {
	config, err := environment.New()
	if err != nil {
		log.Fatalln(err.Error())
	}

	closeSentry, err := analytics.InitSentry(config)
	if err != nil {
		log.Fatalln(err.Error())
	}

	logger.Bootstrap(config)
	betterStack := analytics.NewBetterStackHook(config)
	logger.DefaultLogger.AddHook(betterStack)
	middleware.Load(server, config)

	mailer, err := mail.New(config)
	if err != nil {
		log.Fatalln(err.Error())
	}

	logger.Debugf("Booted API, listening on URL: %s, Region: %s", config.URL, config.Region)

	// Flush all logs and analytics before the application closes.
	teardown := func() {
		closeSentry()
		betterStack.Close()
	}

	return &httpservice.Handler{
		Config: config,
		Slack:  slack.New(config),
		Mailer: mailer,
	}, teardown
}
