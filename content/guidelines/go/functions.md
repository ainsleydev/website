---
title: Function Patterns
heading: Function Patterns
description: Go function patterns using context.Context for I/O & cancellation
weight: 3
publishdate: 2025-10-26
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Context

Use `context.Context` as the first parameter for functions that perform I/O or can be cancelled.

**Example:**

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
