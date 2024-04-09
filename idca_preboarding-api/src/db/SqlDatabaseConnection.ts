import { Sequelize } from 'sequelize';
import config from '../config/index';
import { LogDetails } from './model/log.model';
import { UserFactory } from './model/user.model';

export const dbConnectionInitialize = new Sequelize(
	config.sqlDataBaseConfig.database,
	config.sqlDataBaseConfig.userName,
	config.sqlDataBaseConfig.password,
	{
		host: config.sqlDataBaseConfig.host,
		port: 1433,
		dialect: 'mssql',
		logging: true,
		dialectOptions: {
			encrypt: true,
			packetSize: config.SQLCONFIG.packetSize,
			pool: {
				max: config.SQLCONFIG.POOL.max,
				min: config.SQLCONFIG.POOL.min,
				acquire: config.SQLCONFIG.POOL.acquire,
				idle: config.SQLCONFIG.POOL.idle,
			},
			options: {
				useUTC: false,
				dateFirst: 1,
				database: config.sqlDataBaseConfig.database,
				validateBulkLoadParameters: true,
			},
			authentication: {
				options: {
					userName: config.sqlDataBaseConfig.userName,
					password: config.sqlDataBaseConfig.password,
				},
				type: 'azure-active-directory-password',
			},
			server: config.sqlDataBaseConfig.host,
		},
	},
);

dbConnectionInitialize
	.authenticate()
	.then(() => {
		/* tslint:disable */
		console.log('Data Base Connected Success');
		/* tslint:enable */

		/* Disabling sql db sync
		dbConnectionInitialize
			.sync({
				force: false,
			})
			.then(() => {
				console.log('table created if not there, successfully.');
			})
			.catch((error) => {
				console.log('oooh, did you enter wrong database credentials?');
			});
		*/
	})
	.catch((err) => {
		/* tslint:disable */
		console.log('failed', err);
		/* tslint:enable */
	});

export const User = UserFactory(dbConnectionInitialize);
export const LogManage = LogDetails(dbConnectionInitialize);
