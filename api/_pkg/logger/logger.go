// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package logger

import (
	"github.com/sirupsen/logrus"
	"io"
)

var (
	// DefaultLogger is an alias for the standard logrus Logger.
	DefaultLogger = logrus.New()
)

func Bootstrap() {
	DefaultLogger.SetFormatter(&localFormatter{
		Prefix: "ainsley.dev",
	})
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

// WithField logs with field, sets a new map containing
// "fields".
func WithField(key string, value interface{}) *logrus.Entry {
	return DefaultLogger.WithFields(logrus.Fields{"fields": logrus.Fields{
		key: value,
	}})
}

// WithFields logs with fields, sets a new map containing
// "fields".
func WithFields(fields logrus.Fields) *logrus.Entry {
	return DefaultLogger.WithFields(logrus.Fields{"fields": fields})
}

// WithError - Logs with a Verbis error.
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
