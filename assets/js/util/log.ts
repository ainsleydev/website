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
	static readonly prefix = Params.brandName;

	/**
	 * Log a console error with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static error(message: unknown, ...args: unknown[]) {
		if (!args.length) {
			console.info(`${this.prefix} [ERROR]: ${message}`);
			return;
		}
		console.info(`${this.prefix} [ERROR]: ${message}`, args);
	}

	/**
	 * Log a console warning with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static warn(message: unknown, ...args: unknown[]) {
		if (!args.length) {
			console.info(`${this.prefix} [WARN]: ${message}`);
			return;
		}
		console.info(`${this.prefix} [WARN]: ${message}`, args);
	}

	/**
	 * Log a console info message with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static info(message: unknown, ...args: unknown[]) {
		if (!args.length) {
			console.info(`${this.prefix} [INFO]: ${message}`);
		}
		console.info(`${this.prefix} [INFO]: ${message}`, args);
	}

	/**
	 * Log a console debug message with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static debug(message: unknown, ...args: unknown[]) {
		if (!args.length) {
			console.info(`${this.prefix} [DEBUG]: ${message}`);
			return;
		}
		console.info(`${this.prefix} [DEBUG]: ${message}`, args);
	}
}
