/**
 * cursor.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

/**
 * Cursor is responsible for adding and removing
 * classes when an event has been triggered.
 */
export class Cursor {
	/**
	 * The DOM selector for the element.
	 *
	 * @public
	 */
	public readonly selector = '.cursor';

	/**
	 * The DOM selector for the cursor.
	 *
	 * @public
	 */
	public readonly elementSelector = '.cursor-element';

	/**
	 * The cursor HTML element.
	 *
	 * @private
	 */
	private el: HTMLDivElement;

	/**
	 * Initialises the cursor element.
	 *
	 * @constructor
	 */
	constructor() {
		Log.debug('Cursor - Initialising');
		const el = document.querySelector(this.selector);
		if (!el) {
			Log.error(`Cursor - No ${this.selector} element found in the DOM`);
			return;
		}
		this.el = el as HTMLDivElement;
		this.attachMouseMove();
		document.querySelectorAll<HTMLElement>(this.elementSelector)
			.forEach((el) => this.attachElementHandlers(el));
	}

	/**
	 * Destroy removes all active classes and styles
	 * from the cursor element.
	 */
	public destroy(): void {
		this.el.style.transform = '';
		setTimeout(() => {
			this.el.classList.forEach(c => {
				if (c == "cursor") {
					return;
				}
				this.el.classList.remove(c);
			});
		}, 200);
	}

	/**
	 * Attaches the mouse move to the cursor so the
	 * element is moved alongside the mouse.
	 *
	 * @private
	 */
	private attachMouseMove(): void {
		document.addEventListener('mousemove', (e) => {
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
		const classes = el.getAttributeNames().filter((a) => a.startsWith('data-cursor'));

		el.addEventListener('mousemove', () =>
			classes.forEach((c) => {
				this.addScale(el);
				this.el.classList.add('cursor-active');
				this.el.classList.add(c.replace('data-', ''));
			}),
		);

		el.addEventListener('mouseleave', () =>
			classes.forEach((c) => {
				this.removeScale();
				this.el.classList.remove('cursor-active');

				setTimeout(() => {
					// This was causing an issue with flickering between insights cards, so
					// a check is needed to see if the cursor is still animating.
					if (!this.el.classList.contains('cursor-active')) {
						this.el.classList.remove(c.replace('data-', ''));
					}
				}, 100);
			}),
		);
	}

	/**
	 * Transforms the cursor to be bigger when the element
	 * is hovered according to the data attribute set.
	 *
	 * @param el
	 * @private
	 */
	private addScale(el: HTMLElement): void {
		const defaultScale = el.getBoundingClientRect().height / 50 + 0.3;
		const scale = el.getAttribute('data-cursor-scale') ?? defaultScale > 5 ? 4 : defaultScale;
		this.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
	}

	/**
	 * Removes the scale when the mouse is out.
	 *
	 * @private
	 */
	private removeScale(): void {
		this.el.style.transform = `translate(-50%, -50%) scale(0)`;
	}
}
