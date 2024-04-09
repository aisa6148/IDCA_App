import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import config from '../config/index';

import passport from 'passport';
import { memcachedSessionStore } from '../services/memcached';
import { passportConfig } from './passport.config';

import SecurityController from './security.controller';

export const pureNonPfedRoutes = ['/api/login/iam', '/unauthping'];

export const securityPassportMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const mwUse = getConfig(req);

	new Promise<void>((resolveSession, rejectSession) => {
		if (mwUse.session) {
			sessionMiddleware(req, res, () => {
				resolveSession();
			});
		} else {
			resolveSession();
		}
	})
		.then(() => {
			if (mwUse.passport) {
				passportConfig();

				return new Promise<void>((resolvePassportInit, rejectPassportInit) => {
					passport.initialize()(req, res, () => {
						passport.session()(req, res, () => {
							resolvePassportInit();
						});
					});
				});
			}
		})
		.then(() => {
			next();
		})
		.catch((err) => {
			res.status(500).end();
		});
};

export const getConfig = (req: Request) => {
	let usePassport = true;
	let useSession = true;

	const authType = SecurityController.whichAuthIsReq(req);
	if (authType === config.AUTH.TYPE.IAM || authType === config.AUTH.TYPE.ICA) {
		usePassport = false;
		useSession = false;
	}
	if (pureNonPfedRoutes.includes(req.url)) {
		usePassport = false;
		useSession = false;
	}
	return {
		passport: usePassport,
		session: useSession,
	};
};

export const sessionMiddleware = session({
	store: memcachedSessionStore,
	secret: config.SESSION.KEY1,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: config.SESSION.MAX_AGE,
		secure: !config.SESSION.unencryptedCookie,
		signed: !config.SESSION.unencryptedCookie,
	},
});
