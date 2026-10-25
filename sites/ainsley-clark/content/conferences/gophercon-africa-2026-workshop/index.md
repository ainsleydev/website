---
title: Full-Stack Go Workshop at GopherCon Africa 2026
description: A full-day workshop at GopherCon Africa 2026 in Nairobi on building domain-driven, full-stack Go apps with sqlc and templ, and the sites attendees shipped.
heading: GopherCon Africa 2026 - Workshop
talkTitle: "Full-Stack Go: Domain-Driven Applications with sqlc and templ"
lead: A full-day, intermediate workshop building a complete Go application, from data ingestion through a type-safe sqlc data layer to a server-rendered templ UI, finishing with a theming block where every attendee shipped their own site.
weight: 1
publishdate: 2026-10-25
pageColour: white
draft: false
tags:
  - Go
  - Workshop
  - sqlc
  - templ
buttonName: View Workshop
event:
  name: GopherCon Africa
  date: 2026-10-15
  location: Nairobi, Kenya
  url: https://gophercon.africa/
links:
  - text: View attendee sites
    url: https://showcase.ainsleyclark.com/gophercon-africa-2026/
    title: See every website built in the workshop
    colour: black
sources:
  - title: 1. sqlc
    url: https://sqlc.dev/
    description: Compile SQL into type-safe Go. The data layer of the workshop app.
  - title: 2. templ
    url: https://templ.guide/
    description: An HTML templating language for Go with compile-time checks. The front-end of the workshop app.
  - title: 3. GBIF occurrence API
    url: https://www.gbif.org/developer/occurrence
    description: The public biodiversity records the sightings app ingests.
  - title: 4. Open-Meteo
    url: https://open-meteo.com/
    description: Free weather API used to enrich each sighting.
  - title: 5. Domain-Driven Design
    url: https://www.domainlanguage.com/ddd/
    description: Eric Evans. The reference behind the architecture block.
  - title: 6. net/http/pprof
    url: https://pkg.go.dev/net/http/pprof
    description: Profiling the web handler under load in the profiling block.
  - title: 7. Claude Code
    url: https://claude.com/claude-code
    description: Used with the /design-site skill in the theming block.
  - title: 8. GopherCon Africa
    url: https://gophercon.africa/
    description: The conference, Nairobi, October 2026.
---

Build a complete full-stack application in Go, from data ingestion through persistence to a server-rendered UI, purely in Go. This full-day workshop teaches you how to design maintainable full-stack applications that age well.

We started from a working application built on a real public API: an animal-sightings site fed by GBIF records, stored in SQLite and enriched with Open-Meteo weather. From there we walked through five different architectures for the same feature (flat, layered, onion, hexagonal and feature-based) to see what domain-driven design actually buys you, then looked at how the app is built: a type-safe data layer with sqlc and a front-end written with templ. The build is a guided walkthrough of real, finished code, so the time goes on the decisions rather than the typing.

## What attendees built

The hands-on part came last. Every attendee forked the workshop repository, profiled it under load with pprof and themed their own copy of the site using the `/design-site` skill in Claude Code or JetBrains Air, with two competitions running alongside: Best Website and Best Social Post. Thirty-three themed sites made it into the [showcase](https://showcase.ainsleyclark.com/gophercon-africa-2026/), each served exactly as its author shipped it.
