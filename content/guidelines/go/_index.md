---
title: "Go"
weight: 3
---

### Code Style

- **Language**: Go 1.25.3
- **Formatting**: Use `gofmt` for standard Go formatting.
- **File naming**: snake_case for files, test files end with `_test.go`.
	- Integration tests use `_integration_test.go`
- **Generated files**: `*.gen.go` files are auto-generated - do not edit.
- **Error handling**: Always check and handle errors appropriately.
- **Imports**: Standard library, third-party, then internal imports.

## Interfaces and Abstraction

- Keep interfaces small and focused (a single responsibility).
- Prefer returning concrete types unless abstraction is required for testing or swapping implementations.
- Document interface expectations explicitly (e.g., "implementations must be thread-safe").

## Structs and Composition

- Use struct embedding for composition, not inheritance.
- Prefer `NewX()` constructors over global initialisation unless it's the only constructor in the package then it will
  be written as `New()`.
- Keep structs small and cohesive; split if too many responsibilities.
