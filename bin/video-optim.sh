#!/bin/bash
#
# Shell script to convert videos in the public folder
# to WebM, AV1 and optimise MP4
#
# ainsley.dev - 16/09/2021

# Set Variables
PUBLIC_PATH="./public"

# Convert to WebM
echo '--------------------------------------------'
echo 'Processing files and converting to WebM'
echo '--------------------------------------------'
for i in `find ./public -type f -name "*.mp4"`; do
	echo "Processing file: $i"
	ffmpeg -i "$i" -an -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus "${i%.*}.webm";
done

# Compress MP4
echo '--------------------------------------------'
echo 'Compressing MP4 Videos'
echo '--------------------------------------------'
for i in `find ./public -type f -name "*.mp4"`; do
	echo "Processing file: $i"
	ffmpeg -i "$i" -y -c:v libx265 -vtag hvc1 -c:a "$i"
done
