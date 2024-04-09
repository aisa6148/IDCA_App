import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { FETCH_SUCCESSFUL, success, UPDATE_SUCCESSFULL } from '../config/constants';
import { MODEL_ERRORS } from '../config/error';
import { TASK_STATUS } from '../config/taskStatus';
import { IUserTaskStatus } from '../db/schema/userTaskStatus.schema';
import { fetchStatusByUserID, fetchStatusByUserIDAndTaskID, updateUserTaskStatus } from '../db/services/userTaskStatus.services';
import AppError, { controllerErrorHandler } from '../utilities/error.utilities';

class UserTaskStatus {
	public static async userIDChecks(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.params.taskId) {
				throw new AppError(
					MODEL_ERRORS.TASK_ID_MISSING.MESSAGE,
					MODEL_ERRORS.TASK_ID_MISSING.MESSAGE,
					MODEL_ERRORS.TASK_ID_MISSING.CODE,
				);
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async fetchStatusByUserIDAndTaskID(req: Request, res: Response, next: NextFunction) {
		try {
			const { taskId } = req.params;
			const id = res.locals.userID;
			const taskStatus: IUserTaskStatus = await fetchStatusByUserIDAndTaskID(id, taskId);
			res.json({
				status: success,
				taskStatus,
				message: FETCH_SUCCESSFUL,
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async fetchStatusByUserID(req: Request, res: Response, next: NextFunction) {
		try {
			const id = res.locals.userID;
			const taskStatus: IUserTaskStatus[] = await fetchStatusByUserID(id);
			res.json({
				status: success,
				taskStatus,
				message: FETCH_SUCCESSFUL,
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async updateUserTaskStatusCheck(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.params.taskId) {
				throw new AppError(
					MODEL_ERRORS.TASK_ID_MISSING.MESSAGE,
					MODEL_ERRORS.TASK_ID_MISSING.MESSAGE,
					MODEL_ERRORS.TASK_ID_MISSING.CODE,
				);
			}
			if (!TASK_STATUS[req.params.status]) {
				throw new AppError(
					MODEL_ERRORS.STATUS_INVALID.MESSAGE,
					MODEL_ERRORS.STATUS_INVALID.MESSAGE,
					MODEL_ERRORS.STATUS_INVALID.CODE,
				);
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async updateUserTaskStatus(req: Request, res: Response, next: NextFunction) {
		try {
			const { planId, taskId, status } = req.params;
			const id = res.locals.userID;
			// @ts-ignore
			const taskStatus: IUserTaskStatus = {
				userId: id,
				planId,
				taskId,
				status,
				comments: '',
				createdBy: res.locals.userID,
			};
			await updateUserTaskStatus(taskId, taskStatus);
			res.json({
				status: success,
				message: UPDATE_SUCCESSFULL,
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
}

export default UserTaskStatus;
