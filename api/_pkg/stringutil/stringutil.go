// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package stringutil

import (
	"regexp"
)

// EmailIsInString determines if an email address such as
// hello@test.com exists in a given string.
func EmailIsInString(str string) bool {
	emailRegex := `(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))`
	return regexp.MustCompile(emailRegex).MatchString(str)
}

// EmailFromString returns an email address from the
// provided given input.
func EmailFromString(str string) string {
	emailRegex := `[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,24}`
	return regexp.MustCompile(emailRegex).FindString(str)
}
