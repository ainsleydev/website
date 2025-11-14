---
title: General
heading: General
description: Svelte and SvelteKit component patterns
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Component Naming

- Use **PascalCase** for component file names -> `ButtonCard.svelte` or `Modal.svelte`
- Group related components in feature directories -> `/components/Form/` or `/components/Graphics/`
- Use flat structure for stand-alone reusable components -> `/components/Button.svelte`

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

## Context

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

## Component Organisation

```txt
src/lib/
├── components/        # Reusable UI components
├── blocks/            # Page block components
├── templates/         # Page templates
├── forms/             # Form handling
├── data/              # Data services
└── util/              # Utility functions
```

## Accessibility

- Use semantic HTML elements.
- Include ARIA attributes for custom components (e.g., `aria-modal`, `aria-label`).
- Ensure keyboard navigation works correctly.
