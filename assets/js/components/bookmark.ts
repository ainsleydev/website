/**
 * bookmark.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Toast } from '../animations/toast';

/**
 * Bookmark - Displays a message when a user presses
 * a bookmark button.
 *
 * @constructor
 */
export const bookmark = (): void => {
	document.querySelectorAll('[data-bookmark]').forEach((bookmark) => {
		bookmark.addEventListener('click', () => {
			const userAgent = navigator.userAgent.toLowerCase();
			Toast('Press ' + (userAgent.indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
		});
	});
};
