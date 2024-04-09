import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export const health = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.json({
			'status': true,
			'server-start-time': new Date(new Date().getTime() - process.uptime() * 1000),
			'dependencies': {
				database: {
					status: true,
				},
			},
		});
	}
	catch (e) {
		next(new createError.InternalServerError(e.message));
	}
};
