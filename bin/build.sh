#!/bin/bash
#
# Runs the build script for Vercel.
# The commit ref is compared and built for
# the different environments.
#
# ainsley.dev - 16/09/2021

echo "Vercel Env: $VERCEL_ENV"
echo "Vercel Commit Ref: $VERCEL_GIT_COMMIT_REF"

# Don't build for other branches
if [[ "$VERCEL_GIT_COMMIT_REF" != "main" && "$VERCEL_GIT_COMMIT_REF" != "staging"  ]]; then
	echo "🛑 - Build cancelled"
	exit 0;
else
  	# Proceed with the build
	echo "✅ - Build can proceed"
	if [[ $VERCEL_ENV == "production" ]]; then
    	echo "Building production"
    	npm run build:prod
    else
    	echo "Building staging"
    	npm run build:staging
    fi
    exit 1;
fi;

