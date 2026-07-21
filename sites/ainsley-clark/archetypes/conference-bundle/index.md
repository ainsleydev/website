---
title: {{ replace .Name "-" " " | title }}
description: A description of the talk between 120 and 160 characters for search engines and social cards.
heading: {{ replace .Name "-" " " | title }}
lead: A short description of the talk that appears on the card and page.
weight: 1
pageColour: white
draft: true # Flip to false ~a day before the talk to publish.
tags:
  - Go
buttonName: View Talk
event:
  name: Conference Name
  date: {{ dateFormat "2006-01-02" .Date }}
  location: Venue, City
  url: https://example.com/
# video: https://www.youtube.com/watch?v=xxxx
slides:
  path: files/slides.pdf
  name: {{ .Name }}-ainsley-clark.pdf
  text: Download slides
sources:
  - title: 1. Source Title
    url: https://example.com/
    description: A short description of the source.
---
