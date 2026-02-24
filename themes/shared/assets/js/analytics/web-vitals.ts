/**
 * web-vitals.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { getCLS, getFCP, getFID, getLCP, getTTFB, Metric } from 'web-vitals';
import { Log } from '../util/log';

// The URL where the web vital metrics will be sent to.
const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

/**
 * Get the connection speed of the user.
 *
 * @returns {string} The effective connection type of the user or an empty string if it is not available.
 */
function getConnectionSpeed(): string {
	if (
		'connection' in navigator &&
		navigator.connection !== null &&
		typeof navigator.connection === 'object' &&
		'effectiveType' in navigator.connection
	) {
		return navigator.connection.effectiveType.toString();
	}
	return '';
}

/**
 * Send a web vital metric to the analytics server.
 *
 * @param {Metric} metric - The web vital metric to send.
 * @param {{ analyticsId: string, debug: boolean }} options - Options for the analytics server request.
 */
function sendToAnalytics(metric: Metric, options: { analyticsId: string; debug: boolean }): void {
	// Check if a metric is available before sending it to the analytics server.
	if (!metric) {
		Log.error('Web Vitals - Metric not found');
		return;
	}

	// Create a JSON object with the necessary data to send to the analytics server.
	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page: window.location.pathname,
		href: window.location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed(),
	};

	// Log the metric data if the debug option is enabled.
	if (options.debug) {
		Log.debug('[Analytics]', metric.name, JSON.stringify(body, null, 2));
	}

	// Create a blob object with the metric data.
	const blob = new Blob([new URLSearchParams(body).toString()], {
		type: 'application/x-www-form-urlencoded',
	});

	// Send the metric data to the analytics server using either sendBeacon or fetch.
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else {
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true,
		})
			.then((res) => {
				Log.debug('Sent analytics with response:', res);
			})
			.catch((err) => {
				Log.error('Could not send analytics', err);
			});
	}
}

/**
 * Get the web vital metrics and send them to the analytics server.
 *
 * @param {{ enable: boolean, analyticsId: string, debug: boolean }} options - Options for the web vital metrics
 */
export function WebVitals(options: { enable: boolean; analyticsId: string; debug: boolean }): void {
	// Check if the web vital metrics are enabled before getting them.
	if (!options.enable) {
		return;
	}

	// Get each web vital metric and send it to the analytics server.
	try {
		getFID((metric) => sendToAnalytics(metric, options));
		getTTFB((metric) => sendToAnalytics(metric, options));
		getLCP((metric) => sendToAnalytics(metric, options));
		getCLS((metric) => sendToAnalytics(metric, options));
		getFCP((metric) => sendToAnalytics(metric, options));
	} catch (err) {
		Log.error('Analytics failed to send', err);
	}
}
