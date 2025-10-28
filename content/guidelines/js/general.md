---
title: General
heading: General
description: TypeScript and JavaScript coding standards and patterns
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Code Style

- Use `camelCase` for all field names and variables.
- Prefer named exports over default exports.
- Use TypeScript's strict mode.
- Place types co-located with implementation files.

## Naming Conventions

- **Types/Interfaces**: Use `PascalCase` (e.g., `UserService`, `ClientForm`).
- **Variables/Functions**: Use `camelCase` (e.g., `userService`, `getConfig`).
- **Constants**: Use `UPPER_SNAKE_CASE` or `camelCase` depending on export type.
- **Files**: Use `kebab-case` for directories, `PascalCase` for components/classes, `camelCase` for utilities.
- **React Components**: Use `PascalCase` (e.g., `ButtonCard.tsx`).
- **Test files**: End with `.test.ts` for unit tests, `.int.spec.ts` for integration tests.

## Type Imports

Use the `type` keyword for type-only imports to clearly distinguish types from values:

```typescript
import type { CollectionConfig, Config } from 'payload'
import { cacheHookCollections } from './plugin/hooks.js'
import type { PayloadHelperPluginConfig } from './types.js'
```

## Documentation

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

## Utility Functions

- Write pure functions with no side effects.
- Follow single responsibility principle.
- Always provide type annotations on parameters and return types.
