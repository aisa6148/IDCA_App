import { MODEL_ERRORS } from '../../config/error';
import AppError from '../../utilities/error.utilities';
import { Plan } from '../model/plan.model';
import { IPlan } from '../schema/plan.schema';
import { ITask } from '../schema/task.schema';

export const fetchTaskList = async (planID: string, taskIDs: string[]): Promise<ITask[]> => {
	try {
		const plan = await Plan.findOne(
			{
				planID,
			},
		).exec();
		if (!plan.taskList) {
			throw new AppError(
				MODEL_ERRORS.PLAN_EMPTY.MESSAGE,
				MODEL_ERRORS.PLAN_EMPTY.MESSAGE,
				MODEL_ERRORS.PLAN_EMPTY.CODE,
			);
		}
		const taskListMap: { [index: string]: ITask } = {};
		for (const task of plan.taskList) {
			taskListMap[task.taskID] = task;
		}
		return taskIDs.map((taskID) => taskListMap[taskID]).filter((e) => e);
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.TASK_LIST_FAILURE.MESSAGE,
			MODEL_ERRORS.TASK_LIST_FAILURE.MESSAGE,
			MODEL_ERRORS.TASK_LIST_FAILURE.CODE,
			error,
		);
	}
};

export const deleteTaskByPlanID = async (planID: string): Promise<void> => {
	try {
		await Plan.updateOne(
			{
				planID,
			},
			{
				taskList: [],
			},
		).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.TASK_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.TASK_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.TASK_DELETION_FAILED.CODE,
			error,
		);
	}
};
