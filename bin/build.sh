#!/bin/bash
#
# Runs the build script for Vercel.
# The commit ref is compared and built for
# the different environments.
#
# ainsley.dev - 16/09/2021

if [[ $VERCEL_GIT_COMMIT_REF == "master" ]]; then
	echo "Building production"
	npm run build:prod
else
	echo "Building staging"
	npm run build:staging
fi
