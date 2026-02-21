---
title: Thinkopedia - Mental Health Website Case Study
heading: Introducing Thinkopedia to the world of blogging
description: Discover how ainsley.dev introduced Thinkopedia into the world of blogging by creating a minimalist, interactive, easy-to-use blogging platform.
slug: thinkopedia
draft: false
weight: 4
company: Thinkopedia
year: 2019
site:
  link: https://thinkopedia.ainsleyclark.xyz
  pretty: thinkopedia.co.uk
role: Design & Development
strategies: [Full brand, Blog, Multi-page site]
technologies: [Laravel, barba.js, Locomotive scroll, Custom Medium API]
quote:
  person: Cody Dumbarton, CEO
  text: This was my first experience creating a website, and ainsley.dev really helped me every step of the way. The level of detail they delivered on was incredible. The end result was 10 times better than I could have ever imagined. Highly recommend, will be in contact again! Thank you!
results:
  - number: 1000s
    text: of impressions
  - number: 24%
    text: bounce rate
logoWeight: 20
---

<!-- Intro -->
{{< vertical-section large=true >}}
Thinkopedia is a non-profit mental health support platform, promoting methods for self-help and guidance for those
struggling to cope, and a way of sharing experiences through an online community platform, empowering people as they
rewrite their story.
{{< /vertical-section >}}

<!-- Reel -->
{{< video src="video/reel.mp4" attr="muted loop" lazy=true >}}

<!-- Brief -->
{{< vertical-section text="Brief" number="01" >}}
Thinkopedia wanted a minimalist, interactive, easy-to-use blogging platform. The main takeaway from the brief was the
desire to stand out from their competitors with a completely unique and captivating design. A striking contact form was
also needed, to enable people to get in touch easily.
{{< /vertical-section >}}

<!-- Video -->
{{< picture src="images/cody.jpg" alt="Cody Dumbarton, CEO of Thinkopedia" lazy=true animate=true >}}

<!-- Design -->
{{< vertical-section text="Design" number="02" >}}
A minimalist design was sculpted from the initial brief, and an interesting layout was formulated from sketches. Whilst
the website still followed a conventional grid structure, imagery and type were slightly off-centre to keep the user
interested whilst reading the insightful blog posts. A bold sans-serif font was used and some headings were rotated to
capture the user’s attention, which later aided the animation process.
{{< /vertical-section >}}

<!-- Mockup -->
{{< picture src="images/mockup.jpg" alt="Thinkopedia Website on an iPad" lazy=true animate=true >}}

<!-- Development -->
{{< vertical-section text="Develop" number="03" >}}
Laravel was used as a back-end development framework to scrape blog posts from Medium and the content of the blog posts
was stored in a MySQL database. This meant all of the content was server side rendered, enabling Googlebot to scrape the
content easily. [barba.js](https://barba.js.org/) with GSAP was used to create smooth transitions between each page.
This gave the website an app-like quality, with small but effective UI transitions and micro animations.
{{< /vertical-section >}}
