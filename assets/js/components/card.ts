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
 * Card is responsible for adding clip and transform
 * animations to card elements.
 */
export class Card {
	/**
	 * The DOM selector for the card.
	 *
	 * @private
	 */
	public selector = '.card';

	/**
	 * The default clip path percentage of the image
	 * or video.
	 *
	 * @private
	 */
	private readonly defaultClipPercentage = "40%"

	/**
	 * Instantiates a new card type.
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
	 * Attaches the event handlers for all card elements
	 * on the DOM.
	 *
	 * @private
	 */
	private attachHandlers(): void {
		document.querySelectorAll<HTMLButtonElement>(this.selector).forEach((card) => {
			if (!card.classList.contains('card-clip')) {
				return;
			}
			const imageClip = card.querySelector('.card-image-clip') as HTMLElement;
			if (!imageClip) {
				Log.error('No card image found for card: ' + card);
				return;
			}

			const image = card.querySelector('.card-image') as HTMLElement;
			if (!image) {
				Log.error('No card image found for card: ' + card);
				return;
			}

			anime.set(imageClip, {scale: 1.1})
			image.addEventListener('mousemove', ev => this.mouseMove(imageClip, ev));
			image.addEventListener('mouseenter', ev => this.mouseEnter(imageClip, ev));
			image.addEventListener('mouseleave', ev => this.mouseLeave(imageClip, ev));
		});
	}

	/**
	 * Mouse enter handler that fades in the clipped image.
	 *
	 * @param image
	 * @param event
	 * @private
	 */
	private mouseEnter(image: Element, event: MouseEvent): void {
		anime({
			targets: image,
			easing: "easeOutExpo",
			opacity: [0, 1],
			duration: 1500,
			delay: 100,
		});
	}

	/**
	 * Mouse leave handler for the card that transforms the clip
	 * path back to 0%.
	 *
	 * @param image
	 * @param event
	 * @private
	 */
	private mouseLeave(image: Element, event: MouseEvent): void {
		const cord = this.getCoordinates(image, event);
		anime({
			targets: image,
			easing: "easeOutExpo",
			clipPath: `circle(0% at ${cord.x}px ${cord.y}px)`,
			opacity: [1, 0],
			duration: 1500,
		});
	}

	/**
	 * Mouse move handler for the card that transforms the
	 * clip path circle and translates on the Y & X axis.
	 *
	 * @param image
	 * @param event
	 * @private
	 */
	private mouseMove(image: Element, event: MouseEvent): void {
		const cord = this.getCoordinates(image, event);
		anime({
			targets: image,
			clipPath: {
				value: `circle(${this.defaultClipPercentage} at ${cord.x}px ${cord.y}px)`,
				easing: "easeOutExpo",
				duration:  200,
			},
			translateY: {
				value:  cord.y / 30,
				easing: "linear",
				duration: 100,
			},
			translateX: {
				value: cord.x / 30,
				easing: "linear",
				duration: 100,
			},
		});
	}
}
