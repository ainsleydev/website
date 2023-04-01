/**
 * sentry.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import { Params } from '../params';

/**
 * Initialise Sentry.
 */
export const sentry = (): void => {
	Sentry.init({
		dsn: Params.sentryJsURL,
		integrations: [new BrowserTracing()],
		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
}

