/**
 * scroll.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import LoconativeScroll from './../vendor/loconative-scroll.js';
import { Elements } from '../util/els';
import { Log } from '../util/log';

class Scroll {
	private instance = null;

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
	 *
	 * @param container
	 */
	constructor(container: Element) {
		this.init(container);
	}

	/**
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
		// Elements.Body.style.opacity = "1";
	}

	public destroy(): void {
		this.instance.destroy();
	}

	private addScroll(): void {
		// const scrollAmount = 500;
		// body.addEventListener('scroll', () => {
		// 	const y = body.scrollTop;
		// 	html.style.setProperty('--scroll-y', y.toString());
		// 	if (y > scrollAmount) {
		// 		Log.debug('Scroll - Scrolled passed point' + scrollAmount);
		// 		html.classList.add('scrolled');
		// 		return;
		// 	}
		// 	html.classList.remove('scrolled');
		// });
	}
}

export default new Scroll(Elements.HTML);
