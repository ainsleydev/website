/**
 * log.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

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
	 */
	static error(message: unknown) {
		console.error(`${this.prefix} Error: ${message}`);
	}

	/**
	 * Log a console warning with a prefix.
	 *
	 * @param message
	 */
	static warn(message: unknown) {
		console.error(`${this.prefix} Warning: ${message}`);
	}

	/**
	 * Log a console info message with a prefix.
	 *
	 * @param message
	 */
	static info(message: unknown) {
		console.info(`${this.prefix} Info: ${message}`);
	}
}
