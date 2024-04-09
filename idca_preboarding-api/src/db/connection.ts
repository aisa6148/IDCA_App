import mongoose from 'mongoose';
import config from '../config/index';
import { EVENT_NAME } from '../config/log';
import { LogError } from '../utilities/log.utilities';

const { userName, password, database, host, port } = config.cosmosDataBaseConfig;
mongoose.set('useUnifiedTopology', true);
mongoose.set('autoCreate', false);

export const connectDB = () => {
	mongoose
		.connect(`mongodb://${host}:${port}/${database}?ssl=true&retrywrites=false`, {
			auth: {
				user: userName,
				password,
			},
			replicaSet: 'globaldb',
			ssl: true,
			// server: {
			// 	reconnectTries: Number.MAX_VALUE,
			// 	reconnectInterval: 1000,
			// },
			useCreateIndex: false,
			useNewUrlParser: true,
			autoIndex: false,
			// By default, mongoose will automatically build indexes defined in your schema when it connects.
			// This is great for development, but not ideal for large production deployments,
			// because index builds can cause performance degradation.
			// If you set autoIndex to false, mongoose will not automatically build indexes
			// for any model associated with this connection.
			// config: {
			// autoIndex: false,
			// },
		})
		.then((db) => {
			/* tslint:disable */
			console.log('DB Connection Established. ReadyState:', db.connection.readyState);
		})
		.catch(error => {
			LogError(error, EVENT_NAME.DB_CONNECTION_FAILED);
		});
};

if (config.env === 'LOCAL' || process.env.DEBUG) {
	mongoose.set('debug', true);
}
