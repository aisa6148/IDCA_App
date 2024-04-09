import { v4 } from 'uuid';
import { MODEL_ERRORS } from '../../config/error';
import { PAGE_STATUS } from '../../config/page';
import AppError from '../../utilities/error.utilities';
import { mongodbErrorHandler } from '../../utilities/mongo.utilities';
import { ICreatePage, Page } from '../model/page.model';
import { ICreatePagePositioning, PagePositioingModel } from '../model/pagePositioning.model';
import { IAppHomeFields } from '../schema/appHomeItem.schema';
import { IComponent } from '../schema/component.schema';
import { IComponentMedia } from '../schema/componentMedia.schema';
import { IPage } from '../schema/page.schema';
export const fetchComponentList = async (
	pageID: string,
	componentIDs: string[],
): Promise<IComponent[]> => {
	try {
		const componentList: IPage = await Page.findOne({
			pageID,
		}).exec();
		if (!componentList) {
			throw new AppError(
				MODEL_ERRORS.PAGE_EMPTY.MESSAGE,
				MODEL_ERRORS.PAGE_EMPTY.MESSAGE,
				MODEL_ERRORS.PAGE_EMPTY.CODE,
			);
		}
		const componentListMap: { [index: string]: IComponent } = {};
		for (const component of componentList.componentList) {
			componentListMap[component.componentID] = component;
		}
		return componentIDs.map((componentID) => componentListMap[componentID]).filter((e) => e);
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.COMPONENT_LIST_FAILURE.MESSAGE,
			MODEL_ERRORS.COMPONENT_LIST_FAILURE.MESSAGE,
			MODEL_ERRORS.COMPONENT_LIST_FAILURE.CODE,
			error,
		);
	}
};

export const fetchPostioingData = async (): Promise<any> => {
	try {
		const query = PagePositioingModel.find(
			{},
			{
				_id: 0,
			},
		);
		const returnList = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};
export const fetchPageByType = async (pageType: string): Promise<IPage[]> => {
	try {
		const pageQuery = Page.aggregate([
			{ $match: { pageType } },
			{
				$project: {
					_id: 0,
					pageType: 1,
					pageID: 1,
					pageVersion: 1,
					parentPageID: 1,
					pageName: 1,
					status: 1,
					createdOn: 1,
					createdBy: 1,
					updatedOn: 1,
					updatedBy: 1,
					count: { $size: '$componentList' },
				},
			},
		]);
		const returnList: IPage[] = await pageQuery.exec();
		return returnList;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE,
			error,
		);
	}
};

export const fetchPageByID = async (pageID: string): Promise<IPage> => {
	try {
		const page: IPage = await Page.findOne({
			pageID,
		}).exec();
		if (!page) {
			throw new AppError(
				MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
				MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
				MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE,
			);
		}
		return page;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE,
			error,
		);
	}
};

export const upsertPage = async (page: ICreatePage, component: IComponent[]): Promise<void> => {
	try {
		const pageID = page.pageID || v4();
		await Page.updateOne(
			{
				pageID,
			},
			{
				$set: {
					...page,
					componentList: component,
					pageID,
				},
			},
			{ upsert: true },
		).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.PAGE_CREATION_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_CREATION_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_CREATION_FAILED.CODE,
			error,
		);
	}
};

export const upsertPagePositioning = async (
	pagePositioning: ICreatePagePositioning,
	pagePositioningItemHeader: IAppHomeFields[],
	pagePositioningItemFooter: IAppHomeFields[],
): Promise<void> => {
	try {
		const pagePositioningID = pagePositioning.pagePositioningID;
		await PagePositioingModel.updateOne(
			{
				pagePositioningID,
			},
			{
				$set: {
					...pagePositioning,
					appHomeTopHeader: pagePositioningItemHeader,
					appHomeBottomFooter: pagePositioningItemFooter,
					pagePositioningID,
				},
			},
			{ upsert: true },
		).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.PAGE_POSITIONING_UPSERT_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_POSITIONING_UPSERT_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_POSITIONING_UPSERT_FAILED.CODE,
			error,
		);
	}
};

export const deletePositioningPage = async (pagePositioningID: string): Promise<void> => {
	try {
		await PagePositioingModel.remove().exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_DELETION_FAILED.CODE,
			error,
		);
	}
};

export const fetchPageByStatus = async (pageType: string, status: string): Promise<IPage[]> => {
	try {
		const pages = await Page.find(
			{
				pageType,
				status,
			},
			{
				_id: 0,
				pageType: 1,
				pageID: 1,
				pageVersion: 1,
				parentPageID: 1,
				pageName: 1,
				status: 1,
				createdOn: 1,
				createdBy: 1,
				updatedOn: 1,
				updatedBy: 1,
			},
		).exec();
		if (!pages) {
			throw new Error();
		}
		return pages;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE,
			error,
		);
	}
};

export const fetchPageByIDAndStatus = async (
	pageType: string,
	pageID: string,
	status: string,
): Promise<IPage> => {
	try {
		const pages = await Page.findOne(
			{
				pageID,
				pageType,
				status,
			},
			{
				_id: 0,
				pageType: 1,
				pageID: 1,
				pageVersion: 1,
				parentPageID: 1,
				pageName: 1,
				status: 1,
				createdOn: 1,
				createdBy: 1,
				updatedOn: 1,
				updatedBy: 1,
			},
		).exec();
		if (!pages) {
			throw new Error();
		}
		return pages;
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE,
			MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE,
			error,
		);
	}
};

export const deletePage = async (pageID: string): Promise<void> => {
	try {
		await Page.deleteOne({
			pageID,
		}).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_DELETION_FAILED.CODE,
			error,
		);
	}
};

export const fetchPageByParentId = async (pageID: string): Promise<IPage> => {
	try {
		const page: IPage = await Page.findOne({
			parentPageID: pageID,
		}).exec();
		if (!page) {
			throw new AppError(
				MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE,
				MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE,
				MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.CODE,
			);
		}
		return page;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE,
			MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.CODE,
			error,
		);
	}
};

export const deleteComponentByPageID = async (pageID: string): Promise<void> => {
	try {
		await Page.updateOne(
			{
				pageID,
			},
			{
				componentList: [],
			},
		).exec();
	} catch (error) {
		throw new AppError(
			MODEL_ERRORS.COMPONENT_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.COMPONENT_DELETION_FAILED.MESSAGE,
			MODEL_ERRORS.COMPONENT_DELETION_FAILED.CODE,
			error,
		);
	}
};

export const makePageActive = async (pageID: string, status: string): Promise<void> => {
	try {
		await Page.updateMany(
			{
				status: PAGE_STATUS.ACTIVE,
			},
			{
				$set: {
					status: PAGE_STATUS.DRAFT,
				},
			},
		).exec();
		await Page.updateOne(
			{
				pageID,
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

/**
 *
 * findOnePageAndAddMedia
 * @param pageID
 * @param mediaList
 */
export const findOnePageAndAddMedia = async (
	pageID: string,
	componentID: string,
	mediaItem: IComponentMedia,
): Promise<IComponentMedia> => {
	try {
		const mediaQuery = Page.findOneAndUpdate(
			{
				pageID,
				'componentList.componentID': componentID,
			},
			{
				$push: { 'componentList.$.mediaList': mediaItem },
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
 * @param pageID
 * @param mediaID
 */
export const deleteMediaFromPage = async (
	pageID: string,
	componentID: string,
	mediaID: string,
): Promise<boolean> => {
	try {
		Page.updateOne(
			{
				pageID,
				'componentList.componentID': componentID,
			},
			{
				// @ts-ignore
				$pull: { 'componentList.$.mediaList': { mediaID: { $in: mediaID } } },
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
