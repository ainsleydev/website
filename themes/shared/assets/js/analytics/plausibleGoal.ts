/**
 * plausible.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

/**
 * PlausiblePageView - Reports a page-view to Plausible.io
 *
 * @constructor
 */
export const PlausiblePageView = () => {
	if (typeof window.plausible === 'function') {
		const url = window.location.href;
		Log.debug('Triggering Plausible page-view with URL:', url);
		window.plausible('pageview', { u: url });
	}
};

/**
 * PlausibleGoal - Reports a goal to Plausible.io
 *
 * @constructor
 */
export const PlausibleGoal = (goal: string): void => {
	if (window.plausible) {
		window.plausible(goal);
	}
};

/**
 * Triggers a query param goal for plausible.
 */
export const plausibleQueryParamGoal = () => {
	const QUERY_PARAM_GOALS = [{ param: 'qr', name: 'QR Code' }];
	const url = new URL(window.location.href);
	QUERY_PARAM_GOALS.forEach((goal) => {
		if (url.searchParams.has(goal.param)) {
			PlausibleGoal(goal.name);
			Log.info('Triggering query param Plausible goal:', goal.name);
			return;
		}
	});
};
