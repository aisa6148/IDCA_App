const _ = require('lodash');

const defaultConfig = {
	url: 'http://localhost:3000/',
	name: 'myApi',
	port: 8080,
};
const env = process.env.NODE_ENV || 'development';
let envConfig = {};
let config;

try {
	if (env === 'development') {
		envConfig = require('./env/development');
	} else if (env === 'test') {
		envConfig = require('./env/test');
	} else if (env === 'production') {
		envConfig = require('./env/production');
	}
} catch (e) {
	console.log('Failed to require config file: ', `env/${env}`);
	envConfig = {};
}

config = _.defaults({}, envConfig, defaultConfig);
config.env = env;

module.exports = config;
