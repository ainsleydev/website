/**
 * cursor.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

// Handler defines a singular event added by the cursor.
// It's used for destroying mouse events.
interface Handler {
	element: Element;
	function: EventListener;
	event: string;
}

/**
 * Cursor adds animations to the mouse cursor.
 */
export class Cursor {
	/**
	 * The DOM selector for the cursor.
	 *
	 * @public
	 */
	public readonly elementSelector = '.cursor-element';

	/**
	 * The DOM selector for the element.
	 *
	 * @public
	 */
	public readonly selector = '.cursor';

	/**
	 * Handlers is the member array that contains function
	 * references to events created by the instance.
	 *
	 * @protected
	 */
	protected handlers: Handler[] = [];

	/**
	 * The cursor HTML element.
	 *
	 * @private
	 */
	private readonly el: HTMLDivElement;

	/**
	 * Initialises the cursor element.
	 *
	 * @constructor
	 */
	constructor() {
		const el = document.querySelector(this.selector);
		if (!el) {
			Log.error(`Cursor - No ${this.selector} element found in the DOM`);
			return;
		}
		this.el = el as HTMLDivElement;
		this.attachMouseMove();
		document.querySelectorAll<HTMLElement>(this.elementSelector).forEach((el) => this.attachElementHandlers(el));
	}

	/**
	 * Destroy removes all active classes and styles
	 * from the cursor element.
	 */
	public destroy(): void {
		Log.debug('Cursor - Destroying & removing event handlers');
		this.el.style.transform = '';
		this.removeHandlers();
		setTimeout(() => {
			this.el.classList.forEach((c) => {
				if (c == 'cursor') {
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
	 * @param el The DOM element to attach handlers to.
	 * @private
	 */
	private attachElementHandlers(el: HTMLElement): void {
		const classes = el.getAttributeNames().filter((a) => a.startsWith('data-cursor'));

		const mouseMoveHandler = this.mouseMove.bind(this, classes, el);
		el.addEventListener('mousemove', mouseMoveHandler);
		this.handlers.push({
			element: el,
			function: mouseMoveHandler,
			event: 'mousemove',
		} as Handler);

		const mouseLeaveHandler = this.mouseLeave.bind(this, classes);
		el.addEventListener('mouseleave', mouseLeaveHandler);
		this.handlers.push({
			element: el,
			function: mouseLeaveHandler,
			event: 'mouseleave',
		} as Handler);
	}

	/**
	 * Mouse move handler for an element.
	 *
	 * @param classes
	 * @param el
	 * @private
	 */
	private mouseMove(classes: string[], el: HTMLElement): void {
		classes.forEach((c) => {
			this.addScale(el);
			this.el.classList.add('cursor-active');
			this.el.classList.add(c.replace('data-', ''));
		});
	}

	/**
	 * Mouse leave event for the cursor.
	 *
	 * @param classes
	 * @private
	 */
	private mouseLeave(classes: string[]): void {
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
		});
	}

	/**
	 * Removes all event listeners from the elements
	 * that have been assigned.
	 *
	 * @private
	 */
	private removeHandlers(): void {
		this.handlers.forEach((handler) => {
			handler.element.removeEventListener(handler.event, handler.function);
		});
	}

	/**
	 * Transforms the cursor to be bigger when the element
	 * is hovered according to the data attribute set.
	 *
	 * @param el
	 * @private
	 */
	private addScale(el: HTMLElement): void {
		const scaleAttr = el.getAttribute('data-cursor-scale');
		let scale = el.getBoundingClientRect().height / 50 + 0.5;
		if (scaleAttr) {
			scale = parseFloat(scaleAttr);
		} else {
			scale = scale > 5 ? 4 : scale;
		}
		this.el.style.transform = `translate(-50%, -50%) scale(${scale.toString()})`;
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
