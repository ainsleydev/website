/**
 * scroll.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

interface WayPointOptions {
	callback?: (el: Element) => void;
	rootMargin?: string;
	threshold?: number | number[];
}

export function WayPoint(selector: string, options: WayPointOptions = {}) {
	let els = document.querySelectorAll(selector);
	els = Array.from(els);
	els.forEach((el) => {
		addObserver(el, options);
	});
}

function addObserver(el, options) {
	// Check if `IntersectionObserver` is supported
	if (!('IntersectionObserver' in window)) {
		// Simple fallback
		// The animation/callback will be called immediately so
		// the scroll animation doesn't happen on unsupported browsers
		if (options.cb) {
			options.cb(el);
		} else {
			entry.target.classList.add('active');
		}
		// We don't need to execute the rest of the code
		return;
	}
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (options.cb) {
					options.cb(el);
				} else {
					entry.target.classList.add('active');
				}
				observer.unobserve(entry.target);
			}
		});
	}, options);
	observer.observe(el);
}
