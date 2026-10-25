---
title: {{ replace .Name "-" " " | title }} Workshop Showcase
description: A description of the showcase between 120 and 160 characters for search engines and social cards.
heading: {{ replace .Name "-" " " | title }}
breadcrumbs: {{ replace .Name "-" " " | title }}
pageHeading: What attendees built in City
cardLead: One sentence for the home page card.
lead: A short description of the event and what attendees built, shown at the top of the page.
type: showcase
publishdate: {{ dateFormat "2006-01-02" .Date }}
draft: true # Flip to false once the sites list below is complete.
tags:
  - Go
buttonName: View sites
event:
  name: Conference Name
  date: {{ dateFormat "2006-01-02" .Date }}
  location: City, Country
  url: https://example.com/
workshop:
  title: The Workshop Title
  url: https://ainsleyclark.com/conferences/{{ .Name }}-workshop/
# The static folder under / and the forked repository name on GitHub.
repo: workshop-{{ .Name }}
# Run make showcase-sync to populate images/, then list every attendee. name is
# curated from the site's <title>, colour is its theme colour and award is optional.
sites:
  - { user: github-login, name: Site Name, colour: "#0a0a0a" }
---
