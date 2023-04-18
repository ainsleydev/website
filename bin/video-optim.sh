#!/bin/bash
#
# Shell script to convert videos in the public folder
# to WebM, AV1 and optimise MP4
#
# ainsley.dev - 16/09/2021

# Set Variables
PUBLIC_PATH="./content"
#PUBLIC_PATH="./static/video"
CRF=30

# Adjust the crf value to change the quality and size of the video.
# The valid CRF value range is 0-63, with the default being 50.
# Lower values correspond to higher quality and greater file size.

# Compress MP4 & MKV
echo '--------------------------------------------'
echo 'Compressing MP4 & MKV Videos'
echo '--------------------------------------------'
for i in $(find ${PUBLIC_PATH} -type f -name "*.mp4" -o -name "*.mkv"); do
	if [[ ${i} != *"compressed"* ]] && [[ ! -e "${i%.*}-compressed.mp4" ]]; then
		echo "Processing file: $i"
		ffmpeg -i "$i" -acodec copy -y -vcodec h264 -crf ${CRF} -threads 4 "${i%.*}-compressed.mp4"
	fi;
done

# Convert to WebM
echo '--------------------------------------------'
echo 'Processing files and converting to WebM'
echo '--------------------------------------------'
for i in $(find ${PUBLIC_PATH} -type f -name "*.mp4" -o -name "*.mkv"); do
	if [[ ${i} != *"compressed"* ]] && [[ ! -e "${i%.*}.webm" ]]; then
		echo "Processing file: $i"
		ffmpeg -i "$i" -c:v libvpx-vp9 -crf ${CRF} -b:v 1900K -c:a libopus -b:a 320k -preset veryslow -threads 4 "${i%.*}.webm"
	fi;
done
