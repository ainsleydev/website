#!/bin/bash
#
# Runs the build script for Vercel.
# SITE env var determines which Hugo site to build (default: ainsley-dev).

SITE=${SITE:-ainsley-dev}

echo "Vercel Env: $VERCEL_ENV"
echo "Building site: $SITE"

# The showcase serves attendee sites fetched from the workshop repository.
if [[ $SITE == "showcase" ]]; then
	./bin/showcase-fetch.sh
fi

if [[ $VERCEL_ENV == "production" ]]; then
	echo "Building production"
	pnpm run build:prod:$SITE
else
	echo "Building staging"
	pnpm run build:staging:$SITE
fi

# Copy the built site to the root public directory for Vercel
echo "Copying output to root public directory"
rm -rf public
cp -r sites/$SITE/public public

# Optimize images in production builds. Skipped for the showcase site, whose
# static files are attendee sites that must be served byte-for-byte.
if [[ $VERCEL_ENV == "production" && $SITE != "showcase" ]]; then
	echo "Optimizing images"
	pnpm image
fi
