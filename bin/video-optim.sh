#!/bin/bash
#
# Shell script to convert videos in the public folder
# to WebM, AV1 and optimise MP4

# Set Variables
PUBLIC_PATH="./content"
#PUBLIC_PATH="./static/video"
AUDIO=true
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
		if [ "$AUDIO" = true ]; then
			ffmpeg -i "$i" -acodec aac -y -vcodec h264 -crf ${CRF} -threads 4 "${i%.*}-compressed.mp4"
		else
			ffmpeg -i "$i" -an -y -vcodec h264 -crf ${CRF} -threads 4 "${i%.*}-compressed.mp4"
		fi
	fi;
done

# Convert to WebM
echo '--------------------------------------------'
echo 'Processing files and converting to WebM'
echo '--------------------------------------------'
for i in $(find ${PUBLIC_PATH} -type f -name "*.mp4" -o -name "*.mkv"); do
	if [[ ${i} != *"compressed"* ]] && [[ ! -e "${i%.*}.webm" ]]; then
		echo "Processing file: $i"
		if [ "$AUDIO" = true ]; then
			ffmpeg -i "$i" -c:v libvpx-vp9 -crf ${CRF} -b:v 1900K -c:a libopus -b:a 192k -preset veryslow -threads 4 "${i%.*}.webm"
		else
			ffmpeg -i "$i" -c:v libvpx-vp9 -crf ${CRF} -b:v 1900K -an -b:a 192k -preset veryslow -threads 4 "${i%.*}.webm"
		fi
	fi;
done



