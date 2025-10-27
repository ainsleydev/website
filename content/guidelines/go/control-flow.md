---
title: Control Flow
heading: Control Flow
description: Control flow patterns and best practices
linkText: Control flow patterns
weight: 6
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Maps Over Switch Statements

Prefer using maps with function values over switch statements when dispatching based on string or
integer keys. This approach is more maintainable, extensible, and testable.

**Prefer:**

```go
type handlerFunc func(input Request) (Response, error)

var handlers = map[string]handlerFunc{
	"create": handleCreate,
	"update": handleUpdate,
	"delete": handleDelete,
}

func dispatch(action string, req Request) (Response, error) {
	handler, exists := handlers[action]
	if !exists {
		return Response{}, fmt.Errorf("unknown action: %s", action)
	}
	return handler(req)
}
```

**Avoid:**

```go
func dispatch(action string, req Request) (Response, error) {
	switch action {
	case "create":
		return handleCreate(req)
	case "update":
		return handleUpdate(req)
	case "delete":
		return handleDelete(req)
	default:
		return Response{}, fmt.Errorf("unknown action: %s", action)
	}
}
```

## Exceptions

- Type switches (`switch v := value.(type)`) are appropriate for type assertions.
- Switch statements are acceptable when matching on complex conditions or ranges.
- Small, simple switches (2-3 cases) where a map would add unnecessary complexity.
