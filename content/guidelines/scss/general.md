---
title: General
heading: General
description: SCSS patterns, directory structure, variables & breakpoint mixins
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
weight: 1
scripts:
    - js/pages/guidelines.ts
---

## Directory Structure

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

## Key Patterns

- **Use `@use` instead of `@import`**: Import abstracts with aliases (e.g., `@use '../scss/abstracts' as a;`).
- **Variable naming**: Use kebab-case (e.g., `$section-75`, `$border-radius-4`).
- **CSS variable naming**: Use `--kebab-case` (e.g., `--token-text-heading`).
- **Parent selector**: Use `$self: &;` for compound selectors.
- **Nesting**: Nest related modifiers but avoid deep nesting (max 3 levels).

## Breakpoint Mixin

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

## Colour System

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

## Scoped Component Styles

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
