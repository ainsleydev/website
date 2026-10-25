# showcase.ainsleyclark.com

Showcase of the websites attendees build in Ainsley Clark's Go workshops. One page per event, each a
grid of cards linking to the attendee sites, which are served from this site as well.

- `content/<event-slug>/` - one leaf bundle per workshop (`make showcase NAME=<event-slug>`), with the
  attendee list in front matter and thumbnails under `images/`.
- `static/<workshop-repo>/` - the attendee sites exactly as produced by `showcase build` in the workshop
  repository. They are git-ignored here: Vercel fetches them with `bin/showcase-fetch.sh` before each build and
  locally you run `make showcase-fetch` (or `make showcase-sync` to preview an unpublished build).

Deployed by Vercel from this repository with `SITE=showcase` (see `bin/build.sh`).
