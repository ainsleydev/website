---
title: Pre-Commit Checklist
heading: Pre-Commit Checklist
description: Steps to follow before committing code
weight: 2
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

Before submitting changes, verify the following:

## Branch Workflow

- [ ] Never push directly to `main` - always create a new branch.
- [ ] Branch names should be descriptive (e.g., `feature/add-sops-validation`, `fix/terraform-state-bug`).

## Verification Steps

Before committing, **always** run the following checks:

### For Go Projects

**Run all tests**:

```bash
go test ./...
```

**Run linting and formatting**:

```bash
go fmt ./...
```

If both pass, proceed with the commit. If either fails, fix the issues before committing.

### For JS Projects

**Run all tests**:

```bash
pnpm test
```

**Run linting and formatting**:

```bash
pnpm format && pnpm lint:fix
```

## General Checks

- [ ] Commit message follows the conventional commit format.
- [ ] No sensitive information (passwords, API keys, etc.) in the commit history.
- [ ] No large files accidentally committed (+50 mb)
- [ ] All new files have appropriate copyright/licence headers (if required).
