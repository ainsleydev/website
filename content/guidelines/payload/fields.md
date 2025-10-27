---
title: Fields
heading: Fields
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

## Width

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

## Reusable Fields

For fields that occur more than once within the codebase, they should be abstract within `src/fields`. Every field that
is configurable should accept overrides so the caller can override particular parts of the fieldd.

### FAQs Example

```typescript
import { ArrayField, deepMerge, Field } from 'payload'

export type FAQsFieldArgs = {
	overrides?: Partial<Omit<ArrayField, 'type'>>
}

export const FAQsField = (args?: FAQsFieldArgs): Field => {
	return deepMerge<ArrayField, Omit<ArrayField, 'type'>>(
		{
			name: 'faqs',
			label: 'FAQs',
			type: 'array',
			fields: [
				{
					name: 'question',
					label: 'Question',
					type: 'text',
					required: true,
					admin: {
						description: 'Add a question for the FAQ item.',
					},
				},
				{
					name: 'answer',
					type: 'textarea',
					label: 'Answer',
					required: true,
					admin: {
						description: 'Add a content (answer) for the FAQ item.',
					},
				},
			],
		},
		args?.overrides || {},
	)
}
```

### Slug Example

```typescript
export const SlugField: Slug = (fieldToUse = 'title', overrides = {}) => {
	const checkBoxField = deepMerge<CheckboxField, Partial<CheckboxField>>(
		{
			name: 'slugLock',
			type: 'checkbox',
			defaultValue: true,
			admin: {hidden: true, position: 'sidebar'},
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
						clientProps: {fieldToUse, checkboxFieldPath: checkBoxField.name},
					},
				},
			},
		},
		slugOverrides || {},
	)

	return [slugField, checkBoxField]
}
```

### Key Patterns

- **Use deepMerge** for composing field configurations with overrides.
- **Provide default values** but allow customisation via overrides.
- **Co-locate fields** that work together (e.g., slug and slugLock).
- **Custom components** via path references for admin UI customisation.
