/**
 * plausible.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * Plausible - Reports a goal to Plausible.io
 *
 * @constructor
 */
export const Plausible = (goal: string): void => {
	if (window.plausible) {
		window.plausible(goal);
	}
};
