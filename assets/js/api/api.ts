/**
 * api.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import { ApiConfig, HTTPError, HTTPResponse, HttpResponse, SDK } from './SDK';
import { Params } from '../params';
import { Log } from '../util/log';
import { Toast } from '../animations/toast';

// Construct a configuration for the API which details
// the base URL.
const config = {
	baseUrl: '/api/',
	baseApiParams: {
		headers: {
			token: Params.apiKey,
		},
	},
} as ApiConfig;

// Create an API SDK.
const API = new SDK(config);

// Set headers after the API has been created.
API.setHeaders({
	'X-API-KEY': Params.apiKey,
});

/**
 * Handles an API error response by logging the result
 * and displaying a message to the user.
 *
 * @param response
 * @constructor
 */
const HandleAPIError = (response: HttpResponse<HTTPError>): void => {
	const err = response.error as HTTPError;
	Log.error(`${err.error}, Message: ${err.message}, Code: ${err.code}, Operation: ${err.operation}`);
	Toast(err.message);
};

export { API, HandleAPIError };
