---
title: Context
heading: Context
description: TODO
linkText: This will appear in the box
publishdate: 2025-10-26
lastmod: 2025-10-26
draft: true
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

### Context

Use `context.Context` as the first parameter for functions that perform I/O or can be cancelled.

```go
    func Run(ctx context.Context, cmd Command) (Result, error) {
	select {
		case <-ctx.Done():
			return Result{}, ctx.Err()
		default:
			// Execute command
	}
}
```
