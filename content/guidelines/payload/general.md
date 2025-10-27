---
title: General
heading: General
description: Payload CMS collection and configuration patterns
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

## Code Style

- Use `camelCase` for all field names.
- Always include `admin.description` for Payload collections and fields.
- Collection slugs should be lowercase with hyphens (e.g. `'media'`, `'form-submissions'`).
- Leverage helper functions from `payload-helper` package for common patterns.

## Collection Configuration

Collections follow Payload's `CollectionConfig` type with specific conventions:

```typescript
export const Listings: CollectionConfig = {
	slug: 'listings',
	timestamps: true,
	trash: true,
	versions: {
		drafts: true,
		maxPerDoc: 10,
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['id', 'title', 'vehicle', 'manufacturer'],
		preview: (doc): string | null => {
			return `${frontendURL()}${doc.url}`
		},
	},
	access: {
		read: adminsAndCreatedBy,
		create: ({ req }) => !!req.user,
		update: adminsAndCreatedBy,
		delete: admins,
		admin: admins,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			maxLength: 80,
			admin: {
				description: `What part are you selling? Keep it clear and under 80 characters.`,
			},
		},
		// ... more fields
	],
}
```

## Hooks

Use hooks for data transformation and business logic:

```typescript
hooks: {
	beforeChange: [
		async ({ data, originalDoc, req, operation }) => {
			// Custom logic: Update location if using profile location
			const isOwner = originalDoc?.createdBy === req?.user?.id

			if ((operation === 'create' || isOwner) && data?.location?.useProfileLocation) {
				data.location = {
					...data.location,
					...req.user.location,
					useProfileLocation: true,
				}
			}
			return data
		},
	],
}
```

## Access Control

- Create separate access control functions for reusability.
- Use role-based access control (RBAC).
- Define condition functions for field-level visibility.

**Example:**

```typescript
import { checkRole } from './checkRole'

export const admins = (args: { req: { user?: any } }): boolean => {
	const user = args?.req?.user
	return checkRole(Roles.Admin, user) || checkRole(Roles.SuperAdmin, user)
}

export const adminOnly = {
	read: admins,
	create: admins,
	update: admins,
	delete: admins,
	unlock: admins,
}
```

## Preview URLs

Always configure preview URLs for collections that have corresponding frontend pages:

```typescript
admin: {
	preview: (doc): string | null => {
		return `${frontendURL()}${doc.url}`
	},
}
```
