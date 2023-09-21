/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

// Copyright 2023 ainsley.dev LTD. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

export interface HTTPResponse {
	data: any;
	/** @example "User formatted message from the API" */
	message: string;
}

export interface HTTPError {
	/** @example "Error, unable to authenticate" */
	message: string;
	/** @example "error_code" */
	code: string;
	/** @example "error" */
	error: string;
	/** @example "Function.Method" */
	operation: string;
}

/**
 * Message and attributes from the contact form.
 */
export interface ContactFormRequest {
	/** The message from the user. */
	message: string;
	/** The message from the user. */
	honeypot: string;
}

/**
 * The message sent back to the user upon successful submission.
 */
export type ContactFormResponse = string;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = 'https://ainsley.dev/api';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	public baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setHeaders = (data: any) => {
		this.baseApiParams.headers = data;
	};

	private setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	private encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	private addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	private addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
		return keys
			.map((key) =>
				Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key),
			)
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
						? JSON.stringify(property)
						: `${property}`,
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
			...requestParams,
			headers: {
				...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
				...(requestParams.headers || {}),
			},
			signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
			body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
		}).then(async (response) => {
			const r = response as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data;
		});
	};
}

/**
 * @title ainsley.dev API
 * @version 1.0.0
 * @license BSD 3-Clause License (https://github.com/ainsleyclark/ainsley.dev/blob/master/LICENSE)
 * @termsOfService https://ainsley.dev/terms/
 * @baseUrl https://ainsley.dev/api
 * @contact ainsley.dev Team <hello@ainsley.dev> (https://swagger.io)
 *
 * API Spec for the backend of ainsley.dev
 */
export class SDK<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	forms = {
		/**
		 * @name SendContactForm
		 * @request POST:/forms/contact/
		 * @secure
		 * @description Posts a new form submission from to contact page.
		 */
		sendContactForm: (data: ContactFormRequest, params: RequestParams = {}) =>
			this.request<HTTPResponse, HTTPError>({
				path: `/forms/contact/`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	};
	credentials = {
		/**
		 * @name GetCredentials
		 * @request GET:/credentials/
		 * @secure
		 * @description Obtains credentials from ainsley.dev
		 */
		getCredentials: (params: RequestParams = {}) =>
			this.request<ContactFormResponse, any>({
				path: `/credentials/`,
				method: 'GET',
				secure: true,
				...params,
			}),
	};
}
