/**
 * fit-text.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

/**
 * FitTextOptions is the configuration of a singular
 * text element.
 */
interface FitTextOptions {
	compressor: number;
	minFontSize: number;
	maxFontSize: number;
}

/**
 * FitText makes font-sizes flexible. Use this script on your fluid
 * or responsive layout to achieve scalable headlines that
 * fill the width with a parent element.
 *
 * @see https://github.com/adactio/FitText.js
 */
export class FitText {
	/**
	 * The DOM selector for the elements.
	 *
	 * @readonly
	 */
	public readonly selector = '.fit-text';

	/**
	 * The default configuration for fitting elements,
	 * when some or all properties are not defined.
	 *
	 * @readonly
	 */
	public readonly defaultOptions: FitTextOptions = {
		compressor: 1,
		minFontSize: -1 / 0,
		maxFontSize: 1 / 0,
	};

	/**
	 * Initialises the elements marked as FitText.
	 *
	 * @constructor
	 */
	constructor() {
		document.querySelectorAll<HTMLElement>(this.selector).forEach((el) => {
			this.change(el, this.getOptions(el));
		});
	}

	/**
	 * Change resizes the HTMLElement to be 100% of the
	 * parent container.
	 *
	 * @param el
	 * @param options
	 * @private
	 */
	private change(el: HTMLElement, options: FitTextOptions): void {
		const resizer = () => {
			const fontSize =
				Math.max(
					Math.min(el.clientWidth / (options.compressor * 10), options.maxFontSize),
					options.minFontSize,
				) + 'px';
			el.style.fontSize = fontSize;
		};

		// Call once to set.
		resizer();

		// Bind events
		window.addEventListener('resize', resizer, false);
		window.addEventListener('orientationchange', resizer, false);
	}

	/**
	 * Obtains the fit text options by merging data
	 * attributes with the default config.
	 *
	 * @private
	 * @param el
	 */
	private getOptions(el: HTMLElement): FitTextOptions {
		return {
			compressor: this.getAttribute(el, 'data-fit-text-compressor') ?? this.defaultOptions.compressor,
			minFontSize: this.getAttribute(el, 'data-fit-text-min-font-size') ?? this.defaultOptions.minFontSize,
			maxFontSize: this.getAttribute(el, 'data-fit-text-max-font-size') ?? this.defaultOptions.maxFontSize,
		} as FitTextOptions;
	}

	/**
	 * Obtains an HTML attribute as a number, or null if it's
	 * not defined.
	 *
	 * @param el
	 * @param attr
	 * @private
	 */
	private getAttribute(el: HTMLElement, attr: string): number | null {
		const contents = el.getAttribute(attr);
		if (!contents) {
			return null;
		}
		const num = Number(contents);
		if (isNaN(num)) {
			Log.error('Fit Text - Attribute is NaN: ' + attr);
			return null;
		}
		return num;
	}
}
