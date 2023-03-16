/**
 * els.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * Elements defines global HTML selectors for
 * the website.
 */
export class Elements {
	/**
	 * The base HTML element.
	 */
	public static HTML: HTMLHtmlElement = document.documentElement as HTMLHtmlElement

	/**
	 * The HTML body element.
	 */
	public static Body: HTMLBodyElement = document.body as HTMLBodyElement

	/**
	 * The header element.
	 */
	public static Header: HTMLElement;

	/**
	 * The navigation element.
	 */
	public static Nav: HTMLElement;

	/**
	 * Initialise sets up the Elements.
	 */
	public static _initialize() {
		this.Header = <HTMLElement>document.querySelector('.header');
		this.Nav = <HTMLElement>document.querySelector('.nav');
	}
}

Elements._initialize();
