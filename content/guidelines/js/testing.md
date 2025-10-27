---
title: Testing
heading: Testing
description: JavaScript and TypeScript testing patterns with Vitest
weight: 2
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Test Framework

- Use **Vitest** for unit and integration tests.
- Use **Playwright** for end-to-end tests.
- Use **Testing Library** for component testing.

## Test Organisation

- Use `describe` blocks for test suites.
- Use descriptive test names that explain what's being tested.
- Follow Arrange-Act-Assert pattern.
- Group related tests together.

## Test Naming Convention

- `*.test.ts` - Unit tests
- `*.int.spec.ts` - Integration tests
- `*.e2e.spec.ts` - End-to-end tests

## Writing Tests

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

## Best Practices

- Test behaviour, not implementation details.
- Use meaningful test names.
- Keep tests simple and focused.
- Avoid test interdependencies.
- Test edge cases and error conditions.
- Use round-trip testing for serialisation/deserialisation logic.
