// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package logger

import (
	"io"

	"github.com/ainsleydev/website/api/_pkg/environment"
	"github.com/sirupsen/logrus"
)

// DefaultLogger is an alias for the standard logrus Logger.
var DefaultLogger = logrus.New()

// Bootstrap creates a new Logger.
func Bootstrap(config *environment.Config) {
	DefaultLogger.SetLevel(logrus.TraceLevel)
	if config.IsProduction() {
		DefaultLogger.SetFormatter(&logrus.JSONFormatter{})
		return
	}
	DefaultLogger.SetFormatter(&localFormatter{
		Prefix: config.BrandName,
	})
}

// WithField logs with field, sets a new map containing
// "fields".
func WithField(key string, value any) *logrus.Entry {
	return DefaultLogger.WithField(key, value)
}

// WithFields logs with fields, sets a new map containing
// "fields".
func WithFields(fields logrus.Fields) *logrus.Entry {
	return DefaultLogger.WithFields(fields)
}

// WithError - Logs with a custom error.
func WithError(err interface{}) *logrus.Entry {
	return DefaultLogger.WithField("error", err)
}

// SetOutput sets the output of the DefaultLogger to an io.Writer,
// useful for testing.
func SetOutput(writer io.Writer) {
	DefaultLogger.SetOutput(writer)
}

// SetLevel sets the level of the DefaultLogger.
func SetLevel(level logrus.Level) {
	DefaultLogger.SetLevel(level)
}

// SetLogger sets the application DefaultLogger.
func SetLogger(l *logrus.Logger) {
	DefaultLogger = l
}

// Trace logs a trace message with args.
func Trace(args ...any) {
	DefaultLogger.Trace(args...)
}

// Debug logs a debug message with args.
func Debug(args ...any) {
	DefaultLogger.Debug(args...)
}

// Info logs ab info message with args.
func Info(args ...any) {
	DefaultLogger.Info(args...)
}

// Warn logs a warn message with args.
func Warn(args ...any) {
	DefaultLogger.Warn(args...)
}

// Error logs an error message with args.
func Error(args ...any) {
	DefaultLogger.Error(args...)
}

// Fatal logs a fatal message with args.
func Fatal(args ...any) {
	DefaultLogger.Fatal(args...)
}

// Panic logs a panic message with args.
func Panic(args ...any) {
	DefaultLogger.Panic(args...)
}

// Tracef logs a trace message with a format and args.
func Tracef(format string, args ...any) {
	DefaultLogger.Tracef(format, args...)
}

// Debugf logs a debug message with a format and args.
func Debugf(format string, args ...any) {
	DefaultLogger.Debugf(format, args...)
}

// Infof logs ab info message with a format and args.
func Infof(format string, args ...any) {
	DefaultLogger.Infof(format, args...)
}

// Warnf logs a warn message with a format and args.
func Warnf(format string, args ...any) {
	DefaultLogger.Warnf(format, args...)
}

// Errorf logs an error message with a format and args.
func Errorf(format string, args ...any) {
	DefaultLogger.Errorf(format, args...)
}
