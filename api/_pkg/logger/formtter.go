// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package logger

import (
	"fmt"
	"github.com/logrusorgru/aurora"
	"github.com/sirupsen/logrus"
	"sort"
	"strings"
)

type localFormatter struct {
	logrus.TextFormatter
	Prefix string
}

func (f *localFormatter) Format(entry *logrus.Entry) ([]byte, error) {
	lvl := strings.ToUpper(entry.Level.String())
	if len(lvl) > 5 {
		lvl = lvl[:5]
	}

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
		aurora.Gray(1-1, prefix).BgGray(24-1),
		time,
		lvlOut,
		msg,
		data,
	)

	return []byte(o), nil
}
