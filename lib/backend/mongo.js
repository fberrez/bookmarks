import mongoose from 'mongoose';

// Maps regrouping listened events
const EVENTS = new Map([
	['OPEN', {event: 'connected', level: 'info'}],
	['DISCONNECTED', {event: 'disconnected', level: 'info'}],
	['ERROR', {event: 'error', level: 'error'}],
	['CLOSE', {event: 'close', level: 'info'}],
	['RECONNECTED', {event: 'reconnected', level: 'info'}],
	['RECONNECTED_FAILED', {event: 'reconnectedFailed', level: 'error'}],
]);

class Mongo {
	/**
   * @constructor
   * @param {object} options connection options
   * @param {object} logger logger to use
   */
	constructor(options, logger = console) {
		this.options = options;
		this.logger = logger;
	}

	/**
   * Performs the connection
   */
	async connect() {
		if (this.uri === undefined) {
			throw new ReferenceError('reference to undefined property \'uri\'');
		}

		try {
			console.log(this.uri);
			this.conn = await mongoose.createConnection(this.uri, this.options);
			EVENTS.forEach(e => {
				this.conn.on(e.event, err => this.logEvent(e.event, e.level, err));
			});
			await this.conn.asPromise();
		} catch (err) {
			this.logger.error(err);
			throw err;
		}

		return this;
	}

	/**
 * Logs the event
 * @param {string} name connection name
 * @param {string} event event to log
 */
	logEvent(event, level, err) {
		this.logger[level](`mongo[${this.conn.name}] event '${event}' occured ${err ? `: ${err.message}` : ''}`);
	}

	/**
	 * Sets the given uri
	 * @param {string} uri mongoose uri
	 * @returns {this}
	 */
	setURI(uri) {
		this.uri = uri;
		return this;
	}

	/**
	 * Sets the given logger
	 * @param {Object} logger logger to use
	 * @returns {this}
	 */
	setLogger(logger) {
		this.logger = logger;
		return this;
	}

	/**
   * Returns the connection instance
   * @returns {object} connection instance
   */
	getConn() {
		return this.conn;
	}

	/**
   * Returns the mongo uri
   * @returns {string} mongo uri
   */
	getURI() {
		return this.uri;
	}

	/**
   * Closes the connection
   * @returns {promise}
   */
	async close() {
		if (this.conn === undefined) {
			return;
		}

		await this.conn.close();
	}
}

const mongo = new Mongo();
/**
 * Makes the connection to the mongo database.
 * @param {string} uri mongo uri
 * @param {object} logger logger to use
 */
async function connect(uri, logger) {
	logger.info('connecting to mongo');
	try {
		await mongo.setURI(uri).setLogger(logger).connect();
	} catch (err) {
		throw new Error(`connecting to mongo: ${err.message}`);
	}
}

export {mongo, connect};
