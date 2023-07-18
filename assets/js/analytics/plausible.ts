/**
 * plausible.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';

/**
 * Plausible - Reports a goal to Plausible.io
 *
 * @constructor
 */
export const Plausible = (goal: string): void => {
	if (window.plausible) {
		window.plausible(goal);
	}
};

/**
 * Triggers a query param goal for plausible.
 */
export const plausibleQueryParamGoal = () => {
	const QUERY_PARAM_GOALS = [
		{ param: 'qr', name: 'QR Code' },
		{ param: 'test', name: 'Test' },
	];
	const url = new URL(window.location.href);
	QUERY_PARAM_GOALS.forEach((goal) => {
		if (url.searchParams.has(goal.param)) {
			Plausible(goal.name);
			Log.info('Triggering query param Plausible goal: ' + goal.name);
			return;
		}
	});
};
