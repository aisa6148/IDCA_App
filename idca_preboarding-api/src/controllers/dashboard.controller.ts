import { NextFunction, Request, Response } from 'express';

class Data {
	public static async getDashboardData(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		res
			.json({
				status: 'suceess',
				message: 'Successfully fetched data',
				display: false,
			})
			.status(200);
	}
}

export default Data;
