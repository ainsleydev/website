#!/bin/bash
#
# Shell script to convert videos in the public folder
# to WebM, AV1 and optimise MP4
#
# ainsley.dev - 16/09/2021

# Set Variables
PUBLIC_PATH="./public"
CRF=30

# Adjust the crf value to change the quality and size of the video.
# The valid CRF value range is 0-63, with the default being 50.
# Lower values correspond to higher quality and greater file size.

# Convert to WebM
echo '--------------------------------------------'
echo 'Processing files and converting to WebM'
echo '--------------------------------------------'
for i in $(find ${PUBLIC_PATH} -type f -name "*.mp4" -o -name "*.mkv"); do
	echo "Processing file: $i"
	ffmpeg -i "$i" -acodec copy -c:v libvpx-vp9 -crf ${CRF} -b:v 0 -b:a 128k -c:a libopus "${i%.*}.webm"
done

# Convert to AV1
echo '--------------------------------------------'
echo 'Processing files and converting to AV1'
echo '--------------------------------------------'
for i in $(find ${PUBLIC_PATH} -type f -name "*.webm"); do
	echo "Processing file: $i"
	ffmpeg -i "$i" -acodec copy -c:v -crf ${CRF} libaom-av1 "${i%.*}.av1.webm"
done

# Compress MP4 & MKV
echo '--------------------------------------------'
echo 'Compressing MP4 & MKV Videos'
echo '--------------------------------------------'
for i in $(find ${PUBLIC_PATH} -type f -name "*.mp4" -o -name "*.mkv"); do
	# Ignore any files that contain AV1.
	if [[ ${i} != *"av1"* ]]; then
		echo "Processing file: $i"
		ffmpeg -i "$i" -acodec copy -y -vcodec libx265 -crf ${CRF} "${i%.*}.compressed.mp4"
		# Remove the original and move the temp file.
		rm "$i"
		mv "${i%.*}.compressed.mp4" "$i"
	fi
done
