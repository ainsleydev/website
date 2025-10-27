---
title: Pre-Commit Checklist
heading: Pre-Commit Checklist
description: Steps to follow before committing code
linkText: Pre-commit checklist
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

1. **Run all tests**:
   ```bash
   go test ./...
   ```

2. **Run linting and formatting**:
   ```bash
   pnpm check
   ```

If both pass, proceed with the commit. If either fails, fix the issues before committing.

### Handling Network Issues During Testing

If you encounter network errors when running `go test ./...` or `pnpm check` (e.g., "dial tcp: lookup storage.googleapis.com"), follow these steps:

1. **Check the local Go version**:
   ```bash
   GOTOOLCHAIN=local go version
   ```

2. **Temporarily downgrade `go.mod`** to match the local Go version:
   ```bash
   # If local version is go1.24.7, change go.mod from:
   # go 1.25.3
   # to:
   # go 1.24.7
   ```

3. **Run tests with the local toolchain**:
   ```bash
   GOTOOLCHAIN=local go test ./... -timeout 5m
   ```

4. **Verify the code compiles and tests pass** (or skip appropriately).

5. **Restore the original Go version in `go.mod`** before committing:
   ```bash
   # Change back to:
   # go 1.25.3
   ```

6. **CRITICAL: Never commit the downgraded `go.mod` version**. Always restore it to the original version before staging files.

7. **Alternative formatting check** (if `pnpm check` fails due to network):
   ```bash
   GOTOOLCHAIN=local go fmt ./...
   GOTOOLCHAIN=local go vet ./...
   ```

## Additional Checks

- [ ] Code is properly formatted with `go fmt`.
- [ ] Generated files (`.gen.go`, manifest tracked files) were not manually edited.
- [ ] New exported types, functions, and constants have Go doc comments.
- [ ] Tests follow the test table or `t.Run` patterns.
- [ ] If adding new dependencies, ensure they're necessary and well-maintained.
- [ ] All comments end with a full stop.
- [ ] Error handling is appropriate and errors are wrapped with context.
- [ ] No debug statements or console.log() calls left in the code.

## For TypeScript/JavaScript Projects

- [ ] Run linting: `pnpm lint`
- [ ] Run formatting: `pnpm format`
- [ ] Run tests: `pnpm test`
- [ ] Type check: `pnpm type-check` (if applicable)
- [ ] Build succeeds: `pnpm build`

## General Checks

- [ ] Commit message follows the conventional commit format.
- [ ] No sensitive information (passwords, API keys, etc.) in the code.
- [ ] No large files accidentally committed.
- [ ] All new files have appropriate copyright/license headers (if required).
