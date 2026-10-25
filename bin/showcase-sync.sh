#!/bin/bash
#
# Shell script to generate the thumbnails and mosaics a showcase page uses
# from a workshop's `showcase build` output, and to stage that output under
# sites/showcase/static (git-ignored) for local preview. Production fetches
# the same tree from the workshop repository with bin/showcase-fetch.sh.
#
# Usage:
#   ./bin/showcase-sync.sh <path-to-showcase/workshop-dir> <event-slug> [conference-bundle-slug]
#
# Example:
#   ./bin/showcase-sync.sh ~/workshop-sqlc-templ/showcase/workshop-gophercon-africa-2026 \
#     gophercon-africa-2026 gophercon-africa-2026-workshop
#
# Set FEATURED to a comma separated list of GitHub logins to place
# them first in the mosaics, e.g. FEATURED="ru0ya,MUKE-coder".

set -euo pipefail

USAGE="Usage: showcase-sync.sh <path-to-workshop-dir> <event-slug> [conference-bundle-slug]"

# Set Variables
SRC="${1:?${USAGE}}"
SLUG="${2:?${USAGE}}"
CONF="${3:-}"
SRC="${SRC%/}"
REPO="$(basename "${SRC}")"
STATIC="sites/showcase/static/${REPO}"
BUNDLE="sites/showcase/content/${SLUG}/images"
OG_STATIC="sites/showcase/static/opengraph.jpg"
CONF_IMAGES=""
QUALITY=80

cd "$(dirname "$0")/.."

# Check inputs
if [ ! -d "${SRC}" ]; then
	echo "Workshop directory not found: ${SRC}"
	exit 1
fi
if [ ! -d node_modules/sharp ]; then
	echo "Run pnpm install to get sharp before generating thumbnails"
	exit 1
fi
if [ -n "${CONF}" ]; then
	CONF_IMAGES="sites/ainsley-clark/content/conferences/${CONF}/images"
	mkdir -p "${CONF_IMAGES}"
fi

# Sync static files
echo '--------------------------------------------'
echo "Syncing ${SRC} -> ${STATIC}"
echo '--------------------------------------------'
mkdir -p "${STATIC}" "${BUNDLE}"
rsync -a --delete --exclude='.DS_Store' "${SRC}/" "${STATIC}/"
# The generated listing page is replaced by the redirect in vercel.json.
rm -f "${STATIC}/index.html"

# Thumbnails & mosaics
echo '--------------------------------------------'
echo 'Generating thumbnails and mosaics'
echo '--------------------------------------------'
node - "${STATIC}" "${BUNDLE}" "${QUALITY}" "${OG_STATIC}" "${CONF_IMAGES}" "${FEATURED:-}" <<'JS'
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const [src, bundle, q, ogStatic, confImages, featured] = process.argv.slice(2);
const quality = Number(q);
const background = '#0a0a0a';
const first = featured ? featured.split(',').map((s) => s.trim().toLowerCase()) : [];

const login = (hero) => path.basename(path.dirname(hero)).toLowerCase();
const heroes = fs
	.readdirSync(src, { withFileTypes: true })
	.filter((d) => d.isDirectory() && !d.name.startsWith('_'))
	.map((d) => path.join(src, d.name, 'screenshot-hero.jpg'))
	.filter((f) => fs.existsSync(f))
	.sort((a, b) => {
		const ia = first.indexOf(login(a)), ib = first.indexOf(login(b));
		if (ia !== ib) return (ia === -1 ? 1e9 : ia) - (ib === -1 ? 1e9 : ib);
		return login(a).localeCompare(login(b));
	});

const mosaic = async (out, width, height, cols, rows, tile, gap) => {
	const picks = heroes.slice(0, cols * rows);
	const top0 = Math.round((height - (rows * tile.h + (rows + 1) * gap)) / 2);
	const tiles = [];
	for (let i = 0; i < picks.length; i++) {
		tiles.push({
			input: await sharp(picks[i]).resize(tile.w, tile.h).toBuffer(),
			left: gap + (i % cols) * (tile.w + gap),
			top: top0 + gap + Math.floor(i / cols) * (tile.h + gap),
		});
	}
	await sharp({ create: { width, height, channels: 3, background } })
		.composite(tiles)
		.jpeg({ quality })
		.toFile(out);
};

(async () => {
	for (const hero of heroes) {
		await sharp(hero).resize(1280, 720).jpeg({ quality }).toFile(path.join(bundle, `${login(hero)}.jpg`));
	}
	await mosaic(path.join(bundle, 'featured.jpg'), 1440, 1130, 3, 4, { w: 464, h: 261 }, 12);
	await mosaic(path.join(bundle, 'og.jpg'), 1200, 630, 3, 2, { w: 384, h: 216 }, 12);
	fs.copyFileSync(path.join(bundle, 'og.jpg'), ogStatic);
	if (confImages) {
		fs.copyFileSync(path.join(bundle, 'featured.jpg'), path.join(confImages, 'featured.jpg'));
		fs.copyFileSync(path.join(bundle, 'og.jpg'), path.join(confImages, 'og.jpg'));
	}
	console.log(`Wrote ${heroes.length} thumbnails and 2 mosaics to ${bundle}`);
})().catch((err) => {
	console.error(err);
	process.exit(1);
});
JS

echo '--------------------------------------------'
echo "Done. Review the 'sites:' list in sites/showcase/content/${SLUG}/index.md"
echo "against the folders in ${STATIC} (new or removed logins)."
echo '--------------------------------------------'
