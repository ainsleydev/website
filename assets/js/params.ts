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
	googleMapsAPIKey: string;
}

/**
 * Dictionary of key value pares from Hugo.
 * @see layouts/partials/head/_js-params.html
 */
export const Params = {
	googleMapsAPIKey: params.googleMapsAPIKey,
} as ParamsType;
