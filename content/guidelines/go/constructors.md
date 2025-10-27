---
title: Constructors
heading: Constructors
description: Constructor patterns with validation using the enforce package
weight: 4
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

Constructors must validate all required dependencies using `enforce` helpers and return pointer
types. Only to be used in the context of when being called from a `cmd` package.
 ## New

- Prefer `NewX()` constructors over global initialisation unless it's the only constructor in the package then it will
  be written as `New()`.

## Enforce

- Not nil values → `enforce.NotNil()`
- Boolean conditions → `enforce.True()`
- Equality / inequality → `enforce.Equal()` or `enforce.NotEqual()`
- Absence of error → `enforce.NoError()`

These helpers provide simple runtime guarantees and will exit the program with a helpful message if
a condition fails.

This package can be found in `github.com/ainsleydev/webkit/pkg`.

**Example:**

```go
func NewGenerator(fs afero.Fs, manifest *manifest.Tracker, printer *printer.Console) *FileGenerator {
	enforce.NotNil(fs, "file system is required")
	enforce.NotNil(manifest, "manifest is required")
	enforce.NotNil(printer, "printer is required")

	return &FileGenerator{
		Printer:  printer,
		fs:       fs,
		manifest: manifest,
	}
}
```
