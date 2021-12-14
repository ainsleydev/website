# Responsibilities as a developer for optimised SEO.

Go to one of your websites you have developed and turn JavaScript off, does the page still function as it should?
Is all the content rendered? Do images a layouts appear correctly on the page? If the answer is no, it may be
time to consider refactoring your code base to allow for a more SEO friendly website. As developers, it may be
easier to use a particular framework or library or even add functionality via JavaScript, but consider the technical
debt before you do. Here are some tricks and  tips in order to boost your page rankings from a technical view point.

## How does Google Crawl

When Google crawls a new website, it sends a normal HTTP GET request to the site and get's back a barebones
version then loads and

- HTTP get request for the site, and get back the HTML loads and runs the javascript.
- Goes into rendering, looks into differences between rendered version of content and HTML version of content
- If there is a difference, they will keep rendering switched on for the long term.
- If they don't see a difference, they will switch off the rendering.
- Google is comparing between the two versions.
- Might take a month to see ranking changes.
  https://www.onely.com/blog/googles-two-waves-of-indexing/

## Client Side Rendering (CSR)

The next question I

Using javascript to render content in the browser.

Rendering is the process of populating templates with data from API's or databases, it can happen on server or client side.

When it happens on server side it ....

Indexing has two possible ways of happening either:
- First wave, right away, indexed as fast as possible.
- Second wave, wait for rendering.

Progressively enhance website, add behavior or additional features such as animation.

Using javascript to load or RESIZE content

Example for navigation, only need one nav.

Want to make sure google see's all the content on the page.

## Frameworks

Full JavaScript websites built on libraries like React and Angular may be completely blank until they’re rendered, depending on how they’re coded.
https://www.botify.com/blog/client-side-server-side-rendering-seo


https://developers.google.com/search/docs/advanced/javascript/javascript-seo-basics

## Linking

Do not rely on div or span or use javascript handlers, crawlers will have problems following the link as well as using an assitive technologies.
Links a very important and boost rankings.
Sitemap helps but doesn't replace coherent internal linking.

Internal links can help Google discover more articles within a site, so the anchor text should provide context to what the linked page is about.
Nothing wrong using long anchor text.
https://www.searchenginejournal.com/top-seo-insights-google-john-mueller/278829/

42. Nofollow Links In Guest Posts
    If you’re submitting a guest post to another site with a link back to your site, that link has to have a nofollow tag on it.

The same goes for guest posts published on your site with a link back to the author’s site.

Google sees guest posts as promotion for the author’s site, so any links within the content are not considered natural links.

Therefore, a nofollow tag must be present to prevent Google from thinking you’re involved in some kind of link scheme.


## Semantics

Best HTML
Use headings, sections, paragraphs.
Using captions and alt text.


## Frameworks



## No JS fallbacks

Only use JavaScript when you have too! Ask yourself, can this be achieved using CSS only? If the answer is yes, do it! 
I get it, JS is a lot easier to implement, and saves a lot of time, but it should be used to enhance the users journey, 
not detract from it. Progressive enhancement should be considered at the very beginning of a site build when you're 
fleshing out your markup. I have seen and witnessed a tonne of developers using JavaScript at **every opportunity**, and 
sometimes it's really not necessary. 

### The power of `<noscript>`

The `<noscript>` tag has magical powers, it only renders the markup inside the element when users have disabled scripts
in their browsers. It can be used in both `<head>` and `<body>`.  When used inside `<head>`, the `<noscript>` element 
can only contain `<link>`, `<style>`, and `<meta>` elements. 

A common example would be:

```html
<noscript>
    <h1>Sorry, you need to enable JavaScript to use this page.</h1>
</noscript>
```

### Styling

Applying no JS styles can be a bit of pain. A neat trick is to have a `scss` file with all of your no JavaScript styling
and compile it as a separate CSS file, let's call it `no-js.css`. In the header of you can encapsulate this CSS file 
in a `<noscript>` element, to only display when the client has no JS.

```html
<head>
   <noscript>
       <link rel="stylesheet" href="/css/no-js.css">
   </noscript>
</head>
```

This makes things a lot simpler, we can define some CSS for our page instead of adding a `no-js` class to the body. This
will avoid any layout shifts and styling glitches. It also helps our code bases a lot more maintainable.

### Checkbox Hack

Let's take an accordion for an example. The user clicks on a tab or header and content is expanded usually using 
`min-height`. 




## Imagery

A lot of recommendations in Google's [Page Speed Insights](https://pagespeed.web.dev/) stems from improperly sized and
large images. It's important to use the embrace the tools around you as a developer to optimise imagery so the user 
still receives rich and detailed images, but is still a quick and efficient on initial page load.

### Lazy loading

Images should be [lazy loaded](https://www.imperva.com/learn/performance/lazy-loading/), meaning the image
should only be loaded once the user has scrolled to that part of the page. This ensures that assets below the fold
are only loaded when needed, thus saving system resources and increases initial load time as the bandwidth has
reduced.

```html
<figure>
	<img class="lazy" data-src="/images/cat.jpg" />
</figure>
```

Most [lazy loading libraries](https://github.com/verlok/vanilla-lazyload) use the `data-src` attribute and when
The user has scrolled passed a particular point on the windowsY offset, it replaces `data-src` with `src` which
therefore loads the asset on the clients computer.

However, this is all achieved by JavaScript, how can we add a fallback for clients with no javascript?

```html
<figure>
	<img class="lazy" data-src="/images/cat.jpg" alt="Cat" />
	<noscript>
		<img src="/images/cat.jpg" alt="Cat" />
	</noscript>
</figure>
```

Here we are saying **when JavaScript is not enabled, render this image** with the `src` attribute instead of `data-src`. 
We would need to add some styling to the `<img>` that is lazy loaded to ensure that it isn't displayed on no JS clients. 
This can be as simple as adding `display: none` to all images with a class of `lazy`.

### Sizes

You've just downloaded a crystal clear image from [Unsplash](https://unsplash.com/) for your new hero, it's 1920 by 1080 
pixels which is perfect for HD resolutions, but what about mobile and tablet? **We don't need to serve a huge image to 
client's with smaller viewports**.

Step in `<picture>` with `<source>`.

```html
<picture>
	<source media="(max-width: 767px)" srcset="/images/cat-mobile.jpg" />
	<source media="(max-width: 1024px)" srcset="/images/cat-tablet.jpg" />
	<img src="/images/cat.jpg"  alt="Cat" />
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
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.jpg" />
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.jpg" />
	<img class="lazy" data-src="/images/cat.jpg" alt="Cat" />
	<noscript>
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.jpg" />
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.jpg" />
		<img src="/images/cat.jpg" alt="Cat" />
	</noscript>
</picture>
```

### Optimisation

We don't have to stop there, we can take advantage of the (relatively) new image format's
[WebP](https://developers.google.com/speed/webp) and [AVIF](https://aomedia.org/av1-features/). Both of which provide a 
far more superior compression level to the original JPG and PNG codecs. AVIF has even said to 
[have an edge](https://www.coywolf.news/webmaster/avif-versus-webp-image-format/) on WebP with smaller files and deeper 
colours. 

By using the `<picture>` element, the browser obtains the first image that matches its abilities. Chrome for example
supports the `.avif` and `.webp` file extensions. We can tell this by using Google's inspector and inspecting the
headers.

```go
accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
```

Below is an example of loading AVIF and WebP images in a `<picture>` element. It may look drastic and long-winded, but
it's key for delivering high quality, compressed images to your users. Here we are specifying AVIF and WebP lazy loaded
images for multiple screen resolutions with a no JS fallback.
Instead of writing this out everytime you need an image, you can simply make a reusable ==partial== to render the 
markup that takes in the image path, sizes and any additional attributes.

```html
<picture>
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.avif" />
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.webp" />
	<source media="(max-width: 767px)" data-srcset="/images/cat-mobile.jpg" />
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.avif" />
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.webp" />
	<source media="(max-width: 1024px)" data-srcset="/images/cat-tablet.jpg" />
	<img class="lazy" data-src="/images/cat.avif" alt="Cat" />
	<img class="lazy" data-src="/images/cat.webp" alt="Cat" />
	<img class="lazy" data-src="/images/cat.jpg" alt="Cat" />
	<noscript>
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.avif" />
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.webp" />
		<source media="(max-width: 767px)" srcset="/images/cat-mobile.jpg" />
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.avif" />
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.webp" />
		<source media="(max-width: 1024px)" srcset="/images/cat-tablet.jpg" />
		<img src="/images/cat.avif" alt="Cat" />
		<img src="/images/cat.webp" alt="Cat" />
		<img src="/images/cat.jpg" alt="Cat" />
	</noscript>
</picture>
```

You can install the [cwebp](https://developers.google.com/speed/webp/download) and 
[libavif](https://github.com/AOMediaCodec/libavif) libraries on any server, and they can be configured for automatic
conversion on an image upload for example. [Squidge](https://github.com/ainsleyclark/squidge) is a free WordPress plugin
that offers this functionality, that's completely free.

For a more humble approach, I usually compress all images in a `public` folder when running production scripts using
npm. Below is an example of image compressing using the `cwebp`, `jpegoptim`, `optipng` and `svgo` libraries.

```bash
#!/bin/bash

# Shell script to convert images in the public folder
# to WebP and optimise JPG's and PNGs.
# Author - Ainsley Clark

# Set Variables
PUBLIC_PATH="./public/images" # Set your public path here.
WEBP_QUALITY=80
JPG_QUALITY=80
PNG_OPTIMIZATION_LEVEL=2

# Convert to WebP.
echo '--------------------------------------------'
echo 'Processing files and converting to webp'
echo '--------------------------------------------'
find ${PUBLIC_PATH} -type f \( -name "*.png" -or -name "*.jpg" -or -name "*.jpeg"  \) | xargs -P ${WEBP_QUALITY} -I {} sh -c 'cwebp -q 80 $1 -o "${1%}.webp"' _ {} \;

# Compress JPGSs.
echo '--------------------------------------------'
echo 'Compressing JPG images'
echo '--------------------------------------------'
if hash jpegoptim 2>/dev/null; then
	for image in $(find ${PUBLIC_PATH} -type f \( -name "*.jpg" -or -name "*.jpeg"  \)); do
		# Remove all metadata and try to optimize jpeg image to match the maximum size.
		jpegoptim --strip-all --overwrite --max=$JPG_QUALITY $image
	done;
else
	echo "Install jpegoptim to optimize JPEG images"
fi

# Compress PNGs.
echo '--------------------------------------------'
echo 'Compressing PNG images'
echo '--------------------------------------------'
if hash optipng 2>/dev/null; then
	for image in $(find ${PUBLIC_PATH} -type f \( -name "*.png" \)); do
		# Optimize PNG with a give level (higher = slower) and remove all metadata.
		optipng -clobber -strip all -o $PNG_OPTIMIZATION_LEVEL $image
	done;
else
	echo "Install optipng to optimize PNG images"
fi

# Optimise SVGs
echo '--------------------------------------------'
echo 'Optimising SVG images'
echo '--------------------------------------------'
if hash svgo 2>/dev/null; then
	svgo -f ${PUBLIC_PATH}
else
	echo "Install svgo to optimize PNG images"
fi
```

## Wrapping up
