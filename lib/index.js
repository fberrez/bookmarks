import config from '../config/index.js';
import Server from './server.js';
import {mongo, connect} from './backend/mongo.js';
import pino from 'pino';

// Main function
async function main() {
	const logger = pino();
	await connect(config.get('mongoURI'), logger.child({module: 'mongo'}));
	const server = new Server(config.get('address'), config.get('port'));
	server.listen();

	const close = async () => {
		try {
			await Promise.all([server.close(), mongo.close()]);
		} catch (err) {
			logger.fatal(`Fatal error on close: ${err.message}`);
			return process.exit(1);
		}

		return process.exit(0);
	};

	process.on('SIGTERM', close);
	process.on('SIGINT', close);
}

main();
