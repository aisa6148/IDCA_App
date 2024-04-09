import { v4 } from 'uuid';
import { MODEL_ERRORS } from '../../config/error';
import { PLAN_STATUS, PLAN_TYPES } from '../../config/plan';
import AppError from '../../utilities/error.utilities';
import { ICreatePlan, Plan } from '../model/plan.model';
import { IPlan } from '../schema/plan.schema';
import { IPlanMedia } from '../schema/planMedia.schema';
import { ITask } from '../schema/task.schema';

export const fetchPlanByType = async (planType: string): Promise<IPlan[]> => {
	try {
		const planQuery = Plan.aggregate([
			{ $match: { planType } },
			{
				$project: {
					_id: 0,
					planType: 1,
					planID: 1,
					parentPlanID: 1,
					planName: 1,
					status: 1,
					createdOn: 1,
					createdBy: 1,
					updatedOn: 1,
					updatedBy: 1,
					count: { $size: '$taskList' },
				},
			},
		]);
		const returnList: IPlan[] = await planQuery.exec();
		return returnList;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE,
			error,
		);
	}
};

export const fetchPlanByID = async (planID: string): Promise<IPlan> => {
	try {
		const plan: IPlan = await Plan.findOne({
			planID,
		}).exec();
		if (!plan) {
			throw new AppError(
				MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
				MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
				MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE,
			);
		}
		return plan;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE,
			error,
		);
	}
};

export const fetchActivePlan = async (status: string, planType: string): Promise<IPlan[]> => {
	try {
		const planQuery = Plan.find(
			{
				status,
				planType,
			},
			{
				planID: 1,
				planName: 1,
				planType: 1,
				taskList: 1,
			},
		);
		const returnList: IPlan[] = await planQuery.exec();
		return returnList;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.FETCH_PREONBOARDING_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PREONBOARDING_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PREONBOARDING_PLAN_FAILURE.CODE,
			error,
		);
	}
};

export const fetchPlansByStatus = async (planTypes: string[], status: string): Promise<IPlan[]> => {
	try {
		const plans = await Plan.find(
			{
				planType: {
					$in: planTypes,
				},
				status,
			},
			{
				_id: 0,
				planType: 1,
				planID: 1,
				planName: 1,
				status: 1,
				createdOn: 1,
				createdBy: 1,
				updatedOn: 1,
				updatedBy: 1,
			},
		).exec();
		if (!plans) {
			throw new Error();
		}
		return plans;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE,
			error,
		);
	}
};

export const makePlanActive = async (planID: string, status: string): Promise<void> => {
	try {
		await Plan.updateMany(
			{
				status: PLAN_STATUS.ACTIVE,
			},
			{
				$set: {
					status: PLAN_STATUS.DRAFT,
				},
			},
		).exec();
		await Plan.updateOne(
			{
				planID,
			},
			{
				status,
			},
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

export const deletePlan = async (planID: string): Promise<void> => {
	try {
		await Plan.deleteOne({
			planID,
		}).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.PLAN_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.PLAN_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.PLAN_DELETION_FAILED.CODE,
			error,
		);
	}
};

export const upsertPlan = async (plan: ICreatePlan, tasks: ITask[]): Promise<void> => {
	try {
		const planID = plan.planID || v4();
		await Plan.updateOne(
			{
				planID,
			},
			{
				$set: {
					...plan,
					taskList: tasks,
					planID,
				},
			},
			{ upsert: true },
		).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.PLAN_CREATION_FAILED.MESSAGE,
			MODEL_ERRORS.PLAN_CREATION_FAILED.MESSAGE,
			MODEL_ERRORS.PLAN_CREATION_FAILED.CODE,
			error,
		);
	}
};

export const fetchPlanByParentId = async (planID: string): Promise<IPlan> => {
	try {
		const plan: IPlan = await Plan.findOne({
			parentPlanID: planID,
		}).exec();
		if (!plan) {
			throw new AppError(
				MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE,
				MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE,
				MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.CODE,
			);
		}
		return plan;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE,
			MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE,
			MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.CODE,
			error,
		);
	}
};

/**
 *
 * findOnePlanAndAddMedia
 * @param planID
 * @param mediaList
 */
export const findOnePlanAndAddMedia = async (
	planID: string,
	taskID: string,
	mediaItem: IPlanMedia,
): Promise<IPlanMedia> => {
	try {
		const mediaQuery = Plan.findOneAndUpdate(
			{
				planID,
				'taskList.taskID': taskID,
			},
			{
				$push: { 'taskList.$.mediaList': mediaItem },
			},
		);
		await mediaQuery.exec();
		return mediaItem;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.MESSAGE,
			MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.MESSAGE,
			MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.CODE,
			error,
		);
	}
};

/**
 *
 * @param planID
 * @param taskID
 * @param mediaID
 */
export const deleteMediaFromPlan = async (
	planID: string,
	taskID: string,
	mediaID: string,
): Promise<boolean> => {
	try {
		Plan.updateOne(
			{
				planID,
				'taskList.taskID': taskID,
			},
			{
				// @ts-ignore
				$pull: { 'taskList.$.mediaList': { mediaID: { $in: mediaID } } },
			},
		).exec();
		return true;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.CODE,
			error,
		);
	}
};
