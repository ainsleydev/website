/**
 * scroll.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * The class that is added to the WayPoint when no call back
 * is defined.
 */
const DefaultActiveClass = '.active';

/**
 * WayPointOptions defines the options used for attaching
 * an element to a scroll event.
 */
interface WayPointOptions {
	callback?: (el: Element) => void;
	rootMargin?: string;
	threshold?: number | number[];
	class?: string;
}

/**
 * Triggers a scroll event using the IntersectionObserver.
 *
 * @param selector
 * @param options
 * @constructor
 */
export function WayPoint(selector: string | Element | Element[], options: WayPointOptions = {}) {
	if (typeof selector === 'string') {
		Array.from(document.querySelectorAll(selector)).forEach((el) => addObserver(el, options));
		return;
	}
	if (Array.isArray(selector)) {
		selector.forEach((el) => addObserver(el, options));
		return;
	}
	addObserver(selector, options);
}

/**
 * Adds the observer to the element.
 *
 * @param el
 * @param options
 */
function addObserver(el: Element, options: WayPointOptions) {
	// Check if `IntersectionObserver` is supported
	if (!('IntersectionObserver' in window)) {
		// Simple fallback
		// The animation/callback will be called immediately so
		// the scroll animation doesn't happen on unsupported browsers
		if (options.callback) {
			options.callback(el);
		}
		return;
	}
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (options.callback) {
					options.callback(el);
				} else {
					entry.target.classList.add(options.class ?? DefaultActiveClass);
				}
				observer.unobserve(entry.target);
			}
		});
	}, options);
	observer.observe(el);
}
