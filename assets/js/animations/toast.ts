/**
 * toast.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://www.ainsleyclark.com
 * @author Email: info@ainsleyclark.com
 */

import Toastify from 'toastify-js';

/**
 * Display a toast message.
 *
 * @param message
 * @constructor
 */
export const Toast = (message: string): void => {
	const options = {
		text: `
            <div class="toast-message">${message}</div>
            <div class="toastify-close type-serif">x</div>
        `,
		duration: 3000,
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
	} as Toastify.Options;

	const toast = Toastify(options);

	toast.showToast();

	toast.toastElement
		.querySelector('.toastify-close')
		.addEventListener('click', () => {
			toast.hideToast();
		});
};
