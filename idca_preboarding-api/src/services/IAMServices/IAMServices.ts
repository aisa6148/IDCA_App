import ESH from '@walmart/esb-signheaders';
import crypto from 'crypto';
import * as https from 'https';
import * as _ from 'lodash';
import fetch, { RequestInit } from 'node-fetch';
import config from '../../config/index';

import AuthConfig from '../../config/auth.config';
import { REST } from '../../config/constants';
import {
	hasLowerCase,
	hasNumbers,
	hasSpecialCharcaters,
	hasUpperCase,
} from '../../utilities/common.utilities';
import { CHARSET } from '../../utilities/common.utilities';

interface IIAMCallParam {
	url: string;
	method: string;
	headers?: any;
	body?: any;
	params?: any;
}

const ENDPOINT = {
	authenticateToken: {
		url: '/platform-iam-server/iam/authn/token',
		method: REST.POST,
	},
	authenticateUser: {
		url: '/platform-iam-server/iam/authnService',
		method: REST.POST,
	},
	changeLoginPassword: {
		url: '/platform-iam-server/iam/admin/changeloginpassword',
		method: REST.PUT,
	},
	changePasswordByAdmin: {
		url: '/platform-iam-server/iam/admin/changepassword',
		method: REST.POST,
	},
	createUser: {
		url: '/platform-iam-server/iam/admin/principal',
		method: REST.POST,
	},
	deleteUser: {
		url: '/platform-iam-server/iam/admin/principal',
		method: REST.DELETE,
	},
};

export default class IAMServices {
	public static async authenticateToken(token: string) {
		const response = await IAMServices.makeIAMCall({
			...ENDPOINT.authenticateToken,
			body: {
				payload: token,
			},
		});

		if (response.status === 'OK' && response.payload && response.payload.valid) {
			return {
				principal: {
					principalId: response.payload.principalId,
					loginId: response.payload.loginId,
				},
			};
		} else {
			throw {
				errorStatus: response.status,
				error:
					(response.errors && response.errors[0] && response.errors[0].description) ||
					(response.payload && response.payload.errorMsg) ||
					'unauthenticated',
			};
		}
	}

	public static async authenticateUser(userIdEnc: string, passwordEnc: string) {
		const password = IAMServices.passwordDecrypt(passwordEnc);
		const userId = IAMServices.userIDDecrypt(userIdEnc);
		const response = await IAMServices.makeIAMCall({
			...ENDPOINT.authenticateUser,
			body: {
				payload: {
					tenantId: AuthConfig.IAM.TENANT_ID,
					realmId: AuthConfig.IAM.REALM_ID,
					userId,
					password,
				},
			},
		});
		if (response.status === 'OK' && response.payload) {
			if (
				response.payload.authenticationState === 'SUCCESS' &&
				response.payload.principal &&
				response.payload.authenticationToken
			) {
				return {
					principal: {
						loginId: response.payload.principal.loginId,
						mailId: response.payload.principal.mailId,
					},
					authenticationToken: {
						authToken: response.payload.authenticationToken.authToken,
						validity: response.payload.authenticationToken.validity,
					},
				};
			} else if (response.payload.authenticationState === 'FAILED') {
				throw {
					authenticationState: response.payload.authenticationState,
					error: response.payload.authenticationResultMsg || 'Authentication failed',
				};
			} else {
				throw {
					authenticationState: response.payload.authenticationState,
					error: response.payload.authenticationResultMsg || 'Authentication error',
				};
			}
		} else {
			throw {
				errorStatus: response.status,
				error:
					(response.errors && response.errors[0] && response.errors[0].description) ||
					(response.payload && response.payload.errorMsg) ||
					'Authenticated Failed',
			};
		}
	}

	public static async changeLoginPassword(
		loginId: string,
		oldPasswordEnc: string,
		newPasswordEnc: string,
	) {
		if (!loginId) {
			throw {
				error: 'No Valid Email/loginid given',
			};
		}

		const oldPassword = IAMServices.passwordDecrypt(oldPasswordEnc);
		const newPassword = IAMServices.passwordDecrypt(newPasswordEnc);

		if (!newPassword || !oldPassword) {
			throw {
				error: 'Invalid new/old Password given',
			};
		}

		const response = await IAMServices.makeIAMCall({
			...ENDPOINT.changeLoginPassword,
			body: {
				header: undefined,
				payload: {
					realmId: AuthConfig.IAM.REALM_ID,
					loginId,
					oldPassword,
					newPassword,
					changed: false,
				},
			},
		});

		if (response.status === 'OK' && response.payload) {
			return {
				passwordChanged: response.payload.changed,
			};
		} else {
			throw {
				errorStatus: response.status,
				error:
					(response.errors && response.errors[0] && response.errors[0].description) ||
					(response.payload && response.payload.errorMsg) ||
					'IAM User Password change Failed',
			};
		}
	}

	public static async createIAMUser(email: string, passwordEnc: string) {
		if (!email) {
			throw {
				error: 'No Valid Email given',
			};
		}

		const password = IAMServices.passwordDecrypt(passwordEnc);
		if (!password) {
			throw {
				error: 'Invalid Password given',
			};
		}

		const additionalHeaders = IAMServices.generateConsumerSignature();

		const userId = email && email.split('@')[0];
		if (!userId) {
			throw {
				error: 'Could not derive User ID',
			};
		}

		const response = await IAMServices.makeIAMCall({
			...ENDPOINT.createUser,
			headers: additionalHeaders,
			body: {
				header: undefined,
				payload: {
					realmId: AuthConfig.IAM.REALM_ID,
					email,
					id: userId,
					loginUID: email,
					password,
					enabled: true,
					locked: false,
				},
			},
		});

		if (response.status === 'OK' && response.payload) {
			if (response.payload.loginUID && response.payload.email) {
				return {
					created: true,
					loginUID: response.payload.loginUID,
					email: response.payload.email,
					enabled: response.payload.enabled,
				};
			} else {
				throw {
					error: 'Problem occured with IAM User Creation ',
					response,
				};
			}
		} else {
			throw {
				errorStatus: response.status,
				error:
					(response.errors && response.errors[0] && response.errors[0].description) ||
					(response.payload && response.payload.errorMsg) ||
					'IAM User Creation Failed',
			};
		}
	}

	public static async deleteIAMUser(principalId: string) {
		// FORBIDDEN

		if (!principalId) {
			throw {
				error: 'No User principal ID given',
			};
		}
		const additionalHeaders = IAMServices.generateConsumerSignature();
		const response = await IAMServices.makeIAMCall({
			...ENDPOINT.deleteUser,
			headers: additionalHeaders,
			params: {
				realmId: AuthConfig.IAM.REALM_ID,
				principalId,
			},
		});

		if (response.status === 'OK') {
			return {
				response,
			};
		} else {
			throw {
				errorStatus: response.status,
				error:
					(response.errors && response.errors[0] && response.errors[0].description) ||
					(response.payload && response.payload.errorMsg) ||
					'IAM User Delete Failed',
			};
		}
	}

	public static async updateIAMUserPassword(email: string, passwordEnc: string) {
		// FORBIDDEN

		if (!email) {
			throw {
				error: 'No Valid Email given',
			};
		}

		const password = IAMServices.passwordDecrypt(passwordEnc);
		if (!password) {
			throw {
				error: 'Invalid Password given',
			};
		}

		const userId = email && email.split('@')[0];
		if (!userId) {
			throw {
				error: 'Could not derive User ID',
			};
		}

		const additionalHeaders = IAMServices.generateConsumerSignature();

		const response = await IAMServices.makeIAMCall({
			...ENDPOINT.changePasswordByAdmin,
			headers: additionalHeaders,
			body: {
				headers: undefined,
				payload: {
					realmId: AuthConfig.IAM.REALM_ID,
					loginId: email,
					password,
				},
			},
		});

		if (response.status === 'OK' && response.payload) {
			return {
				passwordChanged: response.payload.changed,
				response,
			};
		} else {
			throw {
				errorStatus: response.status,
				error:
					(response.errors && response.errors[0] && response.errors[0].description) ||
					(response.payload && response.payload.errorMsg) ||
					'IAM User Password change Failed',
			};
		}
	}

	public static userIDDecrypt(userIDEnc: string) {
		const userIDDec = IAMServices.decrypt(userIDEnc, config.RSA_PRIVATE_KEY);
		return userIDDec;
	}

	private static async makeIAMCall({ url, method, headers, body, params }: IIAMCallParam) {
		const requestOptions: RequestInit = {
			method: method || 'GET',
			headers: {
				'WM_SVC.ENV': AuthConfig.IAM.SERVICE_ENV,
				'WM_SVC.VERSION': AuthConfig.IAM.SERVICE_VERSION,
				'WM_SVC.NAME': AuthConfig.IAM.SERVICE_NAME,
				'WM_CONSUMER.ID': AuthConfig.IAM.CONSUMER_ID,
				'WM_QOS.CORRELATION_ID': Math.random().toString(36).slice(2),
				...headers,
			},
		};

		if (body) {
			try {
				requestOptions.body = JSON.stringify(body);
				requestOptions.headers['Content-Type'] = 'application/json';
			} catch (e) {
				_.noop();
			}
		}

		let parsedParams = '';
		if (params) {
			try {
				const p = new URLSearchParams();
				_.each(params, (v, k) => p.append(k, v));
				parsedParams = p.toString() ? '?' + p.toString() : '';
			} catch (e) {
				_.noop();
			}
		}

		requestOptions.agent = new https.Agent({
			rejectUnauthorized: false,
			port: 443,
		});

		const generatedUrl = `${AuthConfig.IAM.SERVICE_ENDPOINT}${url}${parsedParams}`;
		const res = await fetch(generatedUrl, requestOptions);
		return res.json();
	}

	private static generateRandomPassword = (length: number, chars: string) => {
		let password = '';
		do {
			const pwArray = [];
			pwArray.push(_.sampleSize(CHARSET.lowerCase, 1));
			pwArray.push(
				_.shuffle([
					_.sampleSize(CHARSET.lowerCase, 2),
					_.sampleSize(CHARSET.upperCase, 2),
					_.sampleSize(CHARSET.digits, 1),
					_.sampleSize(CHARSET.characters, 1),
				]),
			);
			password = pwArray.join('');
		} while (!IAMServices.isValidPassword(password));
		return password;
	};

	private static async generateConsumerSignature() {
		const WMSEC_KEY_VERSION = '1';
		const consumerID = AuthConfig.IAM.CONSUMER_ID;
		const WMSEC_KEY = AuthConfig.IAM.SVC_ACCOUNT_PVT_KEY;
		const ts = Date.now();

		const eshSign = new ESH({ privateKey: WMSEC_KEY });

		const headers = eshSign.sign({
			'WM_CONSUMER.ID': consumerID,
			'WM_CONSUMER.INTIMESTAMP': ts,
			'WM_SEC.KEY_VERSION': WMSEC_KEY_VERSION,
		});

		return headers;
	}

	private static isValidPassword = (password: string) => {
		return (
			hasLowerCase(password) &&
			hasUpperCase(password) &&
			hasNumbers(password) &&
			hasSpecialCharcaters(password)
		);
	};

	private static passwordDecrypt(passwordEnc: string) {
		const passwordDec = IAMServices.decrypt(passwordEnc, config.RSA_PRIVATE_KEY);
		return passwordDec;
	}

	private static passwordEncrypt(password: string) {
		const passwordEnc = password;
		return passwordEnc;
	}

	private static decrypt(toDecrypt, privateKey) {
		const buffer = Buffer.from(toDecrypt, 'base64');
		const decrypted = crypto.privateDecrypt(
			{
				key: privateKey.toString(),
				passphrase: config.PASSPHARSE,
			},
			buffer,
		);
		return decrypted.toString('utf8');
	}
}
