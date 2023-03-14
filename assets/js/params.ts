/**
 * params.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

// @ts-ignore
import * as params from '@params';

/**
 * Type of parameters passed in from Hugo.
 */
export interface ParamsType {
	isProduction: boolean;
	apiKey: string;
	googleMapsAPIKey: string;
	vercelAnalyticsID: string;
}

/**
 * Dictionary of key value pares from Hugo.
 * @see layouts/partials/head/_js-params.html
 */
export const Params = {
	isProduction: params.isProduction,
	apiKey: params.apiKey,
	googleMapsAPIKey: params.googleMapsAPIKey,
	vercelAnalyticsID: params.vercelAnalyticsID,
} as ParamsType;
