---
title: Formatting
heading: Formatting
description: TODO
linkText: This will appear in the box
publishdate: 2023-07-16
lastmod: 2023-07-16
draft: true
pageColour: white
scripts:
    - js/pages/guidelines.ts
---

{{< lead >}}
I'm baby chartreuse bicycle rights squid narwhal, slow-carb pour-over street art food truck. Pop-up pitchfork vaporware
migas edison bulb, waistcoat tonx +1 sriracha slow-carb raw denim fashion axe health goth listicle synth. Scenester
butcher direct trade, flexitarian hexagon unicorn mustache bruh asymmetrical lomo pok pok mukbang.
{{< /lead >}}

## Validity

All HTML should be using the [Markup Validation Service](https://validator.w3.org/) before creating a pull request or
pushing to production. This will help avoid common mistakes such as closing tags, wrong attributes and many more.

By validating HTML it ensures that web pages are consistent across multiple devices and platforms and increases the
chance of search engines to properly pass markup.

## Indentation

Use tabs instead of spaces for markup. Do not mix tabs with spaces, ensure it is probably formatted.

**Not recommended**

```html
<ul>
	<li>List Item</li>
</ul>
```

**Recommended**

```html
<ul>
	<li>List Item</li>
</ul>
```

## Quotes

Always use double quotes around attribute values. Emitting quotes can avoid to bad readability, despite HTML allowing
for attributes without quotes.

**Not recommended**

```html
<button class="button button-grey">My Button</button>
```

**Recommended**

```html
<button class=button disabled>My Button</button>
```

## Line breaking

Break long lines when it exceeds the amount of characters within the editor.

It is also recommended to ensure that the closing tag is one a new line. This helps to locate the closing tag and
improves readability.

**Not recommended**

```html
<p>I'm baby blue bottle tilde godard, blog ennui pour-over craft beer. Pabst chartreuse iceland, bespoke next level
	migas hoodie lyft flannel. Kale chips literally chillwave, cred occupy tofu photo booth kitsch marxism before they
	sold out unicorn bicycle rights roof party. </p>
```

**Recommended**

```html
<p>
	I'm baby blue bottle tilde godard, blog ennui pour-over craft beer. Pabst chartreuse iceland, bespoke next level
	migas hoodie lyft flannel. Kale chips literally chillwave, cred occupy tofu photo booth kitsch marxism before they
	sold out unicorn bicycle rights roof party.
</p>
```

## Letter-casing

All attribute names, classes, IDs should be lower case and with a hyphen between two words (kebab case).

**Not recommended**

```html
<h1 class="heading_Test"></h1>
<P Class="LEAD"></P>
```

**Recommended**

```html
<h1 class="hero-heading"></h1>
<p class="lead"></P>
```

## Self closing

All self closing elements should contain `/` at the end of the tag. Please
see [this](https://www.scaler.com/topics/self-closing-tags-in-html/) article for a definition of all HTML elements with
self closing elements.

**Not recommended**

```html
<img src="my-image.jpg">
```

**Recommended**

```html
<img src="my-image.jpg"/>
```
