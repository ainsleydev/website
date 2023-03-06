// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package api

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
	"os"
)

func Authenticate(ctx echo.Context) error {
	url := os.Getenv("VERCEL_URL")
	if url == "" {
		return errors.New("No VERCEL_URL environment variable found")
	}

	fmt.Println(url)

	return nil
}
