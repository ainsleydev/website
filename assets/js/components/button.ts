/**
 * button.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * ButtonGoBack - Navigates to the previous page
 * when a go back button is pressed.
 *
 * @constructor
 * @returns void
 */
export const buttonGoBack = (): void => {
	document.querySelectorAll('[data-go-back]').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			history.back();
		});
	});
};
