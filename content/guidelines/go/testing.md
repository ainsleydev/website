---
title: Testing
heading: Testing
description: ainsley.dev Developer Guidelines | Go testing patterns using test tables, t.Run subtests & mocking
weight: 7
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

All Go tests should be written in one of two ways:

1. As a test table, or
2. As individual `t.Run` subtests
   Use **test tables** for most cases.
   Use [**`t.Run`**](http://t.Run) **subtests** when:

- The number of input arguments in the test table exceeds **3**, or
- The complexity of assertions increases (we should **never** use `if` statements in test tables), or
- Individual test cases require unique setup logic that would need a setup function in the test
  table.

## General Rules

- Always call `t.Parallel()` at the top of every test function and within each subtest, unless:
	- It's an integration test (files ending in `_integration_test.go`).
	- It performs file I/O, shell commands, or interacts with SOPS or the OS files
	- Has the potential to fail with `--race` .
- Always use `t.Context()` when a `context.Context` is required in tests instead of
  `context.Background()`.
- All assertions should use the `assert` (and `require` when necessary) library.
- Prefer one assertion per test when possible.
- Never use `else` blocks — use assert logic instead.
- Never redeclare variables like `test := test` (variable shadowing).
- Use `got` as the variable name for actual results when comparing against expected values.
- Test names should:
	- Start with a capitalised first word,
	- Use spaces between words,
	- Not use the full title case (e.g., `"Payload default"`, `"GoLang explicit true"`).
- Always include all relevant test cases, even edge or error conditions.
- If 100% coverage is not possible, explain _why_ in a brief note above the test function (no inline
  comments).

## Test Organisation

- **One test function per exported function/method** — add new test cases as subtests within the
  existing test function rather than creating separate test functions.
- Only create a new test function if:
	- Testing a distinctly different aspect that warrants complete separation (e.g.,
	  `TestTracker_Add` vs `TestTracker_Save`).
	- The original test function would become unwieldy (>200 lines) with the addition.
- Group related test cases using descriptive subtest names that explain what's being tested.
- Aim for comprehensive coverage within each test function rather than fragmenting tests across
  multiple functions.

## Test Tables

The test should be:

- In a `map[string]struct{}` format. Where the string is the name of the test.
- The test loop should read: for `name, test := range tt` whereby the `name` of the test table
  variable is `tt`
- Use consistent field names:
	- `input` for inputs
	- `want` for expected outputs
	- `wantErr` if the function returns an error
- For error assertions, write:

```go
assert.Equal(t, test.wantErr, err != nil)
```

- Avoid `if`, `switch`, or branching logic inside the test loop.
- Don't add any code comments within the test unless explaining the why.

**Example:**

```go
func TestExample(t *testing.T) {
	t.Parallel()

	tt := map[string]struct {
		input string
		want  string
	}{
		"Example Case": {input: "foo", want: "bar"},
	}

	for name, test := range tt {
		t.Run(name, func (t *testing.T) {
			t.Parallel()
			got := DoSomething(test.input)
			assert.Equal(t, test.want, got)
		})
	}
}
```

## Subtests with `t.Run`

- Use `require` for preconditions (e.g. setup or function calls that must not fail).
- Use `assert` for validation of expected outputs.
- Use `t.Log()` to describe sections within a subtest instead of comments if assertions are bigger.
- Maintain **readability and determinism** — tests should clearly convey intent and run
  independently.
- Each test should be self-contained with no shared mutable state.

**Example:**

```go
func TestApp_OrderedCommands(t *testing.T) {
	t.Parallel()

	t.Run("Missing Skipped", func (t *testing.T) {
		t.Parallel()

		app := &App{Commands: map[Command]CommandSpec{}}
		commands := app.OrderedCommands()
		assert.Len(t, commands, 0)
	})

	t.Run("Default Populated", func (t *testing.T) {
		t.Parallel()

		app := &App{}
		err := app.applyDefaults()
		require.NoError(t, err)

		commands := app.OrderedCommands()
		require.Len(t, commands, 4)
		assert.Equal(t, "format", commands[0].Name)
	})
}
```

## Mocking

Mocks should only be introduced when a test depends on an **external interface** or system
boundary — for example, Terraform execution, encryption providers, or file I/O wrappers.

- Prefer fakes or real in-memory types where possible.
- Place generated mocks under `internal/mocks/` and prefix them with `Mock` (e.g.
  `MockInfraManager`).
- Clean up with `defer ctrl.Finish()` and avoid over-mocking.
- Use [`gomock`](https://pkg.go.dev/go.uber.org/mock/gomock) for creating mocks.
- Generate mocks into the `internal/mocks/` directory using below's example.

**Example:**

```bash
go tool go.uber.org/mock/mockgen -source=gen.go -destination ../mocks/fs.go -package=mocks
```

## Setup Functions

- If a test contains repeated setup logic (e.g., creating `App` instances, default values, or common
  test data), scan for a `setup(t)` function.
- If no `setup(t)` function exists, **create one** to encapsulate reusable logic.
- The `setup(t)` function should:
	- Accept `t *testing.T` as an argument.
	- Return any values required by multiple subtests (e.g., test structs, default app objects).
	- Call `t.Helper()` at the start.
- Use `setup(t)` in subtests to maintain readability, avoid duplication, and keep each test
  self-contained.

```go
func setup(t *testing.T) *App {
	t.Helper()

	app := &App{Name: "web", Type: AppTypeGoLang, Path: "./"}
	err := app.applyDefaults()
	require.NoError(t, err)

	return app
}

func TestApp_OrderedCommands(t *testing.T) {
	t.Parallel()

	t.Run("Default Populated", func (t *testing.T) {
		t.Parallel()

		app := setup(t)
		commands := app.OrderedCommands()
		require.Len(t, commands, 4)
		assert.Equal(t, "format", commands[0].Name)
	})
}
