/**
 * scroll.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import LoconativeScroll from './../vendor/loconative-scroll.js';
import { Elements } from '../util/els';

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
	private instance = null;

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
		this.addScroll();
		this.resize();
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
			options.smooth = false;
		}
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
		if (this.instance === null) {
			return;
		}
		this.instance.stop();
		this.instance.destroy();
		this.clearProps();
		this.instance = null;
	}

	/**
	 * Resize handler for initialising or destroying
	 * the scroll.
	 *
	 * @private
	 */
	private resize() {
		let timeout;
		window.addEventListener('resize', () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				this.init(Elements.Body);
			}, 100);
		});
	}

	/**
	 * Removes any styles associated with the scroll instance.
	 *
	 * @private
	 */
	private clearProps() {
		const els = [
			...Array.from(document.querySelectorAll('[data-scroll-section]')),
			...Array.from(document.querySelectorAll('[data-scroll]')),
		];
		els.forEach((el) => el.setAttribute('style', ''));
	}

	private addScroll(): void {
		if (!this.instance) {
			return;
		}
		const scrollAmount = 500;
		this.instance.on('scroll', (e) => {
			this.setScrollTop(e.scroll.y);

			// TODO, need to do native scroll.
			// const y = body.scrollTop;
			//
			// if (y > scrollAmount) {
			// 	Log.debug('Scroll - Scrolled passed point' + scrollAmount);
			// 	html.classList.add('scrolled');
			// 	return;
			// }
			// html.classList.remove('scrolled');
		});
	}

	private setScrollTop(y: number) {
		Elements.HTML.style.setProperty('--scroll-y', y.toString());
	}
}

export default new Scroll(Elements.HTML);
