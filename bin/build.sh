#!/bin/bash
#
# Runs the build script for Vercel.
# SITE env var determines which Hugo site to build (default: ainsley-dev).

SITE=${SITE:-ainsley-dev}

echo "Vercel Env: $VERCEL_ENV"
echo "Building site: $SITE"

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
