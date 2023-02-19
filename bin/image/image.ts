/**
 * image.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

const glob = require('glob'),
	fs = require('fs'),
	path = require('path'),
	sharp = require('sharp'),
	svgo = require('svgo');

import { AvifOptions, OutputInfo, WebpOptions } from 'sharp';

/**
 * CollapseOptions is the global configuration of
 * collapsible elements.
 */
export interface Options {
	// The filepath to traverse.
	filepath: string;
	// The quality of the images to be compressed.
	quality?: number;
	// Enables WebP conversion
	enableWebP?: boolean;
	// Enables AVIF conversion
	enableAvif?: boolean;
	// Enables SVG optimisation.
	enableSVG?: boolean;
}

/**
 * Image optimisation is a helper for optimisation and conversion of
 * JPG, PNG & SVG images using sharp and SVG.
 */
export class Imagery {
	/**
	 * The default options for the collapsable content,
	 * when properties are not defined.
	 *
	 * @readonly
	 */
	public readonly defaultOptions: Options = {
		filepath: '',
		quality: 80,
		enableWebP: true,
		enableAvif: true,
		enableSVG: true,
	};

	/**
	 * Options define the collapsible options.
	 */
	private readonly options: Options;

	/**
	 * The pattern of files to match.
	 */
	public globPattern = 'png|jpg|jpeg|svg';

	/**
	 * Creates a new image optimisation type with image
	 * options.
	 */
	constructor(options: Options) {
		this.options = this.defaultOptions;
		this.options = { ...this.defaultOptions, ...options };
	}

	/**
	 * Runs the conversion & optimisation.
	 *
	 * @returns void
	 *
	 */
	public run(): void {
		console.log('ℹ️ Running, options are: ' + JSON.stringify(this.options, null, 4) + '\n');
		this.traverse();
	}

	/**
	 * Traverses the directory tree looking for
	 * the given file extensions and coverts
	 * the images.
	 *
	 * @returns void
	 */
	private traverse(): void {
		glob(__dirname + `${this.options.filepath}**/*.@(${this.globPattern})`, {}, (err, files) => {
			files.forEach((file) => this.convertOptimise(file));
		});
	}

	/**
	 * Converts and optimises the images found
	 * in the glob pattern.
	 *
	 * @param file
	 * @async
	 */
	private convertOptimise = async (file: string) => {
		if (this.options.enableWebP) await this.webp(file);
		if (this.options.enableAvif) await this.avif(file);
	};

	/**
	 * Converts the file to an WebP format.
	 *
	 * @param file
	 * @async
	 * @private
	 */
	private async webp(file: string) {
		const newFile = this.getConvertedFile(file, 'webp');
		sharp(file)
			.toFormat('webp')
			.webp({
				quality: this.options.quality,
				lossless: false,
				chromaSubsampling: '4:2:0',
			} as WebpOptions)
			.toFile(newFile)
			.then(() => this.printSuccess(newFile))
			.catch((err) => this.printError(newFile, err));
	}

	/**
	 * Converts the file to an AVIF format.
	 *
	 * @param file
	 * @async
	 * @private
	 */
	private async avif(file: string) {
		const newFile = this.getConvertedFile(file, 'avif');
		sharp(file)
			.toFormat('avif')
			.avif({
				quality: this.options.quality,
				lossless: false,
				chromaSubsampling: '4:2:0',
			} as AvifOptions)
			.toFile(newFile)
			.then(() => this.printSuccess(newFile))
			.catch((err) => this.printError(newFile, err));
	}

	/**
	 * Strips the file from a filepath.
	 * Given: /file/my-image.jpg
	 * Returns: /file
	 *
	 * @param file
	 * @returns string
	 * @private
	 */
	private filePath(file: string): string {
		return file.replace(/\.[^/.]+$/, '');
	}

	/**
	 * Obtains the extension of a file.
	 *
	 * @param file
	 * @returns string
	 * @private
	 */
	private extension(file: string): string {
		return path.extname(file);
	}

	/**
	 * Obtains the file new file that is converted.
	 *
	 * @param file
	 * @param extension
	 * @returns string
	 * @private
	 */
	private getConvertedFile(file: string, extension: string): string {
		return this.filePath(file) + '.' + extension;
	}

	/**
	 * Prints an error in the case the image could not
	 * be converted or optimised.
	 *
	 * @param file
	 * @returns void
	 * @private
	 */
	private printSuccess(file: string): void {
		console.log(`✅ Image converted successfully: ${file}`);
	}

	/**
	 * Prints an error in the case the image could not
	 * be converted or optimised.
	 *
	 * @param file
	 * @param error
	 * @returns void
	 * @private
	 */
	private printError(file: string, error: any): void {
		console.log(`⚠️ Error processing File: ${file} - Error: ${error}`);
	}
}

/**
 * Instantiate and Run
 */
new Imagery({
	filepath: '/public/',
	quality: 90,
	enableAvif: true,
	enableWebP: true,
	enableSVG: false,
} as Options).run();
