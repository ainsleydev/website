/**
 * nav.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Elements} from "../util/els";
import {Log} from "../util/log";

/**
 * Log is responsible for logging to the stdout
 * within the website.
 */
class Navigation {

	/**
	 * TODO
	 */
	checkbox: HTMLFormElement

	/**
	 * TODO
	 */
	constructor() {
		this.checkbox = <HTMLFormElement>document.querySelector(".nav .nav-checkbox")
	}

	/**
	 * Nav Click
	 * Removes classes once a link is clicked.
	 * @private
	 */
	private navClick(): void {
		const links = Elements.Nav.querySelectorAll(".nav-list a");
		links.forEach(link => {
			link.addEventListener('click', () => {
				//header.classList.remove('header-active');
				//nav.classList.remove('nav-mobile-active');
				//document.querySelector('#hamburger-check').checked = '';
			});
		});
	}

	/**
	 *
	 * @private
	 */
	private pictureHover(): void {
		const links = Elements.Nav.querySelectorAll("[data-nav-image]");
		links.forEach(link => {
			link.addEventListener("click", () => {
				const image = link.getAttribute("data-nav-image");
				if (!image) {
					Log.warn("No data-nav-image attribute found for link: " + link)
				}

			});
		});
	}
}

export const Nav = new Navigation();
