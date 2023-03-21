/**
 * scroll.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Elements } from '../util/els';
import { IsTouchDevice } from '../util/css';
import { Log} from '../util/log';
import LoconativeScroll from './../vendor/loconative-scroll.js';
import { OnScrollEvent } from 'locomotive-scroll';

/**
 * Scroll is responsible for adding smooth scroll to
 * the body. This will be disabled for mobile.
 */
class Scroll {
	/**
	 * The instance of the scroll.
	 *
	 * @private
	 */
	public instance = null;

	/**
	 * The default options for Loconative scroll
	 *
	 * @private
	 */
	private options = {
		wrapper: window,
		smooth: true,
		duration: 1.5,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
		direction: 'vertical', // vertical, horizontal
		gestureDirection: 'vertical', // vertical, horizontal, both
		mouseMultiplier: 1,
		touchMultiplier: 2,
		infinite: false,
		reloadOnContextChange: true,
		smartphone: {
			smooth: false,
		},
		tablet: {
			smooth: false,
			breakpoint: 1024,
		},
	};

	/**
	 * Initialises the scroll.
	 *
	 * @param container
	 */
	constructor(container: Element) {
		this.init(container);
		this.onScroll((y: number) => this.setScrollTop(y));
	}

	/**
	 * Initialises the scroll.
	 * If the window is less than 1024 the scroll instance will
	 * be destroyed. Otherwise, the scroll will be created
	 * from the input element.
	 *
	 * @param container
	 */
	public init(container: Element): void {
		const scrollContainer = container.querySelector('[data-scroll-container]'),
			options = this.options;
		if (scrollContainer.hasAttribute('data-scroll-disable')) {
			Log.debug("Disabling smooth scroll");
			// options.smooth = false;
		}
		Log.debug("Initialising scroll instance");
		// @ts-ignore
		this.instance = new LoconativeScroll({
			el: scrollContainer,
			...options,
		});
	}

	/**
	 * Destroys the scroll instance and removes any styles.
	 */
	public destroy(): void {
		Log.debug("Destroying scroll instance");
		if (this.instance === null) {
			return;
		}
		this.instance.destroy();
		this.instance = null;
	}

	/**
	 * Adds the scroll event listener.
	 * If it's a touch device, it will use the native scroll event,
	 * otherwise it will bind to the scroll instance.
	 *
	 * @param callback
	 */
	public onScroll(callback: (y: number) => unknown) {
		if (IsTouchDevice()) {
			window.addEventListener("scroll", () => {
				callback(Elements.HTML.scrollTop);
			});
			return;
		}
		this.instance.on('scroll', (e: OnScrollEvent) => {
			callback(e.scroll.y);
		});
	}

	/**
	 * Adds the scroll y position to the HTML element.
	 * If the y position has passed the scroll amount, a 'scrolled'
	 * class will be added.
	 *
	 * @param y
	 * @private
	 */
	private setScrollTop(y: number) {
		Elements.HTML.style.setProperty('--scroll-y', y.toString());
		const scrollAmount = 500;
		if (y > scrollAmount) {
			Elements.HTML.classList.add("scrolled");
			return;
		}
		Elements.HTML.classList.remove("scrolled");
	}
}

export default new Scroll(Elements.HTML);
