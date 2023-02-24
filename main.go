// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"log"
	"net/http"
	"os"
)

func main() {
	// Pass server port
	var port string
	flag.StringVar(&port, "port", "3000", "Server listen address")
	flag.Parse()

	// Sanity check public folder
	if _, err := os.Stat("./public"); !os.IsNotExist(err) {
		log.Fatalln("Public folder does not exist")
	}

	// Handle public folder
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", http.StripPrefix("/", fs))

	// Start server
	log.Println("Listening on port: " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalln(err.Error())
	}
}
