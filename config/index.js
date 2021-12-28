import convict from 'convict';

const config = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV',
	},
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 3000,
		env: 'PORT',
		arg: 'port',
	},
	address: {
		doc: 'The server address.',
		format: '*',
		default: 'localhost',
		env: 'ADDRESS',
		arg: 'address',
	},
	mongoURI: {
		doc: 'The mongo uri.',
		format: '*',
		default: 'mongodb://localhost:27017/bookmarks',
		env: 'MONGO_URI',
	},
});

export default config;
