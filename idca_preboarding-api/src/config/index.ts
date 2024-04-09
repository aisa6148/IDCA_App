import {
	BoolifyVal,
	getConfigJson,
	getParsedArraySafe,
	getSecret,
} from '../utilities/config.utilities';
import AUTH_CONFIG from './auth.config';

const appConfig = getConfigJson('appConfig');
const ENV = process.env.ENV ? process.env.ENV : 'LOCAL';
export default {
	env: ENV,
	cosmosDataBaseConfig: {
		host: process.env.PREBOARDING_COSMOS_HOST || appConfig.PREBOARDING_COSMOS_HOST,
		port: '10255',
		userName: process.env.PREBOARDING_COSMOS_USERNAME || appConfig.PREBOARDING_COSMOS_USERNAME,
		database: process.env.PREBOARDING_COSMOS_DATABASE || appConfig.PREBOARDING_COSMOS_DATABASE,
		password: process.env.PREBOARDING_COSMOS_KEY || getSecret('PREBOARDING_COSMOS_KEY'),
	},
	graphConfig: {
		tenantID: process.env.GRAPH_API_TENANTID,
		clientID: process.env.GRAPH_API_CLIENTID,
		secret: process.env.GRAPH_API_SECRET,
	},

	refreshTime: 1000,
	HEALTHCHECK: {
		apiDependencyTimeout: parseInt(process.env.HEALTHCHK_APIDEP_TIMEOUT, 10) || 20000,
	},
	AUTH: AUTH_CONFIG,
	SESSION: {
		MAX_AGE: (parseInt(process.env.SESSION__MAXAGE, 10) || 4) * 60 * 60 * 1000,
		KEY1: process.env.SESSION__KEY1 || getSecret('SESSION__KEY1'),
		KEY2: process.env.SESSION__KEY2 || getSecret('SESSION__KEY2'),
		unencryptedCookie: ENV === 'LOCAL' || BoolifyVal(process.env.COOKIE_UNENCRYPTED),
	},
	MEGHACACHE: {
		hosts: getParsedArraySafe(
			process.env.MEGHACACHE_HOST_ARRAY || getSecret('MEGHACACHE_HOST_ARRAY'),
		),
	},
	azureBlobConfig: {
		azImageBlobConnectionString:
			process.env.AZURE_BLOBINT_ACCOUNT_CONNSTRING ||
			getSecret('AZURE_BLOBINT_ACCOUNT_CONNSTRING'),
		azImageNewsFeedBlobContainer:
			process.env.AZURE_BLOBINT_NEWSFEED_CONTAINER ||
			appConfig.AZURE_BLOBINT_NEWSFEED_CONTAINER,
	},
	PING__CERT_BASE64: process.env.PING__CERT_BASE64 || getSecret('PING__CERT_BASE64'),
	PASSPHARSE:
		process.env.PASSPHARSE || getSecret('PASSPHARSE').length === 0
			? ''
			: getSecret('PASSPHARSE') || '',
	RSA_PRIVATE_KEY: process.env.RSA_PRIVATE_KEY
		? process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
		: getSecret('RSA_PRIVATE_KEY'),
	RSA_PUBLIC_KEY: process.env.RSA_PUBLIC_KEY
		? process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')
		: getSecret('RSA_PUBLIC_KEY'),
	PORT: process.env.PORT || process.env.port || appConfig.PORT || 5000,
	azureBlobFileUploadConfig: {
		azureFileUploadConnectionString:
			process.env.AZURE_BLOBFILEUPLOAD_ACCOUNT_CONNSTRING ||
			getSecret('AZURE_BLOBFILEUPLOAD_ACCOUNT_CONNSTRING'),
		azureFileUploadContainer:
			process.env.AZURE_BLOBFILEUPLOAD_ACCOUNT_CONTAINER ||
			getSecret('AZURE_BLOBFILEUPLOAD_ACCOUNT_CONTAINER'),
	},
	sqlDataBaseConfig: {
		userName: process.env.PREBOARDING_SQL_DB_USERNAME || appConfig.PREBOARDING_SQL_DB_USERNAME,
		database: process.env.PREBOARDING_SQL_DB_NAME || appConfig.PREBOARDING_SQL_DB_NAME,
		password:
			process.env.PREBOARDING_SQL_DB_PASSWORD || getSecret('PREBOARDING_SQL_DB_PASSWORD'),
		host: process.env.PREBOARDING_SQL_DB_HOSTNAME || appConfig.PREBOARDING_SQL_DB_HOST,
	},
	PRIVACYPOLICY: process.env.PRIVACY_AND_POLICY || appConfig.PRIVACY_AND_POLICY,
	TERMSOFUSE: process.env.TERMS_OF_USE || appConfig.TERMS_OF_USE,
	SQLCONFIG: {
		POOL: {
			max: 50,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		packetSize: 60000,
	},
};
