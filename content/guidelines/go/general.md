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

## Naming Conventions

- **Exported identifiers**: Use `PascalCase` (e.g., `UserService`, `GetConfig`).
- **Unexported identifiers**: Use `camelCase` (e.g., `userService`, `getConfig`).
- **Files**: Use `snake_case` for file names (e.g., `user_service.go`).
- **Test files**: End with `_test.go` (e.g., `user_service_test.go`).
- **Integration tests**: End with `_integration_test.go`.
- **Generated files**: `*.gen.go` files are auto-generated - do not edit.
- **Interfaces**: Often end in `-er` suffix (e.g., `Reader`, `Writer`, `Store`).
- **Package names**: Short, lowercase, single-word names when possible.
