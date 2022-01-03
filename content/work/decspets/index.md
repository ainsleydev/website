---
title: "Launching Dec’s Pets into the E-Commerce market"
date: 2022-01-02T10:48:28+01:00
draft: false
---

## Client
Dec's Pets is an online e-commerce marketplace which started operating in 2018. They are a family run business
specialising in pet retail, catering for all manners of pet care. They provide a large variety of services to their
main clientele, based in Ireland, but wanted to reach a wider audience.

### Link
https://decspets.com

### Strategy

- Full brand
- UI/UX
- SEO

### Technologies

- WordPress
- WooCommerce
- Custom Plugins (PHP)

## Brief
Dec's Pets existing website was created using Flatsome, an off the shelf WordPress theme that was very limited in terms
of UI & UX and lacked design language or consistent branding. The brief was to modernise the website whilst still
maintaining a fun and family friendly design, so as to be convenient for those who wish to buy pet products with ease.
A large number of WordPress plugins were being used on the original site, which was detrimental to PSI. A key goal was
to consolidate these plugins to make an all-in-one solution for their marketing needs.

The existing checkout process for Dec's Pets was fairly streamline, using Stripe, PayPal and one-click checkout. Our aim
was to ensure that this functionality was still there, but with a more stylised approach, making it easy for the
customer to navigate. More visibility was needed for the company's brand and presence in the E-commerce market, enabling
them to have a wider variety of customers generating a diverse market and appealing to a larger audience.

## Design
A design strategy was formulated to reinforce the brand that Dec's Pets were trying to achieve. A light blue and
striking pink colour scheme was created to invoke trust, but still reflect the playfulness of the pet marketplace. A
friendly heading type was used to make the design more interactive, with the body in sans-serif font to create
clean, crisp and readable content. Different emojis were added to give the site a fun feel and the Dec's
Pets "Paw" illustration was created as a watermark on certain pages to create a consistent brand language.

## Development
Using WooCommerce with WordPress, fully custom page templates were created for the new website. Minimal front-end
libraries were used in order to increase page load time. Back-end services were rewritten in PHP, removing the use of any
heavy plugins such as MailChimp and Stamped.IO. Custom curl requests were used in order to interact with various APIs.
This cut down on bloat of the website, whilst still maintaining crucial marketing functionality.

It was clear that the original site imagery was not being optimised or compressed, thus increasing LCP (largest
contentful paint) times, and whilst many image optimisation plugins exist in the WordPress plugins library, none took
advantage of the new image format `avif`. So a new plugin was created, [Squidge](https://wordpress.org/plugins/squidge/),
which takes advantage of the `jpegoptim`, `optipng`, `cwebp`, and `libavif` libraries. In conjunction with lazy loading
images, it made for an extremely quick platform.

## Results
- 60% growth in overall traffic.
- 40 point increase in PSI.
- X increase in ROI.

## Testimonial
