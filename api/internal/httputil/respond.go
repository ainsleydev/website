// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package httputil

type (
	// Response represents the data sent back from the API.
	// Indicating if there was an error processing the requests, a
	// status code, a message and the data that was processed.
	Response struct {
		Status  int    `json:"status"`
		Error   bool   `json:"error"`
		Message string `json:"message"`
		Data    any    `json:"data"`
	} //@name HTTPResponse
	// Error represents n HTTP error to be sent back to the client.
	Error struct {
		Code      string `json:"code" example:"error_code"`
		Operation string `json:"operation" example:"Function.Method"`
		Err       any    `json:"error" example:"error" swaggertype:"primitive,string"`
	} //@name HTTPError
)
