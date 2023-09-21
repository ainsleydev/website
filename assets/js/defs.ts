/**
 * defs.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Core } from '@barba/core/dist/core/src/core';

/**
 * Global TS types.
 */
declare global {
	/**
	 * Extension of the window object.
	 */
	interface Window {
		plausible: (args: string, p?: { u: string }) => unknown;
		barba: Core;
	}

	/**
	 * Environment variables passed in from Hugo.
	 */
	interface ParamTypes {
		appEnv: string;
		appDebug: boolean;
		brandName: string;
		isProduction: boolean;
		apiKey: string;
		googleMapsAPIKey: string;
		vercelAnalyticsID: string;
		sentryURL: string;
	}
}
