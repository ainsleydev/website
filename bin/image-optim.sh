#!/bin/bash
#
# Shell script to convert images in the public folder
# to WebP and optimise JPG's and PNG's.

# Set Variables
PUBLIC_PATH="./sites/ainsley-dev/public"
QUALITY=80
COMPRESSION_LEVEL=8

# Check if Sharp exists
if ! hash sharp 2>/dev/null; then
	echo "Install sharp-cli to convert to images"
fi

# Convert to WebP
echo '--------------------------------------------'
echo 'Processing files and converting to WebP'
echo '--------------------------------------------'
sharp --input "${PUBLIC_PATH}"'/**/*.{jpg,jpeg,png}' --output '{dir}/{name}.webp' --quality=${QUALITY} --format=webp

# Convert to Avif
echo '--------------------------------------------'
echo 'Converting to Avif'
echo '--------------------------------------------'
sharp --input "${PUBLIC_PATH}"'/**/*.{jpg,jpeg,png}' --output '{dir}/{name}.avif' --quality=${QUALITY} --format=avif

# Compress JPGs
echo '--------------------------------------------'
echo 'Compressing JPG images'
echo '--------------------------------------------'
sharp --input "${PUBLIC_PATH}"'/**/*.jpg' --output '{dir}' --quality=${QUALITY} --compressionLevel=${COMPRESSION_LEVEL} --format=jpg resize 1920 --withoutEnlargement
sharp --input "${PUBLIC_PATH}"'/**/*.jpeg' --output '{dir}' --quality=${QUALITY} --compressionLevel=${COMPRESSION_LEVEL} --format=jpeg resize 1920 --withoutEnlargement

## Compress PNGs
echo '--------------------------------------------'
echo 'Compressing PNG images'
echo '--------------------------------------------'
sharp --input "${PUBLIC_PATH}"'/**/*.png' --output '{dir}' --quality=${QUALITY} --compressionLevel=${COMPRESSION_LEVEL} --format=png resize 1920 --withoutEnlargement

# Optimise SVGs
echo '--------------------------------------------'
echo 'Optimising SVG images'
echo '--------------------------------------------'
if hash svgo 2>/dev/null; then
	svgo --recursive --multipass --folder "${PUBLIC_PATH}"
else
	echo "Install svgo to optimize SVG images"
fi
