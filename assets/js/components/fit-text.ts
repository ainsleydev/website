/**
 * fit-text.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Log} from "../util/log";

/**
 * FitTextOptions is the configuration of a singular
 * text element.
 */
interface FitTextOptions {
	compressor: number
	minFontSize: number
	maxFontSize: number
}

/**
 * FitText makes font-sizes flexible. Use this script on your fluid
 * or responsive layout to achieve scalable headlines that
 * fill the width with a parent element.
 *
 *  @see https://github.com/adactio/FitText.js
 */
export class FitText {

	/**
	 * Initialises the elements marked as FitText.
	 *
	 * @constructor
	 */
	public load() {
		document.querySelectorAll(".fit-text").forEach(el => {

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
	private change(el: HTMLElement, options: FitTextOptions) {
		const settings = this.extend({
			'minFontSize' : -1/0,
			'maxFontSize' : 1/0
		}, options);

		let comp = options.compressor || 1;

		const resizer = () => {
			el.style.fontSize = Math.max(Math.min(el.clientWidth / (comp*10), options.maxFontSize), options.minFontSize).toString() + 'px';
		};

		// Call once to set.
		resizer();

		// Bind events
		window.addEventListener('resize', resizer, false);
		window.addEventListener('orientationchange', resizer, false);
	}

	/**
	 * Extends the default settings.
	 *
	 * @param obj
	 * @param ext
	 * @private
	 */
	private extend(obj: any, ext: any): any {
		for(const key in ext) {
			if (ext.hasOwnProperty(key)) {
				obj[key] = ext[key];
			}
		}
		return obj;
	}
}
