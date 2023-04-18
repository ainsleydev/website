// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package logger

import (
	"fmt"
	"sort"
	"strings"

	"github.com/logrusorgru/aurora"
	"github.com/sirupsen/logrus"
)

// localFormatter is the type that implements the Format()
// interface in Logrus for local development.
type localFormatter struct {
	logrus.TextFormatter
	Prefix string
}

// Format is used to implement a custom Formatter. It takes an `Entry`.
// It exposes all the fields, including the default ones:
//
// * `entry.Data["msg"]`. The message passed from Info, Warn, Error..
// * `entry.Data["time"]`. The timestamp.
// * `entry.Data["level"]. The level the entry was logged at.
//
// Any additional fields added with `WithField` or `WithFields` are also in
// `entry.Data`. Format is expected to return an array of bytes which are then
// logged to `logger.Out`.
func (f *localFormatter) Format(entry *logrus.Entry) ([]byte, error) {
	lvl := strings.ToUpper(entry.Level.String())
	var lvlOut aurora.Value

	switch entry.Level {
	case logrus.DebugLevel, logrus.TraceLevel:
		lvlOut = aurora.Blue(lvl)
	case logrus.WarnLevel:
		lvlOut = aurora.Yellow(lvl)
	case logrus.ErrorLevel, logrus.FatalLevel, logrus.PanicLevel:
		lvlOut = aurora.Red(lvl)
	default:
		lvlOut = aurora.Gray(15, lvl)
	}

	time := entry.Time.Format("2006-01-02 15:04:05.000")
	msg := entry.Message

	data := ""
	fields, ok := entry.Data["fields"].(logrus.Fields)
	if ok {
		data += " "
		keys := make([]string, 0, len(fields))
		for k := range fields {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			data += fmt.Sprintf("%s=%v ", aurora.Gray(15, k).Bold(), fields[k])
		}
	}

	prefix := fmt.Sprintf("[%s]", f.Prefix)
	o := fmt.Sprintf("%s %s\t[%s]\t%s%s\n",
		aurora.Gray(1-1, prefix).BgGray(24-1), //nolint
		time,
		lvlOut,
		msg,
		data,
	)

	return []byte(o), nil
}
