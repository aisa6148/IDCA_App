import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { AUTH_HEADERS, ROLES } from '../config/constants';
import { MEMCACHED } from '../config/constants';
import { MODEL_ERRORS } from '../config/error';
import config from '../config/index';
import { IRoleAccess } from '../db/schema/roleAccess.schema';
import { fetchAllRoles } from '../db/services/roleAccess.services';
import { fetchUserDataByEmailId } from '../db/services/user.service';
import { getValue, setValue } from '../services/memcached';
import { getParsedArraySafe } from '../utilities/config.utilities';
import AppError, { controllerErrorHandler } from '../utilities/error.utilities';
import { LogError } from '../utilities/log.utilities';
import SecurityController from './security.controller';

class RoleAccess {
	public static async getRoles(req: Request, res: Response, next: NextFunction) {
		try {
			if (process.env.DEBUG) {
				/* tslint:disable */
				try {
					let logHeaders = req.headers && { ...req.headers };
					delete logHeaders[AUTH_HEADERS.ICAAUTH_SECRET];
					delete logHeaders[AUTH_HEADERS.ICAAUTH_TOKEN];
					delete logHeaders[AUTH_HEADERS.IAM_AUTH_TOKEN];
					delete logHeaders[AUTH_HEADERS.IAM_AUTH_TOKEN.toLocaleLowerCase()];
					console.log({ headers: logHeaders, body: req.body });
				} catch (e) {}
				/* tslint:enable */
			}
			const authType = SecurityController.whichAuthIsReq(req);
			if (!process.env.ENV && !config.AUTH.PFED.ENABLED) {
				res.locals.userID = process.env.mock_userID;
				res.locals.upn = process.env.mock_upn;
				res.locals.userName = process.env.mock_userName;
				res.locals.mail = process.env.mock_mail;
				res.locals.userADJoining = process.env.mock_userADJoining;
			} else {
				switch (authType) {
					case config.AUTH.TYPE.IAM:
						const getIAMUserProfileData = await memcachedSessionIAMUserProfile(
							res.locals.loginid,
						);
						if (!getIAMUserProfileData) {
							throw new AppError(
								MODEL_ERRORS.USERAUTH_FAILED_USERRECORD.NAME,
								MODEL_ERRORS.USERAUTH_FAILED_USERRECORD.MESSAGE,
								MODEL_ERRORS.USERAUTH_FAILED_USERRECORD.CODE,
							);
						}

						res.locals.userID = getIAMUserProfileData.userID;
						res.locals.userName = getIAMUserProfileData.displayName;
						res.locals.email = getIAMUserProfileData.emailID;
						break;
					case config.AUTH.TYPE.ICA:
						// TODO
						break;
					case config.AUTH.TYPE.PFED:
						// @ts-ignore - Property "upn" does not exist on type "Session & Partial<SessionData>".
						let upn: string = req.session.upn || '';
						// @ts-ignore - Property "userId" does not exist on type "Session & Partial<SessionData>".
						let userID: string = req.session.userId;
						// @ts-ignore - Property "email" does not exist on type "Session & Partial<SessionData>".
						const email = req.session.email;
						// @ts-ignore - Property "displayName" does not exist on type "Session & Partial<SessionData>".
						const displayName = req.session.displayName;
						// @ts-ignore - Property "memberOf" does not exist on type "Session & Partial<SessionData>".
						const memberOf = getParsedArraySafe(req.session.memberOf);

						if (!userID) {
							return res.redirect('/api/login');
						}
						upn = upn.toLowerCase();
						userID = userID.toLowerCase();
						res.locals.userID = userID;
						res.locals.upn = upn;
						res.locals.memberOf = memberOf;
						res.locals.email = email;
						res.locals.displayName = displayName;
						break;
					default:
						return res.status(403).end();
				}
			}

			// check role
			const roles = new Set<string>();
			switch (authType) {
				case config.AUTH.TYPE.IAM:
					if (res.locals.userID && res.locals.email) {
						roles.add(ROLES.CANDIDATE);
					}
					break;
				case config.AUTH.TYPE.ICA:
					// TODO
					roles.add(ROLES.ADMIN);
					break;
				case config.AUTH.TYPE.PFED:
					try {
						const roleDB = await memcachedSessionPFEDUserRole(res.locals.userid);
						_.each(roleDB, (v, i) => roles.add(v));

						if (
							res.locals.memberOf &&
							res.locals.memberOf.includes(config.AUTH.ROLEACCESS.SUPERADMIN_AD_GROUP)
						) {
							roles.add(ROLES.ADMIN);
						}
					} catch (e) {
						_.noop();
					}
					break;
				default:
			}

			res.locals.roles = Array.from(roles);
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
}

async function memcachedSessionIAMUserProfile(userID) {
	let sessionUserDetailData;
	const key = `${MEMCACHED.IAM_USER_PROFILE}_${userID}`;
	try {
		sessionUserDetailData = await getValue(key);
		if (sessionUserDetailData) {
			return sessionUserDetailData;
		} else {
			const userData = await fetchUserDataByEmailId(userID);
			if (!userData) {
				return;
			}
			const userValues = {
				emailID: userData.emailId,
				displayName: userData.firstName,
				userID,
			};

			try {
				await setValue(key, userValues, config.refreshTime);
			} catch (error) {
				LogError(error, 'Error In IAM User Profile - Set Cache value');
			}
			return userValues;
		}
	} catch (error) {
		LogError(error, 'Error In IAM User Profile - session value get');
	}
}
async function memcachedSessionPFEDUserRole(userID) {
	let sessionRoleData;
	const key = `${MEMCACHED.PFED_ROLE}_${userID}`;
	try {
		sessionRoleData = await getValue(key);
		if (sessionRoleData) {
			return sessionRoleData;
		} else {
			const allRoles: IRoleAccess[] = await fetchAllRoles(userID);
			const roleDB: string[] = allRoles[0].roles;
			try {
				await setValue(key, roleDB, config.refreshTime);
			} catch (error) {
				LogError(error, 'Error in RoleAccess - PFED role set Cache value');
			}
			return roleDB;
		}
	} catch (error) {
		LogError(error, 'Error in RoleAccess - PFED session value get');
	}
}

export default RoleAccess;
