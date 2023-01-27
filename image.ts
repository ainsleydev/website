import {OutputInfo} from "sharp";

const sharp = require('sharp'),
	path = require('path'),
	fs = require('fs'),
	glob = require('glob');


const avifOptions = {
	quality: 80,
	lossless: false,
	speed: 8, // default is 5
	chromaSubsampling: '4:2:0',
}

/**
 * The pattern of files to match.
 */
const globPattern = 'png|jpg|jpeg';

/**
 * Strips the file from a filepath.
 * Given: /file/my-image.jpg
 * Returns: /file
 *
 * @param file
 */
const filePath = (file: string): string => {
	return file.replace(/\.[^/.]+$/, "")
};

/**
 *
 * @param output
 * @param file
 */
const handleFile = (output: Promise<OutputInfo>, file: string) => {
	output
		.then(() => console.log("✅ Image converted successfully: " + file))
		.catch(err => console.log("⚠️ Error processing file: " + file + err))
};

/**
 *
 *
 * @param file
 */
const convert = (file: string): void => {
	const newFile = filePath(file) + ".avif",
		to = sharp(file)
			.toFormat('avif')
			.avif(avifOptions)
			.toFile(newFile)
	handleFile(to, newFile)
};


/**
 * Traverses the directory tree looking for
 * the given file extensions and coverts
 * the images.
 */
const traverse = (): void => {
	glob(__dirname + `/public/**/*.@(${globPattern})`, {}, (err, files) => {
		files.forEach(file => convert(file));
	});
};

traverse();
