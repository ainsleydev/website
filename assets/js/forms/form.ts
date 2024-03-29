/**
 * form.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

/**
 * Result of a response from the backend.
 */
export interface Response {
	status: number;
	data: unknown;
	message: string;
	error: boolean;
}

/**
 * API Form.
 */
export abstract class Form {
	/**
	 * The form element.
	 */
	form: HTMLFormElement;

	/**
	 * The submit button associated with the form.
	 */
	button: HTMLButtonElement;

	/**
	 * The form name used to distinguish what form is being
	 * sent to the API.
	 */
	formName: string;

	/**
	 * Creates a new form.
	 *
	 * @param buttonSelector
	 * @protected
	 */
	protected constructor(buttonSelector: string) {
		// Assign the button from the selector.
		const btn = document.querySelector<HTMLButtonElement>(buttonSelector);
		if (!btn) {
			return;
		}

		// Find the closest form.
		const form = btn.closest('form');
		if (!form) {
			Log.error(`Form - No form found from button: ${buttonSelector}`);
			return;
		}

		this.button = btn;
		this.form = form;
		this.formName = this.getFormName();

		btn.addEventListener(
			'click',
			(e) => {
				e.preventDefault();
				this.send();
			},
			true,
		);
	}

	/**
	 * The send callback of the class.
	 */
	abstract send(): void | Promise<Response>;

	/**
	 * Retrieves a singular value from the form.
	 *
	 * @param name
	 */
	getValue(name: string): unknown {
		const el = this.form.querySelector(`[name=${name}]`) as HTMLFormElement;
		if (!el) {
			Log.error('Form - No form value found with the name: ' + name);
			return;
		}
		return el.value;
	}

	/**
	 * Add the button loading class.
	 */
	protected addButtonLoading(): void {
		if (this.button) {
			this.button.classList.add('btn-loading');
		}
	}

	/**
	 * Remove the button loading class.
	 */
	protected removeButtonLoading(): void {
		if (this.button) {
			this.button.classList.remove('btn-loading');
		}
	}

	/**
	 * Obtains the form name.
	 *
	 * @protected
	 */
	protected getFormName(): string {
		const defaultName = 'Form',
			input = <HTMLFormElement>this.form.querySelector("input[name='form-name']");
		if (!input || input.value === '') {
			return defaultName;
		}
		return input.value;
	}
}
