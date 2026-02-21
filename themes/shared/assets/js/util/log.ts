/**
 * log.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Params } from '../params';

enum LogLevel {
	Trace = 'TRACE',
	Debug = 'DEBUG',
	Info = 'INFO',
	Warn = 'WARN',
	Error = 'ERROR',
}

// TODO: Need to flesh this out, see: https://adrianhall.github.io/cloud/2019/06/30/building-an-efficient-logger-in-typescript/

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
			console.error(`${this.prefix} [${LogLevel.Error}]: ${message}`);
			return;
		}
		console.error(`${this.prefix} [${LogLevel.Error}]: ${message}`, args);
	}

	/**
	 * Log a console warning with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static warn(message: unknown, ...args: unknown[]) {
		if (!args.length) {
			console.warn(`${this.prefix} [${LogLevel.Warn}]: ${message}`);
			return;
		}
		console.warn(`${this.prefix} [${LogLevel.Warn}]: ${message}`, args);
	}

	/**
	 * Log a console info message with a prefix.
	 *
	 * @param message
	 * @param args
	 */
	static info(message: unknown, ...args: unknown[]) {
		if (!args.length) {
			console.info(`${this.prefix} [${LogLevel.Info}]: ${message}`);
			return;
		}
		console.info(`${this.prefix} [${LogLevel.Info}]: ${message}`, args);
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
		if (!args.length) {
			console.info(`${this.prefix} [${LogLevel.Debug}]: ${message}`);
			return;
		}
		console.info(`${this.prefix} [${LogLevel.Debug}]: ${message}`, args);
	}
}
