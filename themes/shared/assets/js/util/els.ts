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
	public static HTML: HTMLHtmlElement = document.documentElement as HTMLHtmlElement;
	public static Body: HTMLBodyElement = document.body as HTMLBodyElement;
	public static Main: HTMLElement;
	public static Header: HTMLElement;
	public static Nav: HTMLElement;
	public static Footer: HTMLElement;

	/**
	 * Initialise sets up the Elements.
	 */
	public static _initialize() {
		this.Main = <HTMLElement>document.querySelector('main');
		this.Header = <HTMLElement>document.querySelector('.header-default');
		this.Nav = <HTMLElement>document.querySelector('.nav');
		this.Footer = <HTMLElement>document.querySelector('footer');
	}
}

Elements._initialize();
