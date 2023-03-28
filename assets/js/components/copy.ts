/**
 * copy.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';
import { Toast } from '../animations/toast';

/**
 * CopyToClipboard - Writes text to the navigators clipboard
 * and displays a message to the user.
 *
 * @constructor
 * @returns void
 */
export const copyToClipboard = (): void => {
	document.querySelectorAll('[data-clipboard]').forEach((clip) => {
		const text = clip.getAttribute('data-clipboard-text');
		if (!text || text === '') {
			Log.error('Clipboard - Text is empty [data-clipboard-text] for el: ' + clip);
			return;
		}
		clip.addEventListener('click', () => {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					Log.info('Clipboard - Copied text to clipboard');
					const message = clip.getAttribute('data-clipboard-message') ?? 'Copied text to clipboard';
					Toast(message);
				})
				.catch((err) => {
					Log.error('Clipboard - Failed to copy to clipboard: ' + err);
				});
		});
	});
};
