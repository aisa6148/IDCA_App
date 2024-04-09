import bodyParser from 'body-parser';
import { NextFunction, Response } from 'express';
import passport from 'passport';
import config from '../config/index';
import { LogError } from '../utilities/log.utilities';

export default class PassportController {
	public static passportAuthenticate = passport.authenticate('saml', {
		failureRedirect: `/api/login?q=${config.AUTH.TYPE.PFED}`,
		successRedirect: '/',
		failureFlash: 'Authentication failed. Try again by clear browes cache',
		session: false,
	});

	public static passportCallback = [
		bodyParser.urlencoded({ extended: false }),
		PassportController.passportValidate,
		PassportController.setCookies,
	];

	private static async passportValidate(req: any, res: any, next: any) {
		passport.authenticate('saml', (err, user, info) => {
			if (err) {
				LogError(err, 'IssueInSetCookie');
				return res.end(err);
			}
			if (!user) {
				/* tslint:disable */
				console.log('passport auth - not user');
				/* tslint:enable */
				return res.redirect('/login-error');
			}
			req.logIn(user, (e: any) => {
				if (e) {
					return next(e);
				}
				next();
			});
		})(req, res, next);
	}

	private static async setCookies(req: any, res: Response, next: NextFunction) {
		try {
			req.session.userId =
				req.user.userID ||
				req.user.userid ||
				req.user.sAMAccountName ||
				req.user['Associate User ID'];
			req.session.email = req.user.mail || req.user.email;
			req.session.name = req.user.name;
			req.session.displayName = req.user.displayName;
			req.session.upn = req.user.upn || req.user.nameID;
			req.session.memberOf = req.user.memberOf;
			return res.redirect('/');
		} catch (e) {
			LogError(e, 'IssueInSetCookiePfed');
			res.status(401).json('Issue in login');
			return;
		}
	}
}
