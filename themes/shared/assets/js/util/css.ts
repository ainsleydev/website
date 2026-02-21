/**
 * css.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * Determines if the device is touch.
 */
export const IsTouchDevice = (): boolean => {
	return !document.documentElement.classList.contains('no-touchevents');
};
