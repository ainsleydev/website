---
title: Commits
heading: Commits
description: TODO
linkText: This will appear in the box
publishdate: 2025-10-26
lastmod: 2025-10-26
draft: true
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Commit Messages

Follow a conventional commit format with a type prefix and present tense gerund (doing words):

### Format

```
<type>: <description>
```

### Types

- `feat:` - Adding new features or functionality.
- `fix:` - Fixing bugs or issues.
- `chore:` - Updating dependencies, linting, or other maintenance tasks.
- `style:` - Refactoring code or improving code style (no functional changes).
- `test:` - Adding or updating tests.
- `docs:` - Updating documentation.

### Examples

```txt
feat: Adding SOPS encryption support
fix: Resolving Terraform state lock issue
chore: Updating Go dependencies
style: Refactoring manifest loader for clarity
test: Adding integration tests for scaffold command
docs: Updating README with installation steps
```

## Pre-Commit Checklist

Before submitting changes, agents should verify the following:

#### Branch workflow

- [ ] Never push directly to `main` - always create a new branch.
- [ ] Branch names should be descriptive (e.g., `feature/add-sops-validation`,
  `fix/terraform-state-bug`).

#### Verification steps (this should be in Go?)

- [ ] All tests pass locally (run `go test ./...`).
- [ ] Code is properly formatted with `go fmt`.
- [ ] Generated files (`.gen.go`, manifest tracked files) were not manually edited.
- [ ] New exported types, functions, and constants have Go doc comments.
- [ ] Tests follow the test table or `t.Run` patterns described above.
- [ ] If adding new dependencies, ensure they're necessary and well-maintained.
