---
title: Commits
heading: Commits
description: ainsley.dev Developer Guidelines | Git conventional commit format with type prefixes and present tense
weight: 1
publishdate: 2025-10-26
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

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
