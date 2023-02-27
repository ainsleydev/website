---
title: Responsibilities as a developer for optimised SEO.
linktitle: TODO
description: TODO
date: 2017-02-01
publishdate: 2017-02-01
lastmod: 2017-02-01
draft: false
pageColour: white
tags:
  - SEO
  - Performance
  - Best Practices
author: Ainsley Clark
---

Go to one of your websites you have developed and turn JavaScript off, does the page still function as it should? Is all
the content rendered? Do images and layouts appear correctly on the page? If the answer is no, it may be time to
consider refactoring your code base to allow for a more SEO friendly website. As developers, it may be easier to use a
particular framework or library or even add functionality via JavaScript, but consider the technical debt before you do.
Here are some tricks and tips in order to boost your page rankings from a technical viewpoint.

## How does Google Crawl?

When Google crawls a new website, it sends a normal HTTP GET request to the site and retrieves a bare-bones version of
the page. It then proceeds to render and load JavaScript for that page. It now has two versions, one that has been
server side rendered and one with JavaScript enabled. It proceeds to make a comparison between these two versions and if
it sees a difference, they will continue to keep rendering on for the long term. If they don't see any difference,
rendering is usually switched off.

Source: https://www.onely.com/blog/googles-two-waves-of-indexing/

![Google Analytics](images/intro.jpg)

I say this loosely, as 9 times out of 10 this is the case, but sometimes they may choose to continue to index the
rendered version of the page, and visa versa. Ultimately there is
a [two phased approach](https://www.botify.com/blog/client-side-server-side-rendering-seo) to evaluating a web page, and
JavaScript content might be missed on the first 'wave' of processing and not included in Google's index. JS can also
slow search engine bots down, which on large sites can introduce crawl budget issues (evaluating websites can cost a
large amount of money in resources).

## Rendering

Rendering is the process of populating templates (HTML) with data from APIs or databases. It can happen either on the
server or client side. It allows for rich data to be displayed in your markup from different sources. Below is a
comparison between both server and client side rendering.

### Client Side Rendering (CSR)

CSR is a dynamic rendering method. The content is rendered using JavaScript inside the browser usually via a framework
such as React or Vue. Content is parsed dynamically and there is little HTML content being rendered on first load, as
shown below.

```html
<html>
	<body>
		<div id="app"></div>
	</body>
	<script src="client-side-framework.js"></script>
	<script src="app.ts"></script>
</html>
```

### Server Side Rendering (SSR)

SSR is the traditional rendering method. When you request a page, the server does the heavy lifting and processes all
the markup so the end user receives all the HTML rendered. The client only has to download assets such as JS, CSS and
imagery.

```html
<html>
	<body>
	<article>
		<section>
			<h1>My title</h1>
			<p>All my lovely content</p>
		</section>
	</article>
	</body>
	<script src="app.ts"></script>
</html>
```

### Takeaways

We know that Google limits the amount of time spent on processing rendering dynamic content passed as it's heavy on
resources and takes a lot longer to index. With that in mind, how can we expect Google to see all of our lovely, well
written content, if it has to render it? It's detrimental to on-page SEO.

JS should be used to progressively enhance the websites you develop and add additional features and behaviour such as
animation. **It should not be used to display content that Google might find difficult to index.** We want to ensure all
the content we have written is visible on this first `wave` of indexing.

> With server-side rendering, whenever you want to see a new web page, you have to go out and get it. This is analogous
> to you driving over to the supermarket every time you want to eat. With client-side rendering, you go to the
> supermarket once and spend 45 minutes walking around buying a bunch of food for the month. Then, whenever you want to
> eat, you just open the fridge.”
> -- <cite>[Adam Zerner](https://medium.com/@benjburkholder/javascript-seo-server-side-rendering-vs-client-side-rendering-bc06b8ca2383)</cite>

## Frameworks

**Stop using Angular, Vue or React to serve your front-end website**

I get it, adding a JS framework to your site makes for an **extremely** easy development experience. JS frameworks have
come a long way in the last few years and are ever so increasingly popular. But using a JS framework in conjunction with
CSR (client side rendering)
has [massive SEO implications](https://medium.com/@benjburkholder/javascript-seo-server-side-rendering-vs-client-side-rendering-bc06b8ca2383)
to your site.

Full JavaScript websites built on libraries like React and Angular may
be [completely blank until they’re rendered](https://www.botify.com/blog/client-side-server-side-rendering-seo),
depending on how they’re coded (as shown above). When Googlebot sees that the DOM has been changed by CSS/JS it assesses
the page to see if any additional information has been added. If links or content are added by JS, they will be
**down-weighted** in their performance and thus have a less positive effect on rankings.

For example: Links will not pass any weight at all to the page they are linking to if generated by JS, but will be
followed. Content will be considered as secondary style content if added by JS and seen as less important.

## Semantics

Using the correct semantic HTML has a huge amount of benefits, not only for SEO, including:

- Creating a good basis for accessibility and assistive technologies.
- Displaying to bots (crawlers) what you are trying to achieve.
- Making your codebase a lot more readable to other developers.

A simple example:

```html
<p>
	This is an example to show you the <span style="font-weight: bold;">importance</span> of
	<span style="font-style: italic">semantics</span>
</p>
```

Here we are using CSS to manipulate the style of an element, instead of using the browsers pre-formatted styles as shown
below.

```html
<p>
	This is an example to show you the <strong>importance</strong> of <em>semantics</span>
</p>
```

Even better, let's see a more detailed example:

```html
<html lang="en-GB">
	<body>
		<div class="header">
			<div class="logo">
				<img src="/logo.svg" alt="Logo">
			</div>
			<div class="nav">
				<ul>
					<li><a href="ainsley.dev">Home</a></li>
					<li><a href="ainsley.dev">About</a></li>
					<li><a href="ainsley.dev">Contact</a></li>
				</ul>
			</div>
		</div>
		<div class="main-content">
			<div class="aside">
				<h2>Aside</h2>
			</div>
			<div class="article">
				<div class="section">
					<h1>Amazing website</h1>
					<p>Tagline</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<p>Designed by <a href="https://ainsley.dev">Ainsley Clark</a></p>
		</div>
	</body>
</html>
```

That isn't pretty, but it works. I think we can do a lot better:

```html
<html lang="en-GB">
	<body>
		<header>
			<figure class="logo">
				<img src="/logo.svg" alt="Logo">
			</figure>
			<nav>
				<ul>
					<li><a href="ainsley.dev">Home</a></li>
					<li><a href="ainsley.dev">About</a></li>
					<li><a href="ainsley.dev">Contact</a></li>
				</ul>
			</nav>
		</header>
	<main>
		<aside>
			<h2>Aside</h2>
		</aside>
		<article>
			<section>
				<h1>Amazing website</h1>
				<p>Tagline</p>
			</section>
		</article>
		</div>
		<footer>
			<p>Designed by <a href="https://ainsley.dev">Ainsley Clark</a></p>
		</footer>
	</body>
</html>
```

You can see how much easier that is to read. Each element describes what it's doing, which isn't just beneficial for
your eyes, but for SEO
too. [Search engines give more importance](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML) to
keywords inside headings than non-semantics `<div>`'s etc. So it's **extremely** important to keep this in mind when
you're developing your next website. Think about what the element is describing before just using another `<div>`.

## Linking

Internal links boost rankings. Google follows links to discover content on websites and to rank this content in the
SERPs. Here are a few tips on linking in your website.

1. Do not rely on `<div>` or `<span>` or use JavaScript handlers. Crawlers will have problems following the link as well
	 as using assistive technologies.

```html
<!-- Wrong -->
<span onclick="goTo('home')">Home</span>

<!-- Right -->
<a href="/home">Home</a>
```

2. Never have an empty link or anchor text. Anchor text is really helpful for rankings. Google uses anchor text in order
	 to qualify the resources you create a reference
	 to. [Broken internal links](https://www.semrush.com/blog/internal-links-guide-to-building-strategy-that-works/) also
	 result in both users and crawlers being sent to 404 pages, which doesn't communicate authority and send the right
	 signals to Googlebot.

```html
<!-- Wrong -->
<a href=""></a>

<!-- Right -->
<a href="/home">Home</a>
```

3. Only use `rel=nofollow` on external links. It restricts Googlebot's visibility through your site.

```html
<!-- Wrong, it's an internal link! -->
<a href="/home" rel="nofollow"></a>

<!-- Right -->
<a href="/home">Home</a>
```

> Internal links can help Google discover more articles within a site, so the anchor text should provide context to what
> the linked page is about. Nothing wrong using long anchor text.
> -- <cite>[John Mueller](https://www.searchenginejournal.com/top-seo-insights-google-john-mueller/278829/)</cite>

## No JS fallbacks

Only use JS when you have to! Ask yourself, can this be achieved using CSS only? If the answer is yes, do it! I get it,
JS is a lot easier to implement, and saves a lot of time, but it should be used to enhance the user's journey, not
detract from it. Progressive enhancement should be considered at the very beginning of a site build when you're fleshing
out your markup. I have seen and witnessed a tonne of developers using JavaScript at **every opportunity**, and
sometimes it's really not necessary.

### The power of &lt;noscript&gt;

The `<noscript>` tag has magical powers, it only renders the markup inside the element when users have disabled scripts
in their browsers. It can be used in both `<head>` and `<body>`. When used inside `<head>`, the `<noscript>` element can
only contain `<link>`, `<style>`, and `<meta>` elements.

A common example would be:

```html
<noscript>
	<h1>Sorry, you need to enable JavaScript to use this page.</h1>
</noscript>
```

### Styling

Applying no JS styles can be a bit of pain. A neat trick is to have a `.scss` file with all of your no JS styling and
compile it as a separate CSS file, let's call it `no-js.css`. In the `<head>` you can encapsulate the CSS file in
a `<noscript>` element to only display when the client has no JS.

```html
<head>
	<noscript>
		<link rel="stylesheet" href="/css/no-js.css">
	</noscript>
</head>
```

This makes things a lot simpler, as we can define some CSS for our page instead of adding a `no-js` class to the body.
This will avoid any layout shifts and styling glitches. It also helps our code bases become a lot more maintainable and
easier to read.

### Checkbox Hack

I use the checkbox hack religiously. It's extremely useful and helps with emulating a JS **click** event handler.
A `<input type="checkbox">` is used in conjunction with a `<label>` and an element you are trying to control.

```html
<input type="checkbox" id="toggle">
<label for="toggle">Do Something</label>
<div class="card">Control me</div>
```

Then with CSS, you hide the checkbox entirely (using `display: none;` or `position: absolute`) and style the label to be
a button or control for the element you are trying to manipulate. The label acts as a substitute for the input as we
have used the `for` attribute. When someone clicks the label, it will toggle the checkbox on or off. Now we can target
styles that specify only when the input is checked (or when someone clicks the label).

```css
#toggle:checked ~ .card {
	display: block;
}

#toggle:checked ~ label {
	background-color: red;
}
```

There are a tonne of things you can do with the checkbox hack, but let's take an accordion for an example. The user
clicks on a tab or header and content is expanded and becomes visible. Using the previous example, when the user clicks
the label (our accordion header), we can expand the hidden content.

{{< codepen id="ExoyRZB" >}}

**Note:** There are only certain things we can achieve using CSS. We should only be adding JS to **enhance** the user's
experience. This should be done at the **very minimum** as a no JS fallback, to help increase usability across the
board.

## Imagery

A lot of recommendations in Google's [Page Speed Insights](https://pagespeed.web.dev/) stem from improperly sized and
uncompressed images. It's important to use and embrace the tools around you as a developer to optimise imagery, so the
user still receives rich and detailed images which are still quick and efficient on initial page load.

### Lazy loading

Images should be [lazy loaded](https://www.imperva.com/learn/performance/lazy-loading/), meaning the image should only
be loaded once the user has scrolled to that part of the page. This ensures that assets below the fold are only loaded
when needed, thus saving system resources and increasing LCP (largest contentful paint) as the bandwidth has reduced.

```html
<figure>
	<img class="lazy" data-src="/images/cat.jpg"/>
</figure>
```

Most [lazy loading libraries](https://github.com/verlok/vanilla-lazyload) use the `data-src` attribute and when the user
has scrolled past a particular point on the windows Y offset, it replaces `data-src` with `src` which therefore loads
the asset on the client's computer.

However, if this is all achieved by JavaScript, how can we add a fallback for clients with no javascript?

```html
<figure>
	<img class="lazy" data-src="/images/cat.jpg" alt="Cat"/>
	<noscript>
		<img src="/images/cat.jpg" alt="Cat"/>
	</noscript>
</figure>
```

Here we are saying **when JavaScript is not enabled, render this image** with the `src` attribute instead of `data-src`.
We would need to add some styling to the `<img>` that is lazy loaded to ensure that it isn't displayed on browsers with
JS disabled. This can be as simple as adding `display: none` to all images with a class of `lazy`.

### Sizes

You've just downloaded a crystal clear image from [Unsplash](https://unsplash.com/) for your new hero, it's 1920 by 1080
pixels which is perfect for HD resolutions, but what about mobile and tablet? **We don't need to serve a huge image to
clients with smaller viewports**.

Step in `<picture>` with `<source>`.

```html
<picture>
	<source media="(max-width: 767px)" srcset="/images/cat-mobile.jpg"/>
	<source media="(max-width: 1024px)" srcset="/images/cat-tablet.jpg"/>
	<img src="/images/cat.jpg" alt="Cat"/>
</picture>
```

Here we are telling the browser:

- Load `cat-mobile.jpg` if the browser is less than 767 pixels wide.
- Load `cat-tablet.jpg` if the browser is less than 1024 pixels wide.
- Load `cat.jpg` for all other viewports.

We can also combine this with lazy loading if the image is below the fold, to ensure the image still gets rendered as a
no JS fallback.

```html
<picture>
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.jpg"/>
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.jpg"/>
	<img class="lazy" data-src="/images/cat.jpg" alt="Cat"/>
	<noscript>
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.jpg"/>
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.jpg"/>
		<img src="/images/cat.jpg" alt="Cat"/>
	</noscript>
</picture>
```

### Optimisation

We don't have to stop there, we can take advantage of the (relatively) new image
formats [WebP](https://developers.google.com/speed/webp) and [AVIF](https://aomedia.org/av1-features/). Both of these
provide a far more superior compression level to the original JPG and PNG codecs. AVIF has even been said
to [have an edge](https://www.coywolf.news/webmaster/avif-versus-webp-image-format/) on WebP with smaller files and
deeper colours.

By using the `<picture>` element, the browser obtains the first image that matches its abilities. Chrome, for example,
supports the `.avif` and `.webp` file extensions. We can tell this by using Google's inspector and taking a look at the
request headers.

```
accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
```

Below is an example of loading AVIF and WebP images in a `<picture>` element. It may look drastic and long-winded, but
it's key for delivering high quality compressed images to your users. Here we are specifying AVIF and WebP lazy loaded
images for multiple screen resolutions with a no JS fallback.

Instead of writing this out every time you need an image, you can simply make a reusable ==partial== to render the
markup that takes in the image path, sizes and any additional attributes.

```html
<picture>
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.avif"/>
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.webp"/>
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.jpg"/>
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.avif"/>
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.webp"/>
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.jpg"/>
	<img class="lazy" data-src="/images/cat.avif" alt="Cat"/>
	<img class="lazy" data-src="/images/cat.webp" alt="Cat"/>
	<img class="lazy" data-src="/images/cat.jpg" alt="Cat"/>
	<noscript>
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.avif"/>
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.webp"/>
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.jpg"/>
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.avif"/>
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.webp"/>
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.jpg"/>
		<img src="/images/cat.avif" alt="Cat"/>
		<img src="/images/cat.webp" alt="Cat"/>
		<img src="/images/cat.jpg" alt="Cat"/>
	</noscript>
</picture>
```

You can install the [cwebp](https://developers.google.com/speed/webp/download)
and [libavif](https://github.com/AOMediaCodec/libavif) libraries on any server, and they can be configured for automatic
conversion on an image upload.

[Squidge](https://github.com/ainsleyclark/squidge) is a WordPress plugin that offers this functionality and is
completely free. It uses the native `cwebp`, `avifenc` libraries to compress your images and comes with a really simple
API to display images. A CLI is also bundled in, so you can regenerate our entire media library to become more SEO
friendly. Check it out [here](https://wordpress.org/plugins/squidge/)

For a more humble approach, I usually compress all images in a `public` folder when running production scripts using
npm. Below is an example of image compressing using the `cwebp`, `avifenc`, `jpegoptim`, `optipng` and `svgo` libraries.

```bash
#!/bin/bash

# Shell script to convert images in the public folder
# to AVIF's WebP's and optimise JPG's and PNGs.
# Author - Ainsley Clark

# Set Variables
PUBLIC_PATH="./public" # Set your public path here.
WEBP_QUALITY=80
JPG_QUALITY=80
PNG_OPTIMIZATION_LEVEL=2

echo '--------------------------------------------'
echo 'Converting to WebP'
echo '--------------------------------------------'
if hash cwebp 2>/dev/null; then
	find ${PUBLIC_PATH} -type f \( -name "*.png" -or -name "*.jpg" -or -name "*.jpeg" \) | xargs -P 8 -I {} sh -c 'cwebp -q '$WEBP_QUALITY' $1 -o "${1%.*}.webp"' _ {} \;
else
	echo "Install cwebp to convert to images to .webp"
fi

echo '--------------------------------------------'
echo 'Converting to AVIF'
echo '--------------------------------------------'
if hash avifenc 2>/dev/null; then
	find ${PUBLIC_PATH} -type f \( -name "*.png" -or -name "*.jpg" -or -name "*.jpeg" \) | xargs -P 8 -I {} sh -c 'avifenc --min 0 --max 63 --speed 6 -a end-usage=q -a cq-level=18 -a tune=ssim $1 "${1%.*}.avif"' _ {} \;
else
	echo "Install avifenc to convert to images to .avif"
fi

echo '--------------------------------------------'
echo 'Compressing JPG images'
echo '--------------------------------------------'
if hash jpegoptim 2>/dev/null; then
	find ${PUBLIC_PATH} -type f \( -name "*.jpg" -or -name "*.jpeg" \) | xargs -P 8 -I {} sh -c 'jpegoptim --strip-all --overwrite --max='$JPG_QUALITY' $1' _ {} \;
else
	echo "Install jpegoptim to optimize JPEG images"
fi

echo '--------------------------------------------'
echo 'Compressing PNG images'
echo '--------------------------------------------'
if hash optipng 2>/dev/null; then
	find ${PUBLIC_PATH} -type f \( -name "*.png" \) | xargs -P 8 -I {} sh -c 'optipng -clobber -strip all -o '$PNG_OPTIMIZATION_LEVEL' $1' _ {} \;
else
	echo "Install optipng to optimize PNG images"
fi

echo '--------------------------------------------'
echo 'Optimising SVG images'
echo '--------------------------------------------'
if hash svgo 2>/dev/null; then
	svgo -f ${PUBLIC_PATH}
else
	echo "Install svgo to optimize SVG images"
fi
```

## Wrapping up

It's clear that with just a little extra time and effort as a developer you can help increase the PSI and your chances
of ranking highly. A lot of responsibility falls on a developer to ensure a website is SEO friendly, but using just some
of the tips and tricks above will ensure that you or your client's website won't be left behind in the SERPs.
