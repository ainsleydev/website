/**
 * card.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

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
		this.attachHandlers();
	}

	/**
	 * Attaches the event handlers for all button elements
	 * on the DOM.
	 *
	 * @private
	 */
	private attachHandlers(): void {
		document
			.querySelectorAll<HTMLButtonElement>(this.selector)
			.forEach((card) => {
				const image = card.querySelector(
					'.card-image-clip',
				) as HTMLElement;
				if (!image) {
					Log.error('No card image found for card: ' + card);
					return;
				}

				const getCordinates = (e: MouseEvent) => {
					const offset = image.getBoundingClientRect(),
						x = e.clientX - offset.left,
						y = e.clientY - offset.top;
					return {
						x: x,
						y: y,
					};
				};

				// const isAnimating = true;

				card.addEventListener('mousemove', (e) => {
					// if (!isAnimating) return;
					const cord = getCordinates(e);
					card.classList.add('card-active');
					image.style.clipPath = `circle(50% at ${cord.x}px ${cord.y}px)`;
					image.style.opacity = '1';

					// setTimeout(() => {
					// 	image.style.clipPath = `circle(110% at ${cord.x}px ${cord.y}px)`;
					// 	isAnimating = false;
					// }, 1000);
				});

				card.addEventListener('mouseleave', () => {
					// const cord = getCordinates(e);
					card.classList.remove('card-active');
					// image.style.clipPath = `circle(0px at ${cord.x}px ${cord.y}px)`;
					image.style.opacity = '0';
					// isAnimating = false;
				});
			});
	}
}
