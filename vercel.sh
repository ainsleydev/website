#!/bin/bash
#
# TODO:
#
# ainsley.dev - 16/09/2021

if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then
  echo "Building production"
  npm run build:main
else
  echo "Building staging"
  npm run build:staging
fi
