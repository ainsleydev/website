/**
 * form.ts
*
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Log} from "../util/log";
import {Toast} from "../animations/toast";

/**
 * Result of a response from the backend.
 */
export interface Response {
	status: number
	data: any
	message: string
	error: boolean
}

/**
 * AdminAjax
 */
export abstract class Form {

	/**
	 * The associated with the class.
	 */
	form: HTMLFormElement

	/**
	 * The submit button associated with the form.
	 */
	button: HTMLButtonElement

	/**
	 * The validation class for validating fields.
	 */
	validation: any

	/**
	 * The form name associated with the DOM element.
	 */
	formName: string

	/**
	 * Endpoint is the API route to send the form
	 * data to.
	 */
	endpoint: string

	/**
	 * Creates a new form.
	 *
	 * @param buttonSelector
	 * @param endpoint
	 * @protected
	 */
	protected constructor(buttonSelector: string, endpoint: string) {
		this.endpoint = endpoint;

		// Assign the button from the selector.
		const btn = document.querySelector<HTMLButtonElement>(buttonSelector);
		if (!btn) {
			return;
		}

		// Find the closest form.
		const form = btn.closest("form");
		if (!form) {
			Log.error(`Button missing from: ${buttonSelector}`);
			return;
		}

		this.button = btn;
		this.form = form;
		// this.validation = new Validation();
		this.formName = this.getFormName();

		btn.addEventListener("click", e => {
			e.preventDefault();
			this.send();
		}, true);
	}

	/**
	 * The send callback of the class.
	 */
	abstract send(): void|Promise<any>

	/**
	 * Fetch sends the form data to the API.
	 *
	 * @param action
	 * @param data
	 * @param params
	 * @returns Promise<Response>
	 */
	fetch(data?: FormData, params?: URLSearchParams, formName?: string): Promise<Response> {
		this.addButtonLoading();

		if (!this.isValid()) {
			this.removeButtonLoading();
			Log.warn("Validation failed for " + this.formName);
			return Promise.reject(<Response>{message: "Validation failed", status: 400});
		}

		if (!data) {
			data = new FormData();
		}

		const options = <RequestInit>{
			method: "POST",
			body: data,
		}

		let url = "/api/contact";
		if (params) {
			url += "?" + params
		}

		return fetch(url, options)
			.then(res => res.json())
			.then(res => Promise.resolve(<Response>res))
			.then(data => data.error ? Promise.reject(<Response>data) : Promise.resolve(<Response>data))
			.catch(err => Promise.reject(<Response>err))
			.finally(() => this.removeButtonLoading());
	}

	/**
	 * Retrieves all the form data from a given form.
	 *
	 * @returns FormData
	 */
	getValues(): FormData {
		const data = new FormData();
		this.form.querySelectorAll<HTMLInputElement>("input, textarea").forEach(input => {
			let value;
			if (input.type === 'checkbox') {
				value = input.checked;
			} else if (input.type === 'file') {
				// @ts-ignore
				value = input.files[0];
			} else {
				value = input.value;
			}
			data.append(input.name, value);
		});
		data.append('form-url', window.location.href);
		return data;
	}

	/**
	 * Determines if the form has any errors before
	 * proceeding.
	 */
	protected isValid(): boolean {
		if (!this.validation) {
			return true;
		}
		return this.validation.validate(this.form);
	}

	/**
	 * Add the button loading class.
	 */
	protected addButtonLoading(): void {
		if (this.button) {
			this.button.classList.add("btn-loading");
		}
	}

	/**
	 * Remove the button loading class.
	 */
	protected removeButtonLoading(): void {
		if (this.button) {
			this.button.classList.remove("btn-loading");
		}
	}

	/**
	 * Obtains the form name.
	 *
	 * @protected
	 */
	protected getFormName(): string {
		const defaultName = "Form",
			input = <HTMLFormElement>this.form.querySelector("input[name='form-name']");
		if (!input || input.value === '') {
			return defaultName;
		}
		return input.value;
	}

	/**
	 * Handler for when a form is not valid.
	 *
	 * @protected
	 */
	protected failValidation(): void {
		Log.warn("Validation failed for " + this.formName);
		Toast("Validation failed");
		this.removeButtonLoading();
	}
}
