/**
 * card.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';
import { IsTouchDevice } from '../util/css';
import anime from 'animejs/lib/anime.es';

/**
 * Card is responsible for adding micro interactions
 * to card elements.
 */
export class Card {
	/**
	 * The DOM selector for the button.
	 *
	 * @private
	 */
	public selector = '.card';

	/**
	 * Instantiates a new button type.
	 */
	constructor() {
		Log.debug('Card - Initialising');
		if (!IsTouchDevice()) {
			this.attachHandlers();
		}
	}

	/**
	 * Obtains the coordinates relative to the element.
	 *
	 * @param el
	 * @param e
	 * @private
	 */
	private getCoordinates(el: Element, e: MouseEvent): { x: number; y: number } {
		const offset = el.getBoundingClientRect(),
			x = e.clientX - offset.left,
			y = e.clientY - offset.top;
		return {
			x: x,
			y: y,
		};
	}

	/**
	 * Attaches the event handlers for all button elements
	 * on the DOM.
	 *
	 * @private
	 */
	private attachHandlers(): void {
		document.querySelectorAll<HTMLButtonElement>(this.selector).forEach((card) => {
			if (!card.classList.contains('card-clip')) {
				return;
			}
			const image = card.querySelector('.card-image-clip') as HTMLElement;
			if (!image) {
				Log.error('No card image found for card: ' + card);
				return;
			}

			anime.set(image, { opacity: 0 });

			image.addEventListener('mouseenter', (e: MouseEvent) => {
				anime({
					targets: image,
					opacity: [0, 1],
					duration: 500,
				});
			});

			// image.addEventListener('mousemove', (e: MouseEvent) => {
			// 	const cord = this.getCoordinates(image, e);
			// 	anime({
			// 		targets: image,
			// 		// keyframes: [
			// 		// 	{ clipPath: "circle(0)" },
			// 		// 	{ clipPath: "circle(100%)" },
			// 		// ],
			// 		// clipPath: {
			// 		// 	value: `circle(50% at ${cord.x}px ${cord.y}px)`,
			// 		// 	duration: 100,
			// 		// },
			// 	});
			// });

			image.addEventListener('mouseout', (e: MouseEvent) => {
				anime({
					targets: image,
					opacity: [1, 0],
					duration: 500,
				});
			});
		});
	}
}
