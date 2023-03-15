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
	appEnv: string;
	appDebug: string;
	brandName: string;
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
	appEnv: params.appEnv,
	appDebug: params.appDebug,
	brandName: params.brandName,
	isProduction: params.isProduction,
	apiKey: params.apiKey,
	googleMapsAPIKey: params.googleMapsAPIKey,
	vercelAnalyticsID: params.vercelAnalyticsID,
} as ParamsType;
