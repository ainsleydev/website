/**
 * contact.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Form } from './form';
import { Toast } from '../animations/toast';
import { Log } from '../util/log';
import { ContactFormRequest } from '../api/SDK';
import API from '../api/api';

const CONTACT_BUTTON_ID = '#ac-contact';

export class ContactForm extends Form {
	/**
	 * Create a new Contact form.
	 */
	constructor() {
		super(CONTACT_BUTTON_ID, '/api/contact/');
	}

	/**
	 * Send
	 */
	send(): void {
		const request = {
			message: '',
			honeypot: '',
		} as ContactFormRequest;

		API.forms
			.sendContactForm(request)
			.then((r) => console.log(r))
			.catch((err) => console.log(err));

		// super
		// 	.fetch(super.getValues(), null, 'Contact Form')
		// 	.then(() => {
		// 		this.form.classList.add('form-success');
		// 		Toast('Successfully sent email');
		// 	})
		// 	.catch((err) => {
		// 		Log.error(err);
		// 		Toast(err.message);
		// 	});
	}
}
