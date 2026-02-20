/**
 * scroll.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Elements } from '../util/els';
import { Log } from '../util/log';
import LoconativeScroll from './../vendor/loconative-scroll.js';
import { OnScrollEvent } from 'locomotive-scroll';
import { namespace } from './namespace';

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
	 * Queue for scroll callbacks
	 *
	 * @private
	 */
	private scrollCallbacks: Array<(y: number) => unknown> = [];

	/**
	 * The window.load handler
	 *
	 * @private
	 */
	private loadHandler = null;

	/**
	 * Creates a new scroll instance.
	 *
	 * @param container
	 */
	constructor(container: Element) {
		this.loadHandler = () => {
			this.init(container);

			// Process queued callbacks
			this.scrollCallbacks.forEach((callback) => {
				this.onScroll(callback);
			});

			// Clear the queue
			this.scrollCallbacks = [];
		};

		// Attach the window.onload event listener to ensure everything is fully loaded
		window.addEventListener('load', this.loadHandler);
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
			options = this.options,
			space = namespace(container);
		if (
			scrollContainer.hasAttribute('data-scroll-disable') ||
			space === 'page-insights' ||
			space === 'page-legal' ||
			space === 'page-guidelines'
		) {
			Log.debug('Disabling smooth scroll');
			options.smooth = false;
		} else {
			Log.debug('Enabling smooth scroll');
			options.smooth = true;
		}
		Log.debug('Initialising scroll instance');
		// @ts-ignore
		this.instance = new LoconativeScroll({
			el: scrollContainer,
			...options,
		});
	}

	/**
	 * Destroys the scroll instance.
	 */
	public destroy(): void {
		Log.debug('Destroying scroll instance');
		if (this.instance === null) {
			return;
		}
		this.instance.destroy();
		this.instance = null;

		this.clearStyles();

		if (this.loadHandler) {
			window.removeEventListener('load', this.loadHandler);
			this.loadHandler = null;
		}
	}

	/**
	 * Removes all styles associated with a scroll element.
	 */
	public clearStyles(): void {
		document.querySelectorAll<HTMLElement>('[data-scroll]').forEach((e) => {
			e.removeAttribute('style');
		});
	}

	/**
	 * Adds the scroll event listener.
	 * If the instance isn't initialized yet, the callback will be queued
	 * and executed once the instance is ready.
	 *
	 * @param callback
	 */
	public onScroll(callback: (y: number) => unknown): void {
		if (this.instance) {
			this.instance.on('scroll', (e: OnScrollEvent) => callback(e.scroll.y));
			return;
		}
		// Queue the callback if instance isn't ready yet
		this.scrollCallbacks.push(callback);
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
			Elements.HTML.classList.add('scrolled');
			return;
		}
		Elements.HTML.classList.remove('scrolled');
	}
}

// Exports a new singleton scroll instance, only one instance should be created.
export default new Scroll(Elements.HTML);
