#!/bin/bash

# Shell script to install Hugo & the cwebp library.
# Ainsley Clark - 16/09/2021

# Install WebP
if hash cwebp 2>/dev/null; then
	echo "WebP Library installed, skipping."
else
	case "$OSTYPE" in
      darwin*)  brew install webp ;;
      linux*)   sudo apt-get install -y webp ;;
      *)  echo "Webp not supported on $OSTYPE, skipping" ;;
    esac
fi

# Install jpegoptim
if hash jpegoptim 2>/dev/null; then
	echo "jpegoptim Library installed, skipping."
else
	case "$OSTYPE" in
      darwin*)  brew install jpegoptim ;;
      linux*)   sudo apt-get install -y jpegoptim ;;
      *)  echo "jpegoptim not supported on $OSTYPE, skipping" ;;
    esac
fi

# Install optipng
if hash optipng 2>/dev/null; then
	echo "optipng Library installed, skipping."
else
	case "$OSTYPE" in
      darwin*)  brew install optipng ;;
      linux*)   sudo apt-get install -y optipng ;;
      *)  echo "optipng not supported on $OSTYPE, skipping" ;;
    esac
fi

# Done
echo "Finished setting up system dependencies."
