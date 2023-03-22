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

const CONTACT_BUTTON_ID = '#ac-contact';

export class ContactForm extends Form {
	/**
	 * Create a new Contact form.
	 */
	constructor() {
		super(CONTACT_BUTTON_ID);
	}

	/**
	 * Send
	 */
	send(): void {
		const request = {
			message: this.getValue('message'),
			honeypot: this.getValue('first-name'),
		} as ContactFormRequest;
		this.addButtonLoading();
		API.forms
			.sendContactForm(request)
			.then(() => {
				Log.info('Contact - Successfully sent contact form');
				window.barba.go('/thank-you/');
			})
			.catch((err) => {
				this.removeButtonLoading();
				HandleAPIError(err);
			});
	}
}
