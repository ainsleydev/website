/**
 * api.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Api, ApiConfig } from '../../../gen/sdk/API';

// Construct a configuration for the API which details
// the base URL.
const config = {
	baseUrl: 'http://localhost:5000/api/v1',
	baseApiParams: {
		headers: {
			token: 'my-token',
		},
	},
} as ApiConfig;

// Create an API SDK.
const api = new Api(config);

// Set headers after the API has been created.
api.setHeaders({
	token: 'my-token',
});
