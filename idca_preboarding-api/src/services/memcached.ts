import connectMemcached from 'connect-memcached';
import session from 'express-session';
import Memcached from 'memcached';

import config from '../config';

export const MemcachedStore = connectMemcached(session);

const memcachedClient = new Memcached(config.MEGHACACHE.hosts);

export const memcachedSessionStore = new MemcachedStore({
	client: memcachedClient,
});

export async function getValue(key: any): Promise<any> {
	return new Promise((resolve, reject) => {
		memcachedSessionStore.client.get(key, (error: Error | null, reply: string) => {
			if (error) {
				reject(error);
			} else {
				resolve(reply);
			}
		});
	});
}

export async function setValue(key, values, lifetime) {
	memcachedSessionStore.client.set(key, values, lifetime, (err) => {
		if (err) {
			throw err;
		}
	});
}
