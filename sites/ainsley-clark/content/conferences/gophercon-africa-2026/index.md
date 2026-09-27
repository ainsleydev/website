---
title: "//go:embed: From Comment to Binary"
description: How //go:embed turns a comment into bytes in your binary, from the lexer to the linker, plus the tradeoffs and patterns for using it in production.
heading: GopherCon Africa 2026
talkTitle: "//go:embed: From Comment to Binary - Linker Internals, Tradeoffs and Production Patterns"
lead: This talk follows a single //go:embed directive through go build, the compiler and the linker, then looks at what embedding costs you and how to test it.
weight: 1
publishdate: 2026-10-29
pageColour: white
draft: true # Flip to false ~a day before the talk to publish.
tags:
  - Go
  - Compiler
  - Internals
buttonName: View Talk
event:
  name: GopherCon Africa
  date: 2026-10-30
  # location: Venue, City
  url: https://gophercon.africa/
# Uncomment once files/slides.pdf has been added.
# slides:
#   path: files/slides.pdf
#   name: gophercon-africa-2026-ainsley-clark.pdf
#   text: Download slides
sources:
  - title: 1. Mastering Embed in Go 1.16
    url: https://lakefs.io/blog/working-with-embed-in-go/
    description: Barak Amar. lakeFS blog.
  - title: "2. golang/go#41191: embed, cmd/go: add support for embedded files"
    url: https://github.com/golang/go/issues/41191
    description: Russ Cox, 2 September 2020. Proposal accepted for Go 1.16.
  - title: 3. (*Context).Import
    url: https://github.com/golang/go/blob/go1.27.1/src/go/build/build.go
    description: The go command walking a package directory and noting every //go:embed it passes.
  - title: 4. readGoInfo
    url: https://github.com/golang/go/blob/go1.27.1/src/go/build/read.go#L374-L392
    description: The scan that reads on past the imports and picks out //go:embed comments as tokens.
  - title: 5. resolveEmbed
    url: https://github.com/golang/go/blob/go1.27.1/src/cmd/go/internal/load/pkg.go#L2165
    description: Patterns turned into real files and trees against the filesystem.
  - title: 6. The embedcfg struct
    url: https://github.com/golang/go/blob/go1.27.1/src/cmd/go/internal/work/exec.go#L893-L906
    description: The struct the go command builds from the Patterns and Files maps, and marshals to JSON.
  - title: 7. Writing embedcfg
    url: https://github.com/golang/go/blob/go1.27.1/src/cmd/go/internal/work/gc.go#L148-L152
    description: Writing embedcfg to the work directory and passing -embedcfg to the compiler.
  - title: 8. checkEmbed
    url: https://github.com/golang/go/blob/go1.27.1/src/cmd/compile/internal/noder/noder.go#L462-L481
    description: The switch nearly every //go:embed error message comes from.
  - title: 9. WriteEmbed
    url: https://github.com/golang/go/blob/go1.27.1/src/cmd/compile/internal/staticdata/embed.go#L101-L134
    description: The compiler laying the variable out in memory and writing the file's bytes as static data.
  - title: "10. Draft design: Go command support for embedded static assets"
    url: https://go.googlesource.com/proposal/+/master/design/draft-embed.md
    description: Russ Cox & Brad Fitzpatrick, July 2020.
  - title: "11. golang/go#41190: io/fs: add file system interfaces"
    url: https://github.com/golang/go/issues/41190
    description: The companion proposal that makes embed.FS compose with the rest of the standard library.
  - title: 12. Embedding in other languages
    url: https://github.com/ziglang/zig/issues/14637
    description: D's import() and Zig's @embedFile are both expressions; Go shipped a file system.
  - title: 13. testing/fstest
    url: https://pkg.go.dev/testing/fstest
    description: TestFS and MapFS in the standard library.
---

Everyone loves //go:embed: two lines and your templates, migrations and web assets ship inside a single binary. But how does a comment end up as bytes in your program? This talk follows one directive through every stage of go build: package discovery, the lexer, pattern resolution and embedcfg, the parser's syntax tree, the compiler's static data and finally the linker. It then covers what embedding costs you, from leaked secrets with the all: prefix to rebuilding for every change, and how to test embedded file systems with os.DirFS, fs.FS and testing/fstest.
