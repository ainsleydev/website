
---
title: Errors
heading: Errors
description: TODO
linkText: This will appear in the box
weight: 2
publishdate: 2025-10-26
lastmod: 2025-10-26
draft: true
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

- Always check errors, never ignore them with `_` unless absolutely necessary.
- If ignoring an error, add a comment explaining why.
- Return errors up the stack; don't just log and continue unless appropriate.
- Aways prioritise clarity over depth of stack trace — add context that helps debugging, not
  repetition.

#### Using errors.Wrap

Always use `errors.Wrap` from `github.com/pkg/errors` for adding context to errors. Use `fmt.Errorf`
if there are more than one argument that's not an error.

I.e. you can use `fmt.Errorf`, but only when needing to format.

**Example:**

```go
func LoadConfig(fs afero.Fs, path string) (*Config, error) {
	data, err := afero.ReadFile(fs, path)
	if err != nil {
		return nil, errors.Wrap(err, "reading config file")
	}
	return parseConfig(data)
}

func ValidatePort(port int) error {
	if port < 1024 || port > 65535 {
		return fmt.Errorf("invalid port %d: must be between 1024 and 65535", port)
	}
	return nil
}
```
