import { MODEL_ERRORS } from '../../config/error';
import AppError from '../../utilities/error.utilities';
import {
	ICreatePageVersionHistory,
	PageVersionHistoryModel,
} from '../model/pageVersionHistory.model';
import { IPageVersionHistory } from '../schema/pageVersionHistory.schema';

export const createPageVersion = async (
	pageVersionHistory: ICreatePageVersionHistory,
) => {
	try {
		const savedPageVersionHistory: IPageVersionHistory = await new PageVersionHistoryModel(
			pageVersionHistory,
		).save({
			validateBeforeSave: true,
		});
		return savedPageVersionHistory;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.MESSAGE,
			MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.MESSAGE,
			MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.CODE,
			error,
		);
	}
};

export const fetchPageHistoryWithPageID = async (
	pageID: string,
): Promise<IPageVersionHistory[]> => {
	try {
		const pageQuery = PageVersionHistoryModel.find({ pageID });
		const returnList: IPageVersionHistory[] = await pageQuery.exec();
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
