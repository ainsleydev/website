---
title: Naming
heading: Naming
description: SCSS BEM-inspired naming conventions & component patterns
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
weight: 2
scripts:
    - js/pages/guidelines.ts
---

## Component Styling Pattern

Use BEM-inspired modifiers with parent selector:

```scss
@use '../scss/abstracts' as a;

.section {
	$self: &;
	position: relative;

	&-padding {
		padding-block: a.$section-75;

		&#{$self}-small {
			padding-block: a.$section-50;
		}

		&#{$self}-large {
			padding-block: a.$section-100;
		}
	}

	&-padding-top {
		padding-top: a.$section-75;

		&#{$self}-small {
			padding-top: a.$section-50;
		}
	}
}
```
