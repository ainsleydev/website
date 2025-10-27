---
title: Blocks
heading: Blocks
description: Page block configuration patterns for flexible content
linkText: Block definitions
weight: 3
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

Blocks are reusable content structures that can be added to pages. They follow a consistent configuration pattern.

## Block Configuration

```typescript
export const ContentWithMedia: Block = {
	slug: 'content-with-media-block',
	interfaceName: 'BlockContentWithMedia',
	labels: {
		singular: 'Content With Media Block',
		plural: 'Content With Media Blocks',
	},
	fields: [
		...UnderlinedTextField({
			name: 'title',
			prependDescription: 'Add a title for the block.',
			overrides: {
				label: 'Title',
				required: true,
			},
		}),
		...RichTextField({
			name: 'content',
			editor: blockEditor(),
			richTextOverrides: {
				label: 'Content',
				admin: {
					description: 'The main content of the block.',
				},
			},
		}),
		{
			type: 'row',
			fields: [
				MediaPosition,
				BackgroundColourField({
					overrides: { admin: { width: '50%' } },
				}),
				{
					name: 'buttonEnable',
					label: 'With Button?',
					type: 'checkbox',
					defaultValue: false,
					admin: {
						width: '50%',
						description: 'Check this to add a button...',
					},
				},
			],
		},
		{
			name: 'media',
			label: 'Media',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		IdentifierField,
	],
}
```

## Key Patterns

- **Slug naming**: Use kebab-case with `-block` suffix (e.g., `content-with-media-block`).
- **Interface naming**: Use PascalCase with `Block` prefix (e.g., `BlockContentWithMedia`).
- **Labels**: Provide both singular and plural forms.
- **Field spreading**: Use `...` to compose complex fields from factory functions.
- **Row layout**: Group related fields using `{ type: 'row' }` for horizontal layout.
- **Conditional fields**: Use `admin.condition` for fields that depend on other fields.
- **Descriptions**: Always include `admin.description` to guide content editors.

## Conditional Fields

```typescript
{
	name: 'button',
	type: 'group',
	admin: {
		condition: (data, siblingData) => siblingData?.buttonEnable === true,
	},
	fields: [
		{
			name: 'text',
			type: 'text',
			required: true,
		},
		{
			name: 'url',
			type: 'text',
			required: true,
		},
	],
}
```

## Field Width

Use `admin.width` to control field widths in rows:

```typescript
{
	type: 'row',
	fields: [
		{
			name: 'fieldOne',
			type: 'text',
			admin: { width: '50%' },
		},
		{
			name: 'fieldTwo',
			type: 'text',
			admin: { width: '50%' },
		},
	],
}
```
