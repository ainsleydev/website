/**
 * namespace.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Elements } from '../util/els';

/**
 * Obtains the Barba namespace.
 *
 * @constructor
 */
export const namespace = (container?: Element): string => {
	if (!container) {
		return document.querySelector('.barba-container').getAttribute('data-barba-namespace');
	}
	return container.getAttribute('data-barba-namespace');
};
