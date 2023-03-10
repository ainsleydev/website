// Vendor
import LocomotiveScroll from 'locomotive-scroll';

/**
 * Scroll Class
 *
 */
export class Scroll {
	constructor() {
		this.instance = false;
		this.activateScroll = true;
	}

	init() {
		if (window.innerWidth >= 1024) {
			if (this.activateScroll === true) {
				setTimeout((e) => {
					this.clearProps();

					this.instance = new LocomotiveScroll({
						el: document.querySelector('[data-scroll-container]'),
						smooth: true,
						smoothMobile: false,
						offset: [0, 0],
						lerp: 0.1,
						touchMultiplier: 0,
					});

					this.activateScroll = false;
				}, 50);
			}
		} else {
			if (this.instance) {
				this.instance.stop();
				this.instance.destroy();
				this.instance = false;
			}

			this.clearProps();

			this.activateScroll = true;
		}
	}

	resize() {
		window.addEventListener('resize', () => {
			this.init();
		});
	}

	changePage() {
		this.activateScroll = true;
		this.instance = false;
		this.init();
	}

	clearProps() {
		const els = [
			...document.querySelectorAll('[data-scroll-section]'),
			...document.querySelectorAll('[data-scroll]'),
			...document.querySelectorAll('.hero-image .hero-image-file'),
		];

		els.forEach((el) => {
			if (el) {
				el.setAttribute('style', '');
			}
		});
	}

	destroy() {
		this.instance.stop();
		this.instance.destroy();
	}

	update() {
		this.instance.update();
	}
}

/**
 * Export
 *
 */
export default { Scroll };
