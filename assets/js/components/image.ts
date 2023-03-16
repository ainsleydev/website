/**
 * image.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * Lazy - Adds lazy-loaded class to lazy images once loaded.
 *
 * @constructor
 */
export const lazyImages = (): void => {
	document.querySelectorAll('.lazy-animate').forEach((lazy) => {
		lazy.addEventListener('load', () => {
			lazy.classList.add('lazy-loaded');
		});
	});
}
