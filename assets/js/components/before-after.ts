/**
 * before-after.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';
import { IsTouchDevice } from '../util/css';

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
		const foreground = <HTMLElement>el.querySelector('.before-after-background'),
			thumb = <HTMLButtonElement>el.querySelector('.before-after-thumb');
		if (!foreground || !thumb) {
			Log.error('Before/After - Element missing from before/after element');
			return;
		}
		const updateValues = (percent: number) => {
			foreground.style.width = `${percent}%`;
			thumb.style.left = `${percent}%`;
		};
		if (!IsTouchDevice()) {
			slider.addEventListener('input', (e) => {
				const value = (e.target as HTMLInputElement).value;
				console.log(value);
				updateValues(parseFloat(value));
			});
		} else {
			slider.addEventListener('touchmove', (e: TouchEvent) => {
				const box = slider.getBoundingClientRect(),
					position = e.touches[0].clientX - box.left,
					percent = (position / box.width) * 100;
				updateValues(percent);
			});
		}
	});
};
