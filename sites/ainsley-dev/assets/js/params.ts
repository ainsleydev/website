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
 * Dictionary of key value pares from Hugo.
 *
 * @see layouts/partials/head/_js-params.html
 */
export const Params = {
	appEnv: params.appEnv,
	appDebug: params.appDebug === 'true',
	brandName: params.brandName,
	isProduction: params.isProduction,
	apiKey: params.apiKey,
	googleMapsAPIKey: params.googleMapsAPIKey,
	vercelAnalyticsID: params.vercelAnalyticsID,
	sentryURL: params.sentryURL,
} as ParamTypes;
