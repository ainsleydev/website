/**
 * toast.ts
 *
 * @remarks
 * This module exports a single function, Toast, which displays a toast message.
 * It uses the Toastify library to create and display the toast.
 *
 * @author Ainsley Clark
 * @author URL:   https://www.ainsleyclark.com
 * @author Email: info@ainsleyclark.com
 */

import { Elements } from '../util/els';
import Toastify, { Options } from 'toastify-js';

/**
 * Display a toast message.
 *
 * @param message The message to display in the toast.
 */
export const Toast = (message: string): void => {
	// Define the options for the toast.
	const options: Options = {
		text: `
            <div class="toast-message">${message}</div>
            <div class="toastify-close type-serif">x</div>
        `,
		duration: 3000,
		selector: Elements.Main,
		newWindow: true,
		close: true,
		className: 'toastify-error',
		gravity: 'bottom', // `top` or `bottom`
		position: 'right', // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		escapeMarkup: false,
		offset: {
			y: '3vw',
			x: '3vw',
		},
	};

	// Create the toast with the given options.
	const toast = Toastify(options);

	// Show the toast.
	toast.showToast();

	// Add an event listener to the close button, so that clicking it hides the toast.
	toast.toastElement.querySelector('.toastify-close').addEventListener('click', () => {
		toast.hideToast();
	});
};
