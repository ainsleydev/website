---
title: Custom Fields
heading: Custom Fields
description: Patterns for creating reusable custom field definitions
linkText: Custom field patterns
weight: 2
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

Custom field definitions should be factory functions that return field arrays, allowing for composability and reusability.

## Factory Function Pattern

Use factory functions that accept configuration arguments and return field arrays:

```typescript
export type RichTextFieldArgs = {
	name: string
	editor?: RichTextType['editor']
	richTextOverrides?: Partial<Omit<RichTextType, 'type'>>
	htmlOverrides?: Partial<Omit<TextareaField, 'type'>>
	converters?: HTMLConvertersFunction[]
}

export const RichTextField = (args: RichTextFieldArgs): Field[] => [
	deepMerge<RichTextType, Omit<RichTextType, 'type'>>(
		{
			name: args.name,
			type: 'richText',
			editor: args.editor ? args.editor : lexicalEditor(),
		},
		args?.richTextOverrides || {},
	),
	deepMerge<TextareaField, Omit<TextareaField, 'type'>>(
		{
			name: `${args.name}Html`,
			type: 'textarea',
			admin: { readOnly: true, hidden: true },
			hooks: {
				beforeChange: [
					async ({ siblingData }) => {
						return convertLexicalToHTML({
							data: siblingData[args.name],
							converters: ({ defaultConverters }) => {
								let finalConverters = defaultConverters
								for (const customConverter of args?.converters || []) {
									finalConverters = {
										...finalConverters,
										...customConverter({ defaultConverters: finalConverters }),
									}
								}
								return finalConverters
							},
						})
					},
				],
			},
		},
		args?.htmlOverrides || {},
	),
]
```

## Slug Field Pattern

```typescript
export const SlugField: Slug = (fieldToUse = 'title', overrides = {}) => {
	const checkBoxField = deepMerge<CheckboxField, Partial<CheckboxField>>(
		{
			name: 'slugLock',
			type: 'checkbox',
			defaultValue: true,
			admin: { hidden: true, position: 'sidebar' },
		},
		checkboxOverrides || {},
	)

	const slugField = deepMerge<TextField, Partial<TextField>>(
		{
			name: 'slug',
			type: 'text',
			index: true,
			unique: true,
			required: true,
			hooks: {
				beforeValidate: [formatSlugHook(fieldToUse)],
			},
			admin: {
				position: 'sidebar',
				components: {
					Field: {
						path: '/fields/Slug/Component#Component',
						clientProps: { fieldToUse, checkboxFieldPath: checkBoxField.name },
					},
				},
			},
		},
		slugOverrides || {},
	)

	return [slugField, checkBoxField]
}
```

## Key Patterns

- **Return arrays** of fields for compound field definitions.
- **Use deepMerge** for composing field configurations with overrides.
- **Provide default values** but allow customisation via overrides.
- **Use hooks** for field transformations (e.g., generating HTML from rich text).
- **Co-locate fields** that work together (e.g., slug and slugLock).
- **Custom components** via path references for admin UI customisation.

## Usage

```typescript
fields: [
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
	...SlugField('title'),
]
```
