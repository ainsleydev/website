/**
 * cursor.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';
import { IsTouchDevice } from '../util/css';

// The Angles interface defines the shape of an array containing two
// numbers representing the X and Y angles of a 2D point.
interface Angles {
	x: number;
	y: number;
}

/**
 * Calculate the angle to rotate.
 *
 * @returns The x and y angles.
 * @param arrow
 */
const calculateArrowAngles = (arrow: Element): Angles => {
	const rotation = arrow.getAttribute('data-arrow-rotation') ?? '45',
		radians = parseInt(rotation) * (Math.PI / 180);
	return {
		x: -Math.round(Math.sin(radians) * 100),
		y: -Math.round(Math.cos(radians) * -100),
	};
};

/**
 * Arrow is responsible for animating an arrow when it is hovered over by the mouse.
 * It calculates the angle of rotation based on data attributes, and uses
 * CSS transforms to display a hidden element when the arrow is
 * hovered over.
 */
class Arrow {
	/**
	 * Initialises the arrow elements.
	 *
	 * @constructor
	 */
	constructor() {
		document.querySelectorAll('.arrow-hover').forEach((arrow) => {
			this.initArrow(arrow as HTMLElement);
		});
	}

	/**
	 * Initialize the arrow hover animation.
	 *
	 * @void
	 */
	private initArrow(arrow: HTMLElement): void {
		const visible = arrow.querySelector('.arrow-hover-visible') as HTMLElement,
			hidden = arrow.querySelector('.arrow-hover-hidden') as HTMLElement;

		if (!visible || !hidden) {
			Log.error('Arrow - No visible or hidden element in arrow hover element.');
			return;
		}

		if (IsTouchDevice()) {
			return;
		}

		const angles = calculateArrowAngles(arrow);
		this.transform(hidden, angles, 0);
		this.addEventListeners(arrow, visible, hidden, angles);
	}

	/**
	 * Transforms the element based of the angels and opacity.
	 *
	 * @param element - The element to transform.
	 * @param angles - The x and y angles.
	 * @param opacity - The opacity of the element.
	 */
	private transform(element: HTMLElement, angles: Angles, opacity: number): void {
		element.style.transform = `translate(${angles.x}%, ${angles.y}%)`;
		element.style.opacity = opacity.toString();
	}

	/**
	 * Add mouse event listeners to the arrow element.
	 *
	 * @param arrow - The arrow element to add event listeners to.
	 * @param visible - The visible element.
	 * @param hidden - The hidden element.
	 * @param angles - The x and y angles.
	 */
	private addEventListeners(arrow: Element, visible: HTMLElement, hidden: HTMLElement, angles: Angles): void {
		arrow.addEventListener('mouseover', () => {
			this.transform(visible, { x: -angles.x, y: -angles.y }, 0);
			this.transform(hidden, { x: 0, y: 0 }, 1);
		});
		arrow.addEventListener('mouseleave', () => {
			this.transform(visible, { x: 0, y: 0 }, 1);
			this.transform(hidden, angles, 0);
		});
	}
}

export { Arrow, calculateArrowAngles, Angles };
