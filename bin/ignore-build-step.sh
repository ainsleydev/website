#!/bin/bash
#
# Determines if the Vercel build should run

echo "Vercel Env: $VERCEL_ENV"
echo "Vercel Commit Ref: $VERCEL_GIT_COMMIT_REF"

# Don't build for other branches
if [[ "$VERCEL_GIT_COMMIT_REF" != "main" && "$VERCEL_GIT_COMMIT_REF" != "staging"  ]]; then
	echo "🛑 - Build cancelled"
	exit 0;
else
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;
fi;

