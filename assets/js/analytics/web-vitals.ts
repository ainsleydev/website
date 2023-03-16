/**
 * web-vitals.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';
import { Log } from '../util/log';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
	return 'connection' in navigator && navigator['connection'] && 'effectiveType' in navigator['connection']
		? navigator['connection']['effectiveType']
		: '';
}

/**
 * @param {import("web-vitals").Metric} metric
 * @param {{ params: { [s: string]: any; } | ArrayLike<any>; path: string; analyticsId: string; debug: boolean; }} options
 */
function sendToAnalytics(metric, options) {
	if (!metric) {
		Log.error('Vitals - Metric not found');
		return;
	}

	const body = {
		dsn: options.analyticsId, // qPgJqYH9LQX5o31Ormk8iWhCxZO
		id: metric.id, // v2-1653884975443-1839479248192
		page: window.location.pathname,
		href: window.location.href, // https://{my-example-app-name-here}/blog/my-test
		event_name: metric.name, // TTFB
		value: metric.value.toString(), // 60.20000000298023
		speed: getConnectionSpeed(), // 4g
	};

	if (options.debug) {
		Log.debug('[Analytics]', metric.name, JSON.stringify(body, null, 2));
	}

	const blob = new Blob([new URLSearchParams(body).toString()], {
		// This content type is necessary for `sendBeacon`
		type: 'application/x-www-form-urlencoded',
	});
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true,
		});
}

export function WebVitals(options) {
	if (!options.enable) {
		return;
	}
	try {
		getFID((metric) => sendToAnalytics(metric, options));
		getTTFB((metric) => sendToAnalytics(metric, options));
		getLCP((metric) => sendToAnalytics(metric, options));
		getCLS((metric) => sendToAnalytics(metric, options));
		getFCP((metric) => sendToAnalytics(metric, options));
	} catch (err) {
		console.error('[Analytics]', err);
	}
}
