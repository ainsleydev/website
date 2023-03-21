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
	public static HTML: HTMLHtmlElement = document.documentElement as HTMLHtmlElement;

	/**
	 * The HTML body element.
	 */
	public static Body: HTMLBodyElement = document.body as HTMLBodyElement;

	/**
	 * The main element.
	 */
	public static Main: HTMLElement;

	/**
	 * The header element.
	 */
	public static Header: HTMLElement;

	/**
	 * The navigation element.
	 */
	public static Nav: HTMLElement;

	/**
	 * The footer element.
	 */
	public static Footer: HTMLElement;

	/**
	 * Initialise sets up the Elements.
	 */
	public static _initialize() {
		this.Main = <HTMLElement>document.querySelector('main');
		this.Header = <HTMLElement>document.querySelector('.header');
		this.Nav = <HTMLElement>document.querySelector('.nav');
		this.Footer = <HTMLElement>document.querySelector('footer');
	}
}

Elements._initialize();
