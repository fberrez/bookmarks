import Fastify from 'fastify';

import bookmarkRoutes from './bookmark/bookmark_routes.js';

class Server {
	constructor(address, port) {
		this.port = port;
		this.address = address;
	}

	// Starts the server on the given port
	listen() {
		this.fastify = new Fastify({
			logger: true,
		});

		this.fastify.register(bookmarkRoutes, {prefix: '/bookmarks'});

		// Starts the server.
		this.fastify.listen(this.port, this.address, (err, address) => {
			if (err) {
				throw err;
			}

			this.fastify.log.info(`Server is now listening on ${address}`);
		});
	}

	// Closes the server.
	async close() {
		if (this.fastify === undefined) {
			return;
		}

		try {
			this.fastify.log.info('Closing server');
			await this.fastify.close();
			this.fastify.log.info('Server closed');
		} catch (err) {
			throw new Error(`closing server: ${err.message}`);
		}
	}
}

export default Server;
