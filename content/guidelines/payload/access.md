---
title: Access Control
heading: Access Control
description: Role-based access control patterns for collections
linkText: Access control patterns
weight: 4
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

Access control in Payload CMS should be role-based, composable, and reusable across collections.

## Role Definitions

Define roles as constants:

```typescript
export const Roles = {
	SuperAdmin: 'super-admin',
	Admin: 'admin',
	User: 'user',
} as const
```

## Access Control Functions

Create reusable access control functions:

```typescript
import { checkRole } from './checkRole'

export const admins = (args: { req: { user?: any } }): boolean => {
	const user = args?.req?.user
	return checkRole(Roles.Admin, user) || checkRole(Roles.SuperAdmin, user)
}

export const adminsAndCreatedBy = ({ req }: { req: { user?: any } }): boolean => {
	if (!req.user) return false
	if (checkRole(Roles.Admin, req.user) || checkRole(Roles.SuperAdmin, req.user)) {
		return true
	}
	return {
		createdBy: {
			equals: req.user.id,
		},
	}
}
```

## Reusable Access Objects

Define complete access configurations as objects:

```typescript
export const adminOnly = {
	read: admins,
	create: admins,
	update: admins,
	delete: admins,
	unlock: admins,
	admin: ({ req: { user } }) => checkRole(Roles.Admin, user) || checkRole(Roles.SuperAdmin, user),
}
```

## Field-Level Conditions

Use condition functions for field-level visibility based on user role:

```typescript
export const onlyAdminsCondition: Condition = (_data, _siblingData, { user }) =>
	user?.role === Roles.SuperAdmin || user?.role === Roles.Admin
```

**Usage in fields:**

```typescript
fields: [
	{
		name: 'internalNotes',
		type: 'textarea',
		admin: {
			condition: onlyAdminsCondition,
		},
	},
]
```

## Collection Access Example

```typescript
export const Users: CollectionConfig = {
	slug: 'users',
	access: {
		read: () => true, // Public read
		create: () => true, // Allow user registration
		update: adminsAndCreatedBy, // Admins or own profile
		delete: admins, // Admins only
		admin: admins, // Admin panel access
	},
	fields: [
		{
			name: 'role',
			type: 'select',
			required: true,
			defaultValue: 'user',
			options: [
				{ label: 'Super Admin', value: Roles.SuperAdmin },
				{ label: 'Admin', value: Roles.Admin },
				{ label: 'User', value: Roles.User },
			],
			admin: {
				condition: onlyAdminsCondition,
			},
		},
	],
}
```

## Best Practices

- **Separate concerns**: Keep access control functions in dedicated files.
- **Reuse functions**: Don't duplicate access logic across collections.
- **Type safety**: Use TypeScript for access control functions.
- **Test access**: Ensure access control works as expected for all roles.
- **Document behaviour**: Comment complex access control logic.
- **Query-based access**: Return query objects for fine-grained control.
