#!/bin/bash
#
# Fetches the attendee sites for the showcase from the workshop repository
# into sites/showcase/static, where Hugo serves them byte-for-byte. The tree
# is far too large to commit here, so Vercel runs this before every showcase
# build and developers run it once locally with make showcase-fetch.
#
# On Vercel set SHOWCASE_REPO_TOKEN to a fine-grained personal access token
# with read-only Contents access to the workshop repository; without it the
# script clones over SSH, which is what you want locally.

set -euo pipefail

# Set Variables
REPO="${SHOWCASE_REPO:-ainsleyclark/workshop-sqlc-templ}"
REF="${SHOWCASE_REPO_REF:-main}"
DEST="sites/showcase/static"
TMP="$(mktemp -d)"

cd "$(dirname "$0")/.."
trap 'rm -rf "${TMP}"' EXIT

if [ -n "${SHOWCASE_REPO_TOKEN:-}" ]; then
	URL="https://x-access-token:${SHOWCASE_REPO_TOKEN}@github.com/${REPO}.git"
else
	URL="git@github.com:${REPO}.git"
fi

# Sparse, blobless clone so only showcase/ is downloaded
echo '--------------------------------------------'
echo "Fetching showcase/ from ${REPO}@${REF}"
echo '--------------------------------------------'
export GIT_TERMINAL_PROMPT=0
git clone --quiet --depth 1 --branch "${REF}" --filter=blob:none --sparse "${URL}" "${TMP}"
git -C "${TMP}" sparse-checkout set --quiet showcase 2>/dev/null || git -C "${TMP}" sparse-checkout set showcase

# One folder per workshop; the generated listing page is replaced by the
# redirect in vercel.json.
mkdir -p "${DEST}"
count=0
for dir in "${TMP}"/showcase/workshop-*/; do
	[ -d "${dir}" ] || continue
	name="$(basename "${dir}")"
	rm -rf "${DEST:?}/${name}"
	cp -R "${dir}" "${DEST}/${name}"
	rm -f "${DEST}/${name}/index.html"
	count=$((count + 1))
	echo "  ${name}: $(find "${DEST}/${name}" -type f | wc -l | tr -d ' ') files"
done

if [ "${count}" -eq 0 ]; then
	echo "No workshop-*/ folders found under showcase/ in ${REPO}@${REF}"
	exit 1
fi
echo "Fetched ${count} workshop(s) into ${DEST}"
