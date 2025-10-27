---
title: General
heading: General
description: TypeScript and JavaScript coding standards and patterns
publishdate: 2023-07-16
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

## Class-Based Services

For services that don't require instantiation, use static class methods:

```typescript
export class ListingService {
	private static readonly COMMON_SELECT_FIELDS = {
		slugLock: false,
		updatedAt: false,
		createdAt: false,
	} as const

	public static readonly PUBLISHED_WHERE = { _status: { equals: 'published' } } as const

	static async getVehicleListingsData(options?: {
		vehicleId?: number
	}) {
		const [manufacturers, models, parts] = await Promise.all([
			this.getManufacturers(),
			this.getModels(),
			this.getParts(),
		])
		return { manufacturers, models, parts }
	}
}
```

## Async Patterns

Use `Promise.all()` for parallel operations when there are no dependencies:

```typescript
const [manufacturers, models, parts, listings] = await Promise.all([
	getManufacturers(),
	getModels(),
	getParts(),
	getListings(),
])
```
