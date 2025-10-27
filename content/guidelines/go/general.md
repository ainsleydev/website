---
title: General
heading: General
description: ainsley.dev Developer Guidelines | Go code style, interfaces & naming conventions
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
weight: 1
scripts:
    - js/pages/guidelines.ts
---

## Code Style

- **Formatting**: Use `gofmt` for standard Go formatting.
- **File naming**: snake_case for files, test files end with `_test.go`.
	- Integration tests use `_integration_test.go`
- **Generated files**: `*.gen.go` files are auto-generated - do not edit.
- **Error handling**: Always check and handle errors appropriately.
- **Imports**: Standard library, third-party, then internal imports.

## Interfaces and Abstraction

- Keep interfaces small and focused (single responsibility).
- Prefer returning concrete types unless abstraction is required for testing or swapping implementations.
- Document interface expectations explicitly (e.g. "implementations must be thread-safe").

## Defining Types

Prefer to use the `type` keyword once for multiple type declarations.

**Example**

```go
type (
	// Environment contains env-specific variable configurations.
	Environment struct {
		Dev        EnvVar `json:"dev,omitempty"`
		Staging    EnvVar `json:"staging,omitempty"`
		Production EnvVar `json:"production,omitempty"`
	}
	// EnvVar is a map of variable names to their configurations.
	EnvVar map[string]EnvValue
	// EnvValue represents a single env variable configuration
	EnvValue struct {
		Source EnvSource `json:"source"`          // See below
		Value  any       `json:"value,omitempty"` // Used for "value" and "resource" sources
		Path   string    `json:"path,omitempty"`  // Used for "sops" source (format: "key")
	}
)
```

## Structs and Composition

- Prefer `NewX()` constructors over global initialisation unless it's the only constructor in the package then it will
  be written as `New()`.
- Keep structs small and cohesive; split if too many responsibilities.

## Naming Conventions

- **Integration tests**: End with `_integration_test.go`.
- **Generated files**: `*.gen.go` files are auto-generated - do not edit.
- **Interfaces**: Often end in `-er` suffix (e.g., `Reader`, `Writer`, `Store`).
- **Package names**: Short, lowercase, single-word names when possible.
