/**
 * before-after.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

/**
 * Before / After - Controls the imagery and thumbs
 * of a before & after image.
 *
 * @constructor
 */
export const beforeAfter = (): void => {
	document.querySelectorAll('.before-after').forEach((el) => {
		const slider = el.querySelector('.before-after-slider') as HTMLInputElement;
		if (!slider) {
			Log.error('Before/After - No foreground found for before/after element');
			return;
		}
		slider.addEventListener('input', (e) => {
			const foreground = <HTMLElement>el.querySelector('.before-after-background'),
				thumb = <HTMLButtonElement>el.querySelector('.before-after-thumb');
			if (!foreground || !thumb) {
				Log.error('Before/After - Element missing from before/after element');
				return;
			}
			const value = (e.target as HTMLInputElement).value;
			foreground.style.width = `${value}%`;
			thumb.style.left = `${value}%`;
		});
	});
}
