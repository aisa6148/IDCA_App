import { MongoError } from 'mongodb';
import { MODEL_ERRORS } from '../config/error';
import { MongoErrorCode } from '../config/mongo-error-code';
import AppError from './error.utilities';

export const mongodbErrorHandler = (error: MongoError) => {
	switch (error.code) {
		case MongoErrorCode.DUPLICATE_KEY: {
			throw new AppError(
				MODEL_ERRORS.MONGO_DUPLICATE_ERROR.MESSAGE,
				MODEL_ERRORS.MONGO_DUPLICATE_ERROR.MESSAGE,
				MODEL_ERRORS.MONGO_DUPLICATE_ERROR.CODE,
				error,
			);
		}
		default:
			throw error;
	}
};
