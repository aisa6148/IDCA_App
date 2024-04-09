import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export const getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.send('Hello world');
	}
	catch (e) {
		next(new createError.InternalServerError(e.message));
	}
};
