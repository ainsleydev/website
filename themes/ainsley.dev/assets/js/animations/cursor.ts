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
	public selector = ".cursor"

	/**
	 * The DOM selector for the cursor.
	 *
	 * @public
	 */
	public elementSelector = ".cursor-element"

	/**
	 * The cursor HTML element.
	 *
	 * @private
	 */
	private el: HTMLDivElement

	/**
	 * Instantiates a new cursor type.
	 */
	constructor() {
		const el = document.querySelector(this.selector);
		if (!el) {
			Log.error(`No ${this.selector} element found in the DOM`);
			return;
		}
		this.el = el as HTMLDivElement;
		this.attachMouseMove();
		document.querySelectorAll<HTMLElement>(this.elementSelector)
			.forEach(el => this.attachElementHandlers(el));
	}

	/**
	 * Attaches the mouse move to the cursor so the
	 * element is moved alongside the mouse.
	 *
	 * @private
	 */
	private attachMouseMove(): void {
		document.addEventListener('mousemove', e => {
			this.el.style.left = e.clientX + 'px';
			this.el.style.top = e.clientY + 'px';
		});
	}

	/**
	 * Attaches the elements to be animated.
	 *
	 * @param el
	 * @private
	 */
	private attachElementHandlers(el: HTMLElement): void {
		const classes = el.getAttributeNames().filter(a => a.startsWith("data-cursor"));

		el.addEventListener("mousemove", () => classes.forEach(c => {
			this.addScale(el);
			this.el.classList.add("cursor-active");
			this.el.classList.add(c.replace("data-", ""));
		}));

		el.addEventListener("mouseleave", () => classes.forEach(c => {
			this.removeScale(el);
			this.el.classList.remove("cursor-active");
			this.el.classList.remove(c.replace("data-", ""));
		}));
	}

	/**
	 * Adds a class(es) to the cursor.
	 *
	 * @param selectors
	 */
	public addClass(...selectors: CursorClasses[]): void {
		this.el.classList.add("cursor-active");
		selectors.forEach(sel => this.el.classList.add(sel));
	}

	/**
	 * Removes a class(es) to the cursor.
	 *
	 * @param selectors
	 */
	public removeClass(...selectors: CursorClasses[]): void {
		this.el.classList.remove("cursor-active");
		selectors.forEach(sel => this.el.classList.remove(sel));
	}

	/**
	 * Transforms the cursor to be bigger when the element
	 * is hovered according to the data attribute set.
	 *
	 * @param el
	 * @private
	 */
	private addScale(el: HTMLElement): void {
		let scale = el.getAttribute("data-cursor-scale") ?? "1.5";
		this.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
	}

	/**
	 * Removes the scale when the mouse is out.
	 *
	 * @param el
	 * @private
	 */
	private removeScale(el: HTMLElement): void {
		this.el.style.transform = `translate(-50%, -50%)`;
	}
}

export default new Cursor();
