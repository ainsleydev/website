/**
 * cursor.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import { Log } from '../util/log';

// The Angles interface defines the shape of an array containing two
// numbers representing the X and Y angles of a 2D point.
interface Angles {
	x: number;
	y: number;
}

/**
 * Arrow is responsible for animating an arrow when it is hovered over by the mouse.
 * It calculates the angle of rotation based on data attributes, and uses
 * CSS transforms to display a hidden element when the arrow is
 * hovered over.
 */
export class Arrow {
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
		const rotation = arrow.getAttribute('data-arrow-rotation') ?? '',
			visible = arrow.querySelector('.arrow-hover-visible') as HTMLElement,
			hidden = arrow.querySelector('.arrow-hover-hidden') as HTMLElement;

		if (!visible || !hidden) {
			Log.error('No visible or hidden element in arrow hover element.');
			return;
		}
		if (!rotation) {
			return;
		}

		const angles = this.calculateAngles(parseInt(rotation));
		this.transform(hidden, angles, 1);
		this.addEventListeners(arrow, visible, hidden, angles);
	}

	/**
	 * Calculate the angle to rotate.
	 *
	 * @param angle - The angle to rotate.
	 * @returns The x and y angles.
	 */
	private calculateAngles(angle: number): Angles {
		const radians = angle * (Math.PI / 180);
		return {
			x: -Math.round(Math.sin(radians) * 100),
			y: -Math.round(Math.cos(radians) * -100),
		};
	}

	/**
	 * Transforms the element based of the angels and opacity.
	 *
	 * @param element
	 * @param angles
	 * @param opacity
	 */
	private transform(element: HTMLElement, angles: Angles, opacity: number): void {
		element.style.transform = `translate(${angles.x}%, ${angles.y}%)`;
		element.style.opacity = opacity.toString();
	}

	/**
	 * Add event listeners to the arrow element.
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
