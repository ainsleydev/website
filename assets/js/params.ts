/**
 * params.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import * as params from '@params';

/**
 * Type of parameters passed in from Hugo.
 */
export interface ParamsType {
	apiKey: string;
	googleMapsAPIKey: string;
}

/**
 * Dictionary of key value pares from Hugo.
 * @see layouts/partials/head/_js-params.html
 */
export const Params = {
	apiKey: params.apiKey,
	googleMapsAPIKey: params.googleMapsAPIKey,
} as ParamsType;
