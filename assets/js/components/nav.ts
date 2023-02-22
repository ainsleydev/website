/**
 * nav.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Elements } from '../util/els';
import { Log } from '../util/log';

/**
 * Log is responsible for logging to the stdout
 * within the website.
 */
export class Navigation {
	/**
	 * The toggle to display the navigation element.
	 */
	checkbox: HTMLFormElement;

	/**
	 * Initialises the cursor element.
	 *
	 * @constructor
	 */
	constructor() {
		this.checkbox = <HTMLFormElement>(
			document.querySelector('.nav .nav-checkbox')
		);
		this.pictureHover();
	}

	/**
	 * Nav Click
	 * Removes classes once a link is clicked.
	 *
	 * @private
	 */
	private navClick(): void {
		const links = Elements.Nav.querySelectorAll('.nav-list a');
		links.forEach((link) => {
			link.addEventListener('click', () => {
				//header.classList.remove('header-active');
				//nav.classList.remove('nav-mobile-active');
				//document.querySelector('#hamburger-check').checked = '';
			});
		});
	}

	/**
	 * Picture Hover
	 * Adds the active class to the navigation
	 * pictures when the user hovers over them.
	 *
	 * @private
	 */
	private pictureHover(): void {
		const links = Elements.Nav.querySelectorAll('[data-nav-image]');
		links.forEach((link) => {
			// Mouse over handler.
			link.addEventListener('mouseover', () => {
				const selector = link.getAttribute('data-nav-image');
				if (!selector) {
					Log.warn(
						'Nav - No data-nav-image attribute found for link: ' +
							link,
					);
					return;
				}
				const image = document.querySelector(selector.toString());
				if (!image) {
					Log.warn(
						'Nav - No image found with the attribute: ' +
							selector.toString(),
					);
					return;
				}
				image.classList.add('nav-images-item-active');
			});

			// Mouse out handler.
			link.addEventListener('mouseout', () => {
				document
					.querySelectorAll('.nav-images-item-active')
					.forEach((image) => {
						image.classList.remove('nav-images-item-active');
					});
			});
		});
	}
}
