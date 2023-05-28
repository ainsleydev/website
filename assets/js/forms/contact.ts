/**
 * contact.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Form } from './form';
import { ContactFormRequest } from '../api/SDK';
import { API, HandleAPIError } from '../api/api';
import { Log } from '../util/log';
import { Plausible } from '../analytics/plausible';

/**
 * ContactForm sends the payload of the message on /contact
 * to the API.
 */
export class ContactForm extends Form {
	/**
	 * Create a new Contact form.
	 */
	constructor() {
		super('#ac-contact');
	}

	/**
	 * Send
	 */
	send(): void {
		Plausible('Contact Form');
		Plausible('Contact Form Click');

		const request = {
			message: this.getValue('message'),
			honeypot: this.getValue('first-name'),
		} as ContactFormRequest;
		this.addButtonLoading();

		API.forms
			.sendContactForm(request)
			.then(() => {
				Log.info('Contact - Successfully sent contact form');
				Plausible('Contact Form Success');
				window.barba.go('/thank-you/');
			})
			.catch((err) => {
				this.removeButtonLoading();
				Plausible('Contact Form Failure');
				HandleAPIError(err);
			});
	}
}
