import {get, getID, create, update, del} from './bookmark_controllers.js';

export default function router(fastify, opts, done) {
	fastify.get('/', get);
	fastify.get('/:id', getID);
	fastify.post('/', create);
	fastify.put('/:id', update);
	fastify.delete('/:id', del);
	done();
}
