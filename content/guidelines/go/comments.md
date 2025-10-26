---
title: Comments
heading: Comments
description: TODO
linkText: This will appear in the box
publishdate: 2025-10-26
lastmod: 2025-10-26
draft: true
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

- Document all exported types, functions, and constants with Go doc comments.
- Ensure that the comments convey the meaning behind the code, not just the what.
- Within function bodies, only keep comments that explain _why_ something is done, not _what_ is
  done. The code itself should be clear enough to show what it does.
- Keep high-level comments that explain the flow or purpose of a section (e.g., "Try loading
  template file first", "Fallback to static markdown file").
- Remove obvious comments that just restate the code (e.g., "Load base template" before a
  `LoadTemplate()` call).

**Example:**

```go
// Generator handles file scaffolding operations for WebKit projects.
type Generator interface {
	// Bytes writes raw bytes to a file with optional configuration.
	//
	// Returns an error when  the file failed to write.
	Bytes(path string, data []byte, opts ...Option) error
}
```
