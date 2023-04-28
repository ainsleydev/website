#!/bin/bash
#
# Runs the build script for Vercel.
# The commit ref is compared and built for
# the different environments.
#
# ainsley.dev - 16/09/2021

echo "Vercel Env: $VERCEL_ENV"
echo "Vercel Commit Ref: $VERCEL_GIT_COMMIT_REF"

if [[ $VERCEL_ENV == "production" ]]; then
	echo "Building production"
	npm run build:prod
else
	echo "Building staging"
	npm run build:staging
fi
