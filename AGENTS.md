# ainsley.dev - Project Documentation

## Project Overview

ainsley.dev is a professional portfolio and agency website showcasing digital craftmanship. The site combines Hugo's static site generation with a Go backend API, creating a fast, modern web experience.

**Live URL**: https://ainsley.dev
**Staging URL**: https://staging.ainsley.dev

## Technology Stack

### Frontend
- **Hugo** v0.112.1 - Static site generator for content management
- **TypeScript** - Interactive components and animations
- **SCSS** - Styling with modern CSS practices
- **Barba.js** - Smooth page transitions
- **Anime.js** - Animation library

### Backend
- **Go** 1.24.5 - API server with Echo framework
- **OpenAPI 3.0** - API specification and documentation

### Infrastructure
- **Vercel** - Hosting and serverless deployment
- **GitHub Actions** - CI/CD pipeline
- **Husky** - Git hooks for pre-commit checks

## Directory Structure

```
/home/user/website/
├── content/           # Hugo content (markdown files)
│   ├── guidelines/   # Developer guidelines
│   ├── insights/     # Blog posts
│   ├── portfolio/    # Portfolio projects
│   ├── services/     # Service pages
│   └── about/        # About pages
├── api/              # Go API backend
│   ├── _pkg/         # API packages
│   ├── _sdk/         # Generated SDK
│   └── _mocks/       # Test mocks
├── layouts/          # Hugo templates
├── assets/           # Source files
│   ├── js/           # TypeScript files
│   ├── scss/         # Stylesheets
│   └── images/       # Images
├── config/           # Hugo configuration
│   ├── _default/     # Base config
│   ├── production/   # Production overrides
│   └── staging/      # Staging overrides
├── static/           # Static files (copied as-is)
├── bin/              # Build scripts
└── public/           # Generated output (git-ignored)
```

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Local development server
npm run serve
# or
vercel dev

# Hugo server only (no reload)
npm run serve-no-reload
```

### Building

```bash
# Development build
npm run build

# Staging build (minified)
npm run build:staging

# Production build (minified + optimized images)
npm run build:prod

# Test build with API server
npm run build:test
```

### Testing

```bash
# Run Go tests
make test

# Run with coverage
make test-coverage

# Run linting
make lint          # All
make lint-go       # Go only
make lint-ts       # TypeScript only
```

### Code Quality

Pre-commit hooks automatically run:
- Prettier formatting (TypeScript, SCSS, JavaScript)
- ESLint (TypeScript)
- gofmt (Go)

Manual commands:
```bash
npm run clean      # Format with Prettier
npm run lint       # Lint SCSS and JS
npm run lint:scss  # Lint SCSS only
npm run lint:js    # Lint/fix TypeScript
```

## API Structure

The Go API is located in `/api/_pkg/` and provides:

### Endpoints
- `GET /ping/` - Health check
- `POST /forms/contact/` - Contact form submission (sends to Slack + Email)
- `GET /credentials/` - Retrieve credentials

### Key Components
- **Echo Framework** - HTTP routing and middleware
- **OpenAPI Spec** - API documentation in `/openapi/`
- **Middleware** - Logger, analytics, error handling
- **Gateways** - Slack and email integrations
- **Testing** - Unit and integration tests

## Deployment

### Automatic Deployment
- **Main branch** → Production (ainsley.dev)
- **Staging branch** → Staging (staging.ainsley.dev)
- Handled automatically by Vercel on git push

### Manual Deploy
```bash
make deploy        # Deploy to Vercel
```

### Environment Configuration
- Development: `.env.example` template
- Staging: `config/staging/`
- Production: `config/production/`

## Content Management

### Creating Content

```bash
# New blog post
hugo new --kind post-bundle insights/my-post

# New portfolio item
hugo new --kind portfolio-bundle portfolio/client-name
```

### Content Types
- **Insights** - Blog posts and articles
- **Portfolio** - Client project showcases
- **Services** - Service offering pages
- **Guidelines** - Developer documentation
- **Brand** - Brand guidelines and assets

## Build Scripts

Located in `/bin/`:
- `image-optim.sh` - Optimize images for production
- `video-optim.sh` - Optimize videos

## Configuration Files

- **package.json** - Node.js dependencies and scripts
- **go.mod** - Go module dependencies
- **tsconfig.json** - TypeScript configuration
- **vercel.json** - Vercel deployment configuration
- **Makefile** - Build automation commands
- **.golangci.yaml** - Go linting rules

## Makefile Commands

```bash
make setup         # Install dependencies
make serve         # Run development server
make build         # Build the project
make test          # Run tests
make test-coverage # Run tests with coverage
make lint          # Run all linters
make lint-go       # Lint Go code
make lint-ts       # Lint TypeScript
make format        # Format all code
make sdk           # Generate API SDK
make deploy        # Deploy to Vercel
make clean         # Clean build artifacts
```

## Git Workflow

- **Main branch** - Production-ready code
- **Staging branch** - Pre-production testing
- **Feature branches** - Named `claude/*` or `feature/*`

### Branch Protection
- Push to `claude/*` branches must match session ID
- Use `git push -u origin <branch-name>` for new branches

## British English

All content, comments, and documentation use British English spellings:
- colour (not color)
- centre (not center)
- optimise (not optimize)
- behaviour (not behavior)

## Licence

Code Copyright 2023 ainsley.dev. Code released under the BSD-3 Clause licence.

---

# Developer Guidelines


The ainsley.dev Developer Guidelines provide coding standards, patterns, and best practices for developers and AI agents
working on ainsley.dev projects. They are designed to ensure consistency, maintainability, and quality across all
codebases, public or private.


### Purpose

These guidelines serve multiple functions:

- **Consistency**: Write common habits and conventions in projects.
- **Quality**: Promote best practices that lead to testable, maintainable code.
- **Onboarding**: Help new developers and AI agents learn our coding standards.
- **Collaboration**: Develop a shared vocabulary for technical conversation and code review.

### Guiding Principles

Across all languages and frameworks, we follow these core principles:

- **Clarity over cleverness**: Write code that is easy to understand and maintain.
- **Boring is good**: Predictability wins over magic.
- **Test your code**: Write tests that verify behaviour, not implementation details.
- **Document intent**: Comment on the "why", not the "what".
- **Use British English**: All content and comments use British spellings.
- **Review before committing**: Run linting, formatting, and tests before pushing code.

### Contributing

These guidelines are based on patterns observed in our codebases, including:

- [webkit](https://github.com/ainsleydev/webkit) - Go CLI tool for web project scaffolding

If you notice patterns or practices that should be documented, or if guidelines need clarification, please contribute by
updating the relevant sections.

## GO Guidelines


### Comments


- Document all exported types, functions, and constants with Go doc comments.
- Ensure that the comments convey the meaning behind the code, not just the what.
- All comments must end with a full stop, including inline comments and multi-line comments.
- Within function bodies, only keep comments that explain _why_ something is done, not _what_ is
  done. The code itself should be clear enough to show what it does.
- Keep high-level comments that explain the flow or purpose of a section (e.g., "Try loading
  template file first", "Fallback to static markdown file").
- Remove obvious comments that just restate the code (e.g., "Load base template" before a
  `LoadTemplate()` call).

**Example:**

```go
// Generator handles file scaffolding operations for WebKit projects.
type Generator interface {
	// Bytes writes raw bytes to a file with optional configuration.
	//
	// Returns an error when  the file failed to write.
	Bytes(path string, data []byte, opts ...Option) error
}
```

### Constructors


Constructors must validate all required dependencies using `enforce` helpers and return pointer
types. Only to be used in the context of when being called from a `cmd` package.
#### New

- Prefer `NewX()` constructors over global initialisation unless it's the only constructor in the package then it will
  be written as `New()`.

#### Enforce

- Not nil values → `enforce.NotNil()`
- Boolean conditions → `enforce.True()`
- Equality / inequality → `enforce.Equal()` or `enforce.NotEqual()`
- Absence of error → `enforce.NoError()`

These helpers provide simple runtime guarantees and will exit the program with a helpful message if
a condition fails.

This package can be found in `github.com/ainsleydev/webkit/pkg`.

**Example:**

```go
func NewGenerator(fs afero.Fs, manifest *manifest.Tracker, printer *printer.Console) *FileGenerator {
	enforce.NotNil(fs, "file system is required")
	enforce.NotNil(manifest, "manifest is required")
	enforce.NotNil(printer, "printer is required")

	return &FileGenerator{
		Printer:  printer,
		fs:       fs,
		manifest: manifest,
	}
}
```

#### Context

Use `context.Context` as the first parameter for functions that perform I/O or can be cancelled.

**Example:**

```go
    func Run(ctx context.Context, cmd Command) (Result, error) {
	select {
		case <-ctx.Done():
			return Result{}, ctx.Err()
		default:
			// Execute command
	}
}
```

### Control-flow


#### Maps Over Switch

Prefer using maps with function values over switch statements when dispatching based on string or integer keys. This
approach is more maintainable, extensible, and testable.

**Prefer**

```go
type handlerFunc func (input Request) (Response, error)

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

**Avoid**

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

#### Exceptions

- Type switches (`switch v := value.(type)`) are appropriate for type assertions.
- Switch statements are acceptable when matching on complex conditions or ranges.
- Small, simple switches (2-3 cases) where a map would add unnecessary complexity.

### Errors


- Always check errors, never ignore them with `_` unless absolutely necessary.
- If ignoring an error, add a comment explaining why.
- Return errors up the stack; don't just log and continue unless appropriate.
- Always prioritise clarity over depth of stack trace — add context that helps debugging, not repetition

#### Domain Error Types

Define custom errors to give context and allow type-based handling, rather than using generic `fmt.Errorf`. Use custom
errors only when it makes sense—for domain-specific cases where inspecting or handling by type is useful.

**Example:**

```go
type ErrInsufficientBalance struct {
    Amount float64
}

func (e ErrInsufficientBalance) Error() string {
    return fmt.Sprintf("insufficient balance: need %.2f", e.Amount)
}

// Usage
if balance < withdrawAmount {
    return ErrInsufficientBalance{Amount: withdrawAmount}
}
```

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

### Functions


#### Context

Use `context.Context` as the first parameter for functions that perform I/O or can be cancelled.

**Example:**

```go
    func Run(ctx context.Context, cmd Command) (Result, error) {
	select {
		case <-ctx.Done():
			return Result{}, ctx.Err()
		default:
			// Execute command
	}
}
```

### General


#### Code Style

- **Formatting**: Use `gofmt` for standard Go formatting.
- **File naming**: snake_case for files, test files end with `_test.go`.
	- Integration tests use `_integration_test.go`
- **Generated files**: `*.gen.go` files are auto-generated - do not edit.
- **Error handling**: Always check and handle errors appropriately.
- **Imports**: Standard library, third-party, then internal imports.

#### Interfaces and Abstraction

- Keep interfaces small and focused (single responsibility).
- Prefer returning concrete types unless abstraction is required for testing or swapping implementations.
- Document interface expectations explicitly (e.g. "implementations must be thread-safe").

#### Defining Types

- Keep structs small and cohesive; split if too many responsibilities.
- Prefer to use the `type` keyword once for multiple type declarations.

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

#### Naming Conventions

- **Integration tests**: End with `_integration_test.go`.
- **Generated files**: `*.gen.go` files are auto-generated - do not edit.
- **Interfaces**: Often end in `-er` suffix (e.g., `Reader`, `Writer`, `Store`).
- **Package names**: Short, lowercase, single-word names when possible.

### Testing


All Go tests should be written in one of two ways:

1. As a test table, or
2. As individual `t.Run` subtests
   Use **test tables** for most cases.
   Use [**`t.Run`**](http://t.Run) **subtests** when:

- The number of input arguments in the test table exceeds **3**, or
- The complexity of assertions increases (we should **never** use `if` statements in test tables), or
- Individual test cases require unique setup logic that would need a setup function in the test
  table.

#### General Rules

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

#### Test Organisation

- **One test function per exported function/method** — add new test cases as subtests within the
  existing test function rather than creating separate test functions.
- Only create a new test function if:
	- Testing a distinctly different aspect that warrants complete separation (e.g.,
	  `TestTracker_Add` vs `TestTracker_Save`).
	- The original test function would become unwieldy (>200 lines) with the addition.
- Group related test cases using descriptive subtest names that explain what's being tested.
- Aim for comprehensive coverage within each test function rather than fragmenting tests across
  multiple functions.

#### Test Tables

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

#### Subtests with `t.Run`

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

#### Mocking

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

#### Setup Functions

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

## JS Guidelines


### General


#### Code Style

- Use `camelCase` for all field names and variables.
- Prefer named exports over default exports.
- Use TypeScript's strict mode.
- Place types co-located with implementation files.

#### Naming Conventions

- **Types/Interfaces**: Use `PascalCase` (e.g., `UserService`, `ClientForm`).
- **Variables/Functions**: Use `camelCase` (e.g., `userService`, `getConfig`).
- **Constants**: Use `UPPER_SNAKE_CASE` or `camelCase` depending on export type.
- **Files**: Use `kebab-case` for directories, `PascalCase` for components/classes, `camelCase` for utilities.
- **React Components**: Use `PascalCase` (e.g., `ButtonCard.tsx`).
- **Test files**: End with `.test.ts` for unit tests, `.int.spec.ts` for integration tests.

#### Type Imports

Use the `type` keyword for type-only imports to clearly distinguish types from values:

```typescript
import type { CollectionConfig, Config } from 'payload'
import { cacheHookCollections } from './plugin/hooks.js'
import type { PayloadHelperPluginConfig } from './types.js'
```

#### Documentation

- Document all exported functions with JSDoc comments.
- Explain the purpose and parameters of functions.
- Use `@param` and `@returns` tags for clarity.

**Example:**

```typescript
/**
 * Generates an alphanumeric random string.
 * @param {number} length - The length of the string to generate
 * @returns {string} The generated random string
 */
export const generateRandomString = (length: number): string => {
	let result = ''
	while (result.length < length) {
		result += (Math.random() + 1).toString(36).substring(2)
	}
	return result.substring(0, length)
}
```

#### Utility Functions

- Write pure functions with no side effects.
- Follow single responsibility principle.
- Always provide type annotations on parameters and return types.

### Testing


#### Test Framework

- Use **Vitest** for unit and integration tests.
- Use **Playwright** for end-to-end tests.
- Use **Testing Library** for component testing.

#### Test Organisation

- Use `describe` blocks for test suites.
- Use descriptive test names that explain what's being tested.
- Follow Arrange-Act-Assert pattern.
- Group related tests together.

#### Test Naming Convention

- `*.test.ts` - Unit tests
- `*.int.spec.ts` - Integration tests
- `*.e2e.spec.ts` - End-to-end tests

#### Writing Tests

**Example:**

```typescript
import { describe, test, expect } from 'vitest'
import { ListingParams, SKIP_FILTER } from './ListingParams'

describe('ListingParams', () => {
	const params: ListingParamArgs = {
		manufacturers: [1],
		models: [10],
		parts: [99],
		eras: [2010],
		searchTerm: 'test-search',
	}

	test('serialises params to query string', () => {
		const qs = ListingParams.toSearchParams(params).toString()
		expect(qs).toContain('manufacturers=1')
		expect(qs).toContain('models=10')
	})

	test('parses query string back to params', () => {
		const qs = 'manufacturers=1&models=10&parts=99'
		const parsed = ListingParams.fromQueryString(qs)
		expect(parsed.manufacturers).toEqual([1])
	})

	test('round-trip with SKIP_FILTER values', () => {
		const original: ListingParamArgs = {
			manufacturers: [5],
			models: [SKIP_FILTER],
		}

		const qs = ListingParams.toSearchParams(original).toString()
		const parsed = ListingParams.fromQueryString(qs)

		expect(parsed.manufacturers).toEqual([5])
		expect(parsed.models).toEqual([SKIP_FILTER])
	})

	test('handles missing params gracefully', () => {
		const minimal: ListingParamArgs = { vehicleId: 1 }
		const qs = ListingParams.toSearchParams(minimal).toString()
		expect(qs).toContain('vehicle=1')
		expect(qs).not.toContain('models=')
	})
})
```

#### Best Practices

- Test behaviour, not implementation details.
- Use meaningful test names.
- Keep tests simple and focused.
- Avoid test interdependencies.
- Test edge cases and error conditions.
- Use round-trip testing for serialisation/deserialisation logic.

## HTML Guidelines


### General


#### Validity

All HTML should be using the [Markup Validation Service](https://validator.w3.org/) before creating a pull request or
pushing to production. This will help avoid common mistakes such as closing tags, wrong attributes and many more.

By validating HTML it ensures that web pages are consistent across multiple devices and platforms and increases the
chance of search engines to properly pass markup.

#### Indentation

Use tabs instead of spaces for markup. Do not mix tabs with spaces, ensure it is probably formatted.

**Avoid**

```html
<ul>
	<li>List Item</li>
</ul>
```

**Prefer**

```html
<ul>
	<li>List Item</li>
</ul>
```

#### Quotes

Always use double quotes around attribute values. Emitting quotes can avoid to bad readability, despite HTML allowing
for attributes without quotes.

**Avoid**

```html
<button class="button button-grey">My Button</button>
```

**Prefer**

```html
<button class=button disabled>My Button</button>
```

#### Line breaking

Break long lines when it exceeds the amount of characters within the editor.

It is also recommended to ensure that the closing tag is one a new line. This helps to locate the closing tag and
improves readability.

**Avoid**

```html
<p>I'm baby blue bottle tilde godard, blog ennui pour-over craft beer. Pabst chartreuse iceland, bespoke next level
	migas hoodie lyft flannel. Kale chips literally chillwave, cred occupy tofu photo booth kitsch marxism before they
	sold out unicorn bicycle rights roof party. </p>
```

**Prefer**

```html
<p>
	I'm baby blue bottle tilde godard, blog ennui pour-over craft beer. Pabst chartreuse iceland, bespoke next level
	migas hoodie lyft flannel. Kale chips literally chillwave, cred occupy tofu photo booth kitsch marxism before they
	sold out unicorn bicycle rights roof party.
</p>
```

#### Letter-casing

All attribute names, classes, IDs should be lower case and with a hyphen between two words (kebab case).

**Avoid**

```html
<h1 class="heading_Test"></h1>
<P Class="LEAD"></P>
```

**Prefer**

```html
<h1 class="hero-heading"></h1>
<p class="lead"></P>
```

#### Self closing

All self closing elements should contain `/` at the end of the tag. Please
see [this](https://www.scaler.com/topics/self-closing-tags-in-html/) article for a definition of all HTML elements with
self closing elements.

**Avoid**

```html
<img src="my-image.jpg">
```

**Prefer**

```html
<img src="my-image.jpg"/>
```

## SCSS Guidelines


### General


#### Directory Structure

Organise SCSS files into a clear hierarchy:

```text
scss/
├── abstracts/        # Variables, functions, mixins
│   ├── _colours.scss
│   ├── _breakpoints.scss
│   ├── _sizes.scss
│   ├── _tokens.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── base/             # Global styles
│   ├── _reset.scss
│   ├── _root.scss
│   ├── _fonts.scss
│   ├── _global.scss
│   └── _typography.scss
├── components/       # Component styles
└── util/             # Utility styles
└── app.scss          # Entry point
```

#### Key Patterns

- **Use `@use` instead of `@import`**: Import abstracts with aliases (e.g., `@use '../scss/abstracts' as a;`).
- **Variable naming**: Use kebab-case (e.g., `$section-75`, `$border-radius-4`).
- **CSS variable naming**: Use `--kebab-case` (e.g., `--token-text-heading`).
- **Parent selector**: Use `$self: &;` for compound selectors.
- **Nesting**: Nest related modifiers but avoid deep nesting (max 3 levels).

#### Breakpoint Mixin

Use breakpoint mixins for responsive design:

```scss
@use '../abstracts' as a;

.component {
	font-size: 16px;

	@include a.mq(tab) {
		font-size: 18px;
	}

	@include a.mq(desk) {
		font-size: 20px;
	}
}
```

#### Colour System

Define colours as maps and generate CSS variables:

```scss
$colours: (
	'red': (
		'50': #fef2f2,
		'500': #ef4444,
		'900': #7f1d1d,
	),
	'blue': (
		'50': #eff6ff,
		'500': #3b82f6,
		'900': #1e3a8a,
	),
)

// Used in :root as CSS variables
--colour-red-50: #fef2f2;
--colour-blue-500: #3b82f6;
```

#### Scoped Component Styles

When using component-scoped SCSS in Svelte:

```svelte
<style lang="scss">
	@use '../scss/abstracts' as a;

	.btn-card {
		padding: a.$spacing-4;
		border-radius: a.$border-radius-2;

		&--dark-mode {
			background: var(--colour-grey-900);
			color: var(--colour-white);
		}
	}
</style>
```

### Naming


#### Component Styling Pattern

Use BEM-inspired modifiers with parent selector:

```scss
@use '../scss/abstracts' as a;

.section {
	$self: &;
	position: relative;

	&-padding {
		padding-block: a.$section-75;

		&#{$self}-small {
			padding-block: a.$section-50;
		}

		&#{$self}-large {
			padding-block: a.$section-100;
		}
	}

	&-padding-top {
		padding-top: a.$section-75;

		&#{$self}-small {
			padding-top: a.$section-50;
		}
	}
}
```

## GIT Guidelines


### Commits


Follow a conventional commit format with a type prefix and present tense gerund (doing words):

#### Format

```
<type>: <description>
```

#### Types

- `feat:` - Adding new features or functionality.
- `fix:` - Fixing bugs or issues.
- `chore:` - Updating dependencies, linting, or other maintenance tasks.
- `style:` - Refactoring code or improving code style (no functional changes).
- `test:` - Adding or updating tests.
- `docs:` - Updating documentation.

#### Examples

```txt
feat: Adding SOPS encryption support
fix: Resolving Terraform state lock issue
chore: Updating Go dependencies
style: Refactoring manifest loader for clarity
test: Adding integration tests for scaffold command
docs: Updating README with installation steps
```

### Pre-commit


Before submitting changes, verify the following:

#### Branch Workflow

- [ ] Never push directly to `main` - always create a new branch.
- [ ] Branch names should be descriptive (e.g., `feature/add-sops-validation`, `fix/terraform-state-bug`).

#### Verification Steps

Before committing, **always** run the following checks:

#### For Go Projects

**Run all tests**:

```bash
go test ./...
```

**Run linting and formatting**:

```bash
go fmt ./...
```

If both pass, proceed with the commit. If either fails, fix the issues before committing.

#### For JS Projects

**Run all tests**:

```bash
pnpm test
```

**Run linting and formatting**:

```bash
pnpm format && pnpm lint:fix
```

#### General Checks

- [ ] Commit message follows the conventional commit format.
- [ ] No sensitive information (passwords, API keys, etc.) in the commit history.
- [ ] No large files accidentally committed (+50 mb)
- [ ] All new files have appropriate copyright/licence headers (if required).

