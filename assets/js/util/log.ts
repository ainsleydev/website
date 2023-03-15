/**
 * log.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Params } from '../params';

/**
 * Log is responsible for logging to the stdout
 * within the website.
 */
export class Log {
	/**
	 * Prefix is teh string prefixed before the
	 * Log message.
	 */
	static readonly prefix = 'ainsley.dev';

	/**
	 * Log a console error with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static error(message: unknown, ...args: unknown[]) {
		console.error(`${this.prefix} Error: ${message}`, args);
	}

	/**
	 * Log a console warning with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static warn(message: unknown, ...args: unknown[]) {
		console.error(`${this.prefix} Warning: ${message}`, args);
	}

	/**
	 * Log a console info message with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static info(message: unknown, ...args: unknown[]) {
		console.info(`${this.prefix} Info: ${message}`, args);
	}

	/**
	 * Log a console debug message with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static debug(message: unknown, ...args: unknown[]) {
		if (!Params.appDebug) {
			return;
		}
		console.info(`${this.prefix} Debug: ${message}`, args);
	}
}
