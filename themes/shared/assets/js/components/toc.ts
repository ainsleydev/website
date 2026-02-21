/**
 * toc.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * TOC is responsible for adding active classes on
 * scroll for the Table of Contents
 *
 * See: https://dakotaleemartinez.com/tutorials/how-to-add-active-highlight-to-table-of-contents/
 */
export class TOC {
	/**
	 * The links of inside the TOC.
	 *
	 * @private
	 */
	private links: NodeListOf<HTMLLinkElement>;

	/**
	 * Headers of the content that the contents
	 * is linked to.
	 *
	 * @private
	 */
	private headers: HTMLElement[];

	/**
	 * The currently active header.
	 *
	 * @private
	 */
	private activeHeader: HTMLElement;

	/**
	 * Request animation ticker.
	 *
	 * @private
	 */
	private ticking = false;

	/**
	 * Instantiates a new TOC type.
	 */
	constructor() {
		if (!document.querySelector('.toc')) {
			return;
		}
		this.links = document.querySelectorAll<HTMLLinkElement>('.toc a');
		this.headers = Array.from(this.links).map((link) => {
			return document.querySelector(`#${link.href.split('#')[1]}`);
		});
		window.addEventListener('scroll', (e) => {
			this.onScroll();
		});
	}

	/**
	 * Binds the scroll event.
	 *
	 * @private
	 */
	private onScroll() {
		if (!this.ticking) {
			requestAnimationFrame(this.update.bind(this));
			this.ticking = true;
		}
	}

	/**
	 * Adds the active classes on scroll.
	 *
	 * @private
	 */
	private update(): void {
		this.activeHeader ||= this.headers[0];
		let activeIndex = this.headers.findIndex((header) => {
			return header.getBoundingClientRect().top > 100;
		});
		if (activeIndex == -1) {
			activeIndex = this.headers.length - 1;
		} else if (activeIndex > 0) {
			activeIndex--;
		}
		this.activeHeader = this.headers[activeIndex];
		this.links.forEach((link) => link.classList.remove('active'));
		this.links[activeIndex].classList.add('active');
		this.ticking = false;
	}
}
