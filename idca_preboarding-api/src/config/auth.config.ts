import { getConfigJson, getSecret } from '../utilities/config.utilities';

const appConfig = getConfigJson('appConfig');
const ENV = process.env.ENV ? process.env.ENV : 'LOCAL';

export default {
	TYPE: {
		IAM: 'IAM',
		ICA: 'ICA',
		PFED: 'PFED',
	},
	PFED: {
		ENABLED:
			(ENV !== 'LOCAL' && !process.env.PING__DISABLED) ||
			process.env.PING__ENABLED ||
			appConfig.PING__ENABLED,
		CALL_BACK: process.env.PING__CALL_BACK || appConfig.PING__CALL_BACK,
		ENTRY_POINT: process.env.PING__ENTRY_POINT || appConfig.PING__ENTRY_POINT,
		ISSUER: process.env.PING__ISSUER || appConfig.PING__ISSUER,
		PARTNER_SPID: process.env.PING__PARTNER_SPID || appConfig.PING__PARTNER_SPID,
		ASCIDX: parseInt(process.env.PING__ASCIDX || appConfig.PING__ASCIDX, 10) || 0,
		CERT_BASE64: process.env.PING__CERT_BASE64 || getSecret('PING__CERT_BASE64'),
		LOGOUT_URL: process.env.PING__LOGOUT_URL || appConfig.PING__LOGOUT_URL,
	},
	ICA: {
		ENABLED: true,
		AUTH_TOKEN: process.env.ICA_AUTH_TOKEN || getSecret('ICA_AUTH_TOKEN'),
		SECRET: process.env.ICA_AUTH_TOKEN_SECRET || getSecret('ICA_AUTH_TOKEN_SECRET'),
		SALT: process.env.ICA_AUTH_TOKEN_SALT || getSecret('ICA_AUTH_TOKEN_SALT'),
		LOGOUT_URL: process.env.ICA__LOGOUT_URL || appConfig.ICA__LOGOUT_URL,
	},
	IAM: {
		ENABLED: true,
		SERVICE_ENDPOINT: process.env.IAM_SERVICE_ENDPOINT || appConfig.IAM_SERVICE_ENDPOINT,
		SERVICE_ENV: process.env.IAM_SERVICE_ENV || appConfig.IAM_SERVICE_ENV,
		CONSUMER_ID: process.env.IAM_CONSUMER_ID || appConfig.IAM_CONSUMER_ID,
		SERVICE_NAME: process.env.IAM_SERVICE_NAME || appConfig.IAM_SERVICE_NAME,
		SERVICE_VERSION: process.env.IAM_SERVICE_VERSION || appConfig.IAM_SERVICE_VERSION,
		TENANT_ID: process.env.IAM_TENANT_ID || appConfig.IAM_TENANT_ID,
		REALM_ID: process.env.IAM_REALM_ID || appConfig.IAM_REALM_ID,
		SVC_ACCOUNT_NAME: process.env.IAM_SVC_ACCOUNT_NAME || appConfig.IAM_SVC_ACCOUNT_NAME,
		SVC_ACCOUNT_PVT_KEY:
			process.env.IAM_SVC_ACCOUNT_PVT_KEY || getSecret('IAM_SVC_ACCOUNT_PVT_KEY'),
		LOGOUT_URL: process.env.IAM__LOGOUT_URL || appConfig.IAM__LOGOUT_URL,
	},
	ROLEACCESS: {
		SUPERADMIN_AD_GROUP:
			process.env.ROLE_SUPERADMIN_AD_GROUP || appConfig.ROLE_SUPERADMIN_AD_GROUP,
	},
};
