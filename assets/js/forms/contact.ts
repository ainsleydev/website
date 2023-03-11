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
		super
			.fetch(super.getValues(), null, 'Contact Form')
			.then(() => {
				this.form.classList.add('form-success');
				Toast('Successfully sent email');
			})
			.catch((err) => {
				Log.error(err);
				Toast(err.message);
			});
	}
}

/**
 * Recaptcha
 */
(<any>window).onloadCallback = () => {
	grecaptcha.render('ac-contact', {
		sitekey: 'YOUR_RECAPTCHA_SITEKEY_HERE',
		badge: 'inline',
		type: 'image',
		size: 'invisible',
		callback: submit,
	});
};

const submit = () => {
	console.log('hello');
};
