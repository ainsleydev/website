/**
 * api.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import { ApiConfig, SDK } from './SDK';
import { Params } from '../params';

// Construct a configuration for the API which details
// the base URL.
const config = {
	baseUrl: '/api/v1',
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
	token: Params.apiKey,
});

export default API;
