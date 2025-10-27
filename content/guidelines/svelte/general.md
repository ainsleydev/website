---
title: General
heading: General
description: Svelte and SvelteKit component patterns
publishdate: 2023-07-16
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Component Naming

- Use **PascalCase** for component file names (e.g., `ButtonCard.svelte`, `Modal.svelte`).
- Group related components in feature directories (e.g., `/components/Form/`, `/components/Graphics/`).
- Use flat structure for standalone reusable components (e.g., `/components/Button.svelte`).

## Svelte 5 Patterns

Use Svelte 5's runes for reactivity:

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		onclick,
		darkMode = false,
		children,
	}: { onclick?: () => void; darkMode?: boolean; children?: Snippet } = $props()
</script>

<button class="btn-card" {onclick} class:btn-card--dark-mode={darkMode}>
	{@render children?.()}
</button>

<style lang="scss">
	.btn-card {
		// Styles
	}
</style>
```

## Event Handling

Use `createEventDispatcher` for component events:

```svelte
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'

	const dispatch = createEventDispatcher<{ close: void }>()

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') dispatch('close')
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown)
		return () => {
			document.removeEventListener('keydown', handleKeydown)
		}
	})
</script>

{#if isOpen}
	<dialog open aria-modal="true" on:click={handleBackdropClick}>
		<!-- content -->
	</dialog>
{/if}
```

## Context Pattern

Use context for sharing data across components:

```typescript
// +layout.svelte
import { setContext } from 'svelte'

const { settings, navigation } = data
setContext(SETTINGS, settings)
setContext(NAVIGATION, navigation)
setContext(USER, data.user)
```

```typescript
// Child component
import { getContext } from 'svelte'

const settings = getContext<Settings>(SETTINGS)
```

## Form Handling

Use Svelte stores and Zod for form state management:

```typescript
export type ClientForm = {
	fields: Writable<FormData>
	errors: Writable<FormErrors>
	validate: (opts?: { field?: string }) => boolean
	submitting: Readable<boolean>
	submit: (submitter?: HTMLElement | Event | EventTarget | null) => void
	submitted: Readable<boolean>
	enhance: (el: HTMLFormElement, submitFn?: SubmitFunction) => { destroy(): void }
}

export const clientForm = (
	schema: z.ZodSchema,
	options?: { submissionDelay?: number },
	onSubmit?: (data: FormData) => Promise<void>,
	initial: FormData = {},
): ClientForm => {
	const fields = writable<FormData>(initial)
	const errors = writable<FormErrors>({})

	const validate = (opts?: { field?: string }) => {
		const current = get(fields)
		const result = schema.safeParse(current)
		errors.set(result.success ? {} : flattenZodErrors(result.error))
		return result.success
	}

	return { fields, errors, validate, submit, submitting, submitted, enhance }
}
```

## Component Organisation

```
src/lib/
├── components/        # Reusable UI components
├── blocks/            # Page block components
├── partials/          # Layout partials
├── templates/         # Page templates
├── forms/             # Form handling
├── data/              # Data services
└── util/              # Utility functions
```

## Conditional Rendering

Use Svelte's conditional blocks:

```svelte
{#if condition}
	<p>Condition is true</p>
{:else if anotherCondition}
	<p>Another condition is true</p>
{:else}
	<p>All conditions are false</p>
{/if}
```

## List Rendering

```svelte
{#each items as item (item.id)}
	<div>{item.name}</div>
{/each}
```

## Accessibility

- Use semantic HTML elements.
- Include ARIA attributes for custom components (e.g., `aria-modal`, `aria-label`).
- Ensure keyboard navigation works correctly.
