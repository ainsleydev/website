// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"github.com/ainsleyclark/ainsley.dev/api/_pkg/logger"
	"github.com/sirupsen/logrus"
)

func main() {
	logger.Bootstrap()
	logger.WithFields(logrus.Fields{"key": "value"}).Error("Hello")
}