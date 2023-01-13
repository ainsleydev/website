/**
 * cursor.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Log} from "../util/log";

/**
 * Cursor classes is the type that contains CSS
 * classes to add and remove from the cursor.
 */
export enum CursorClasses {
	Invert = "cursor-invert",
	InvertBlack = "cursor-invert-black",
	InvertWhite = "cursor-invert-white",

}

/**
 * Cursor is responsible for adding and removing
 * classes when an event has been triggered.
 */
export class Cursor {

	/**
	 * The DOM selector for the cursor.
	 *
	 * @public
	 */
	public static selector = ".cursor"

	/**
	 * The cursor HTML element.
	 *
	 * @private
	 */
	private static el: HTMLDivElement

	/**
	 * Instantiates a new cursor type.
	 */
	static initialize() {
		const el = document.querySelector(this.selector);
		if (!el) {
			Log.error(`No ${this.selector} element found in the DOM`);
			return;
		}
		this.el = el as HTMLDivElement;
		this.attachMouseMove();
	}

	/**
	 * Attaches the mouse move to the cursor so the
	 * element is moved alongside the mouse.
	 *
	 * @private
	 */
	private static attachMouseMove(): void {
		document.addEventListener('mousemove', e => {
			Cursor.el.style.left = e.clientX + 'px';
			Cursor.el.style.top = e.clientY + 'px';
		});
	}

	/**
	 * Adds a class(es) to the cursor.
	 *
	 * @param selectors
	 */
	public static addClass(...selectors: CursorClasses[]): void {
		this.el.classList.add("cursor-active");
		selectors.forEach(sel => this.el.classList.add(sel));
	}

	/**
	 * Removes a class(es) to the cursor.
	 *
	 * @param selectors
	 */
	public static removeClass(...selectors: CursorClasses[]): void {
		this.el.classList.remove("cursor-active");
		selectors.forEach(sel => this.el.classList.remove(sel));
	}

	// public static skew(el: HTMLElement, selector: CursorClasses): void {
	// 	btn.addEventListener("mousemove", e => {
	//
	// 	});
	// }
}

Cursor.initialize();
