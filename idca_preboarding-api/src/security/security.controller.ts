import { NextFunction, Request, Response } from 'express';
import _, { compact } from 'lodash';
import { AUTH_HEADERS } from '../config/constants';
import config from '../config/index';
import { fetchUserDataByEmailId } from '../db/services/user.service';
import IAMServices from '../services/IAMServices/IAMServices';
import { LogError, LogEvent } from '../utilities/log.utilities';
import PassportController from './passport.controller';

export default class SecurityController {
	public static async checkPFEDAuth(req: Request, res: Response, next: NextFunction) {
		res.locals.authType = config.AUTH.TYPE.PFED;
		return SecurityController.checkCookies(req, res, next);
	}
	public static async checkIAMAuth(req: Request, res: Response, next: NextFunction) {
		const iamAuthtokenHeader =
			req.headers[AUTH_HEADERS.IAM_AUTH_TOKEN] ||
			req.headers[AUTH_HEADERS.IAM_AUTH_TOKEN.toLocaleLowerCase()];
		const iamAuthtoken: string = iamAuthtokenHeader as string;
		if (iamAuthtoken) {
			try {
				const authRes = await IAMServices.authenticateToken(iamAuthtoken);
				res.locals.authType = config.AUTH.TYPE.IAM;
				res.locals.loginid = authRes.principal.loginId;
				next();
			} catch (e) {
				LogError(e, 'Error-AuthenticateIAM');
				return res.status(401).json(e);
			}
		} else {
			return res.status(401).end();
		}
	}

	public static async checkICAAuth(req: Request, res: Response, next: NextFunction) {
		const icaAuthtokenHeader =
			req.headers[AUTH_HEADERS.ICAAUTH_TOKEN] ||
			req.headers[AUTH_HEADERS.ICAAUTH_TOKEN.toLocaleLowerCase()];
		const icaAuthSecretHeader =
			req.headers[AUTH_HEADERS.ICAAUTH_SECRET] ||
			req.headers[AUTH_HEADERS.ICAAUTH_SECRET.toLocaleLowerCase()];
		if (
			icaAuthtokenHeader === config.AUTH.ICA.AUTH_TOKEN &&
			icaAuthSecretHeader === config.AUTH.ICA.SECRET
		) {
			res.locals.authType = config.AUTH.TYPE.ICA;
			next();
		} else {
			return res.status(401).end();
		}
	}

	public static whichAuthIsReq(req: Request) {
		if (
			req.headers[AUTH_HEADERS.ICAAUTH_TOKEN] ||
			req.headers[AUTH_HEADERS.ICAAUTH_TOKEN.toLocaleLowerCase()]
		) {
			return config.AUTH.TYPE.ICA;
		} else if (
			req.headers[AUTH_HEADERS.IAM_AUTH_TOKEN] ||
			req.headers[AUTH_HEADERS.IAM_AUTH_TOKEN.toLocaleLowerCase()]
		) {
			return config.AUTH.TYPE.IAM;
		} else {
			return config.AUTH.TYPE.PFED;
		}
	}

	public static async checkAuth(req: Request, res: Response, next: NextFunction) {
		const authType: string = SecurityController.whichAuthIsReq(req);

		/* tslint:disable */
		console.log('in check auth', authType);
		/* tslint:enable */

		switch (authType) {
			case config.AUTH.TYPE.IAM:
				return SecurityController.checkIAMAuth(req, res, next);
			case config.AUTH.TYPE.ICA:
				return SecurityController.checkICAAuth(req, res, next);
			case config.AUTH.TYPE.PFED:
				return SecurityController.checkCookies(req, res, next);
			default:
				return res.status(401).end();
		}
	}

	public static async checkCookies(req: any, res: Response, next: NextFunction) {
		if (!req.session || req.session.userId === undefined || req.session.userId === null) {
			/* tslint:disable */
			console.log(
				'checkcookies false - redirect -',
				req.session ? req.session.userId : undefined,
			);
			/* tslint:enable */
			return res.redirect('/api/login');
		} else {
			/* tslint:disable */
			console.log('checkcookies true - next -', req.session.userId);
			/* tslint:enable */
			res.locals.userId = req.session.userId;
			next();
		}
	}

	public static async login(req: any, res: Response, next: NextFunction) {
		return PassportController.passportAuthenticate(req, res, next);
	}

	public static async loginIAM(req: any, res: Response, next: NextFunction) {
		const { userId, password } = req.body;
		try {
			const authRes = await IAMServices.authenticateUser(userId, password);
			return res.json(authRes);
		} catch (e) {
			return res.status(400).json(e);
		}
	}

	public static async logout(req: Request, res: Response, next: NextFunction) {
		SecurityController.logoutSession(req);

		const authType: string = SecurityController.whichAuthIsReq(req);
		switch (authType) {
			case config.AUTH.TYPE.IAM:
				const logoutIAMRes = await SecurityController.logoutIAM(req);
				return res.end('Logged out IAM');
			case config.AUTH.TYPE.ICA:
				return res.end('Logged out ICA');
			case config.AUTH.TYPE.PFED:
			default:
				return res.redirect(config.AUTH.PFED.LOGOUT_URL);
		}
	}
	public static async logoutSession(req: Request) {
		try {
			if (req.session) {
				if (req.session.destroy) {
					req.session.destroy((err) => {
						_.noop();
					});
				} else {
					req.session = undefined;
				}
			}
		} catch (e) {
			LogError(e, 'logoutSession');
		}
	}
	public static async logoutIAM(req: Request) {
		try {
			LogEvent('LogoutIAM', {});
		} catch (e) {
			LogError(e, 'logoutSession');
		}
	}
	public static async CheckIfCandidateActive(req: Request, res: Response, next: NextFunction) {
		if (req.body.emailId) {
			try {
				const emailID = IAMServices.userIDDecrypt(req.body.emailId);
				const resultEmailID = await fetchUserDataByEmailId(emailID);
				if (resultEmailID) {
					next();
				} else {
					return res
						.json({
							status: 'failed',
							message: 'EmailId not registered or active',
							display: false,
						})
						.status(401);
				}
			} catch (error) {
				LogError(error, 'Error-Fetching Registered EmailID');
				return res.status(401).json(error);
			}
		} else {
			res.json({
				status: 'failed',
				message: 'Enter the valid Email ID',
				display: false,
			}).status(401);
		}
	}

	public static async loginError(req: Request, res: Response, next: NextFunction) {
		return res.end('Login Error');
	}
}
