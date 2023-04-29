#!/bin/bash
#
# Runs the build script for Vercel.
# The commit ref is compared and built for
# the different environments.

echo "Vercel Env: $VERCEL_ENV"
if [[ $VERCEL_ENV == "production" ]]; then
	echo "Building production"
	npm run build:prod
else
	echo "Building staging"
	npm run build:staging
fi
