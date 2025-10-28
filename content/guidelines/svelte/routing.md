---
title: Routing
heading: Routing
description: SvelteKit file-based routing conventions
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

```txt
routes/
├── (auth)/           # Layout group (not in URL)
│   ├── login/
│   │   └── +page.svelte
│   ├── sign-up/
│   │   └── +page.svelte
│   └── reset-password/
│       └── +page.svelte
├── (web)/            # Web pages layout group
│   ├── [blog]/    	  # Dynamic route parameter
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
