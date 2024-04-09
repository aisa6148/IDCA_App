import { MODEL_ERRORS } from '../../config/error';
import AppError from '../../utilities/error.utilities';
import { UserTaskStatus } from '../model/userTaskStatus.model';
import { IUserTaskStatus } from '../schema/userTaskStatus.schema';

export const fetchStatusByUserIDAndTaskID = async (userId: string, taskId: string): Promise<IUserTaskStatus> => {
	try {
		const taskStatus: IUserTaskStatus = await UserTaskStatus.findOne({
			userId,
			taskId,
		}).exec();
		return taskStatus;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.CODE,
			error,
		);
	}
};

export const fetchStatusByUserID = async (userId: string): Promise<IUserTaskStatus[]> => {
	try {
		const taskStatus: IUserTaskStatus[] = await UserTaskStatus.find({
			userId,
		}).exec();
		return taskStatus;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.CODE,
			error,
		);
	}
};

export const updateUserTaskStatus = async (taskId: string, taskStatus: IUserTaskStatus): Promise<void> => {
	try {
		await UserTaskStatus.updateOne(
			{
				taskId,
			},
			{
				$set: {
					...taskStatus,
				},
			},
			{ upsert: true },
		).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE,
			MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE,
			MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.CODE,
			error,
		);
	}
};
