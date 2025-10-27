---
title: Routing
heading: Routing
description: SvelteKit file-based routing conventions
linkText: Routing conventions
weight: 2
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

SvelteKit uses file-based routing where the file structure in the `routes` directory determines the URL structure.

## Special Files

- `+layout.svelte` - Root layout component
- `+layout.server.ts` - Server-side layout data
- `+layout.ts` - Client-side layout data
- `+page.svelte` - Page component
- `+page.server.ts` - Server-side page load
- `+server.ts` - API routes
- `+error.svelte` - Error page

## Route Organisation

```
routes/
├── (auth)/           # Layout group (not in URL)
│   ├── login/
│   │   └── +page.svelte
│   ├── sign-up/
│   │   └── +page.svelte
│   └── reset-password/
│       └── +page.svelte
├── (web)/            # Web pages layout group
│   ├── [vehicle]/    # Dynamic route parameter
│   │   └── +page.svelte
│   ├── [...page]/    # Catch-all dynamic route
│   │   └── +page.svelte
│   └── search/
│       └── +page.svelte
├── (server)/         # Server routes
│   ├── robots.txt/
│   │   └── +server.ts
│   └── sitemap.xml/
│       └── +server.ts
└── api/              # API endpoints
    └── forms/
        └── +server.ts
```

## Layout Groups

Use parentheses for layout groups that don't affect the URL:

```
(auth)/login → /login
(web)/search → /search
```

## Dynamic Routes

Use square brackets for dynamic parameters:

```
[vehicle]/+page.svelte → /ford, /toyota, etc.
[id]/+page.svelte → /123, /456, etc.
```

## Catch-All Routes

Use rest parameters `[...param]` for catch-all routes:

```
[...page]/+page.svelte → /any/path/here
```

## Server-Side Data Loading

```typescript
// +page.server.ts
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals }) => {
	const vehicle = await getVehicle(params.vehicle)

	return {
		vehicle,
		user: locals.user,
	}
}
```

## Client-Side Data Loading

```typescript
// +page.ts
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch(`/api/vehicles/${params.vehicle}`)
	const vehicle = await response.json()

	return { vehicle }
}
```

## API Routes

```typescript
// +server.ts
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q')
	const results = await search(query)

	return json({ results })
}

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json()
	const result = await createItem(data)

	return json({ result }, { status: 201 })
}
```

## Form Actions

```typescript
// +page.server.ts
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const email = data.get('email')

		if (!email) {
			return fail(400, { email, missing: true })
		}

		return { success: true }
	},
}
```

## Type Safety

SvelteKit generates types in the `$types` module for each route:

```typescript
import type { PageData, PageServerLoad } from './$types'
```

## Best Practices

- **Use layout groups** to organise routes with different layouts.
- **Prefer server-side loading** for data that requires authentication or database access.
- **Use form actions** for mutations instead of API routes when possible.
- **Type your load functions** with generated types from `./$types`.
- **Keep API routes RESTful** with proper HTTP methods.
