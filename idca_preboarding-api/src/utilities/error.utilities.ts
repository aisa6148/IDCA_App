import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { failure, SOMETHING_WENT_WRONG } from '../config/constants';

class AppError extends Error {
	public code: number;
	public httpCode: number;
	public error: Error;
	constructor(
		name: string,
		message: string,
		code: number,
		error?: Error,
		httpCode: number = 500,
	) {
		super(message);
		this.name = name;
		this.code = code;
		this.httpCode = httpCode;
		this.error = error;
	}
}

export default AppError;

export const controllerErrorHandler = (error: Error, req: Request, res: Response) => {
	let errorProperties = {};
	const correlationID = req.headers['x-corelation-id'] || v4();
	if (error instanceof AppError) {
		res.statusCode = error.httpCode;
		res.json({
			status: failure,
			code: error.code,
			message: error.message || SOMETHING_WENT_WRONG,
			correlationID,
		});
		errorProperties = {
			statusCode: error.httpCode,
			status: failure,
			code: error.code,
			message: error.message || SOMETHING_WENT_WRONG,
			method: req.method,
			path: req.url,
			trace: error.stack,
			correlationID,
			error: error.error,
		};
	} else {
		res.statusCode = 500;
		res.json({
			status: failure,
			message: SOMETHING_WENT_WRONG,
			correlationID,
		});
		errorProperties = {
			statusCode: 500,
			status: failure,
			message: SOMETHING_WENT_WRONG,
			method: req.method,
			path: req.url,
			correlationID,
			error,
		};
	}
};
