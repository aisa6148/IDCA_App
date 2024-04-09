import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { LogError } from '../utilities/log.utilities';

class HealthCheck {
	public static getHealth = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		let isCosmosDatabaseUp = false;
		let serverStatus = false;
		try {
			// https://mongoosejs.com/docs/api.html#connection_Connection-readyState
			isCosmosDatabaseUp = mongoose.connection.readyState === 1;
		} catch (error) {
			LogError(error, 'HEALTH_CHECK_ERROR_MONGOOSE');
		}

		serverStatus = [isCosmosDatabaseUp].reduce((v, a) => a && v);

		res.json({
			'status': serverStatus, // dep1 && dep2 && dep3...
			'server-start-time': new Date(
				new Date().getTime() - process.uptime() * 1000,
			),
			'dependencies': {
				'onboarding-mongoose-database': {
					'status': isCosmosDatabaseUp,
					'database-connection-status':
						mongoose.STATES[mongoose.connection.readyState],
				},
			},
		});
	};
}

export default HealthCheck;
