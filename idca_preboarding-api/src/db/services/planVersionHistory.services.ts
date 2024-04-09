import { MODEL_ERRORS } from '../../config/error';
import AppError from '../../utilities/error.utilities';
import {
	ICreatePlanVersionHistory,
	PlanVersionHistoryModel,
} from '../model/planVersionHistory.model';
import { IPlanVersionHistory } from '../schema/planVersionHistory.schema';

export const createPlanVersion = async (
	planVersionHistory: ICreatePlanVersionHistory,
) => {
	try {
		const savedPlanVersionHistory: IPlanVersionHistory = await new PlanVersionHistoryModel(
			planVersionHistory,
		).save({
			validateBeforeSave: true,
		});
		return savedPlanVersionHistory;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.MESSAGE,
			MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.MESSAGE,
			MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.CODE,
			error,
		);
	}
};

export const fetchPlanHistoryWithPlanID = async (
	planID: string,
): Promise<IPlanVersionHistory[]> => {
	try {
		const planQuery = PlanVersionHistoryModel.find({ planID });
		const returnList: IPlanVersionHistory[] = await planQuery.exec();
		return returnList;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.FETCH_PLAN_VERSIONHISTORY_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_VERSIONHISTORY_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PLAN_VERSIONHISTORY_FAILURE.CODE,
			error,
		);
	}
};
