/**
 * skew.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';
import anime from 'animejs/lib/anime.es';
import { AnimeParams } from 'animejs';

/**
 * SkewOptions is the configuration of a Skewed singular
 * skewed element.
 */
interface SkewOptions {
	transform: CoordinatesConfig;
	rotate?: CoordinatesConfig;
	shouldRotate: boolean;
}

/**
 * CoordinatesConfig is the X/Y position relating to
 * transform and rotation.
 */
interface CoordinatesConfig {
	x: number;
	y: number;
}

/**
 * Skew is responsible for adding skew animations
 * to given elements.
 */
export class Skew {
	/**
	 * The DOM selector for the elements to skew.
	 *
	 * @readonly
	 */
	public readonly selector = '.skew';

	/**
	 * The default options for skewing elements,
	 * when properties are not defined.
	 *
	 * @readonly
	 */
	public readonly defaultOptions: SkewOptions = {
		transform: {
			x: 0.1,
			y: 0.1,
		},
		rotate: {
			x: 0.1,
			y: -0.1,
		},
		shouldRotate: false,
	};

	/**
	 * Initialises the elements marked as Skewed.
	 *
	 * @constructor
	 */
	constructor() {
		this.attachHandlers();
	}

	/**
	 * Attaches the event handlers for all skewed elements
	 * on the DOM.
	 *
	 * @private
	 */
	private attachHandlers() {
		document.querySelectorAll<HTMLButtonElement>(this.selector).forEach((el) => {
			const cfg = this.getOptions(el);
			this.mouseMove(el, cfg);
			this.mouseOut(el);
		});
	}

	/**
	 * Attaches the mouse move event which transforms and skews
	 * the element based of on configuration.
	 *
	 * @param el
	 * @param config
	 * @private
	 */
	private mouseMove(el: HTMLElement, config: SkewOptions): void {
		el.addEventListener('mousemove', (e) => {
			const pos = this.getPos(el, e),
				transform = {
					x: pos.x * config.transform.x,
					y: pos.y * config.transform.y,
				} as CoordinatesConfig;
			let rotate = null;
			if (config.shouldRotate && config.rotate) {
				rotate = {
					x: pos.x * config.rotate.x,
					y: pos.y * config.rotate.y,
				} as CoordinatesConfig;
			}
			this.animate(el, transform, rotate);
		});
	}

	/**
	 * Removes the mouse move event and clears selectors.
	 *
	 * @param el
	 * @private
	 */
	private mouseOut(el: HTMLElement): void {
		el.addEventListener('mouseleave', () => {
			this.animate(el, { x: 0, y: 0 }, { x: 0, y: 0 });
		});
	}

	/**
	 * Animates the element on the x and y-axis for transform.
	 *
	 * @param el
	 * @param transform
	 * @param rotate
	 * @private
	 */
	private animate(el: HTMLElement, transform, rotate?: CoordinatesConfig): void {
		const params = {
			targets: el,
			translateX: transform.x,
			translateY: transform.y,
			duration: 100,
			easing: 'linear',
		} as AnimeParams;
		if (rotate) {
			params.rotateX = rotate.x / 10;
			params.rotateY = rotate.y / 10;
		}
		anime(params);
	}

	/**
	 * Obtains the position of the cursor in relation to
	 * the element.
	 *
	 * @param el
	 * @param event
	 * @private
	 */
	private getPos(el: HTMLElement, event: MouseEvent): { x: number; y: number } {
		const pos = el.getBoundingClientRect();
		return {
			x: event.clientX - pos.left - pos.width / 2,
			y: event.clientY - pos.top - pos.height / 2,
		};
	}

	/**
	 * Obtains the skew options by merging data
	 * attributes with the default config.
	 *
	 * @param el
	 * @private
	 */
	private getOptions(el: HTMLElement): SkewOptions {
		return {
			shouldRotate: el.hasAttribute('data-skew-rotate'),
			transform: {
				x: this.getAttribute(el, 'data-skew-transform-x') ?? this.defaultOptions.transform.x,
				y: this.getAttribute(el, 'data-skew-transform-y') ?? this.defaultOptions.transform.y,
			},
			rotate: {
				x: this.getAttribute(el, 'data-skew-rotate-x') ?? this.defaultOptions.transform.x,
				y: this.getAttribute(el, 'data-skew-rotate-y') ?? this.defaultOptions.transform.y,
			},
		};
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
			Log.error('Skew - Attribute is NaN: ' + attr);
			return null;
		}
		return num;
	}
}
