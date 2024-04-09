import { NextFunction, Request, Response } from 'express';

class Failed {
	public static async getFailureStatus(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return res.status(500).json({
			status: 'Failed',
		});
	}
}

export default Failed;
