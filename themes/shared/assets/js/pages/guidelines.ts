/**
 * header.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import anime from 'animejs/lib/anime.es';

/**
 * Header is responsible for adding animations to the
 * element when it is open and closed.
 */
class Guidelines {
	/**
	 * Determines if the navigation is currently open.
	 */
	public isOpen = false;

	/**
	 * The element that will animate.
	 */
	public readonly button: HTMLElement;

	/**
	 * The aside element that will animate.
	 */
	public readonly aside: HTMLElement;

	/**
	 * The overlay element that will animate.
	 *
	 * @private
	 */
	private readonly overlay: HTMLElement;

	/**
	 * Initialises the header element.
	 *
	 * @constructor
	 */
	constructor() {
		this.button = document.querySelector('.header-hamburger');
		if (!this.button) {
			return;
		}
		this.aside = document.querySelector('#guidelines-aside-wrapper');
		this.overlay = document.querySelector('#guidelines-aside-overlay');
		if (!this.aside || !this.overlay) {
			return;
		}
		this.attachEventHandler();
	}

	/**
	 * Adds the click handler to the button within
	 * the header.
	 *
	 * @private
	 */
	private attachEventHandler(): void {
		this.button.addEventListener('click', () => this.play());
		this.overlay.addEventListener('click', () => this.play());
	}

	/**
	 * Plays the animation. If the nav is open, the timeline
	 * will be reversed and visa-versa.
	 */
	public play(): void {
		if (!this.isOpen) {
			anime.set(this.overlay, { display: 'block' });
		}

		this.aside.classList.toggle('active');
		this.isOpen = !this.isOpen;

		// Animate aside transform.
		anime({
			targets: this.aside,
			translateX: this.isOpen ? ['-100%', 0] : [0, '-100%'],
			duration: 500,
			easing: 'easeOutExpo',
		});

		// Animate overlay opacity.
		anime({
			targets: this.overlay,
			complete: () => {
				if (!this.isOpen) {
					setTimeout(() => {
						anime.set(this.overlay, { display: 'none' });
					}, 200);
				}
			},
			opacity: this.isOpen ? [0, 1] : [1, 0],
			duration: 1000,
			easing: 'easeOutExpo',
		});
	}
}

new Guidelines();
