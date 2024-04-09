import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { v4 } from 'uuid';
import { ICreatePage } from '../../src/db/model/page.model';
import { IComponent } from '../../src/db/schema/component.schema';
import { failure, ROLES, success } from '../config/constants';
import { MODEL_ERRORS } from '../config/error';
import { EVENT_NAME } from '../config/log';
import { PAGE_STATUS } from '../config/page';
import { PAGE_TYPES } from '../config/page';
import { ICreatePageVersionHistory } from '../db/model/pageVersionHistory.model';
import { IAppHomeFields } from '../db/schema/appHomeItem.schema';
import { IComponentMedia } from '../db/schema/componentMedia.schema';
import { IPage } from '../db/schema/page.schema';
import {
	deleteComponentByPageID,
	deleteMediaFromPage,
	deletePage,
	deletePositioningPage,
	fetchComponentList,
	fetchPageByID,
	fetchPageByIDAndStatus,
	fetchPageByParentId,
	fetchPageByStatus,
	fetchPageByType,
	fetchPostioingData,
	findOnePageAndAddMedia,
	makePageActive,
	upsertPage,
	upsertPagePositioning,
} from '../db/services/page.service';
import { createPageVersion } from '../db/services/pageVersionHistory.services';
import {
	deleteImageFromBlob,
	getUploadedFileFromBlob,
	uploadMediaToBlob,
} from '../services/azureBlob';
import { IFrontEndPage, IFrontEndPagePositioning } from '../types/page';
import AppError, { controllerErrorHandler } from '../utilities/error.utilities';
import { LogError, LogEvent } from '../utilities/log.utilities';
import { convertToObjectID, createHistoryIDforVersion } from '../utilities/parser.utlilities';

class Page {
	public static async createPositioningEdit(req: Request, res: Response, next: NextFunction) {
		try {
			const body: IFrontEndPagePositioning = req.body;

			let pagePositioningID;
			const positioningData = await fetchPostioingData();
			if (positioningData.length !== 0) {
				pagePositioningID = body.pagePositioningID;
				if (!body.pagePositioningID) {
					return res.status(400).json({
						status: failure,
						message: 'positioning ID is Required',
					});
				}
			} else {
				pagePositioningID = body.pagePositioningID || v4();
			}
			if (
				body.appHomeItemListTopHeader.length > 4 ||
				body.appHomeItemListBottomFooter.length > 4
			) {
				return res.status(400).json({
					status: failure,
					message: 'size of the header and  footer should be less than 4',
				});
			}

			const slotHomeTop = [];
			body.appHomeItemListTopHeader.forEach((element) => {
				slotHomeTop.push(element.slot);
			});
			const uniqueTop = new Set(slotHomeTop).size !== slotHomeTop.length;
			if (uniqueTop === true) {
				return res.status(400).json({
					status: failure,
					message: 'slot number should distinct for top header',
				});
			}
			const slotHomeBottom = [];
			body.appHomeItemListBottomFooter.forEach((element) => {
				slotHomeBottom.push(element.slot);
			});
			const uniqueBottom = new Set(slotHomeBottom).size !== slotHomeBottom.length;
			if (uniqueBottom === true) {
				return res.status(400).json({
					status: failure,
					message: 'slot number should distinct for bottom',
				});
			}
			const positioningTopHeaderList =
				body.appHomeItemListTopHeader &&
				body.appHomeItemListTopHeader.map((positioning: IAppHomeFields) => ({
					pageID: positioning.pageID,
					pageName: positioning.pageName,
					pageIcon: positioning.pageIcon,
					slot: positioning.slot,
				}));
			const positioningAppFooterList =
				body.appHomeItemListBottomFooter &&
				body.appHomeItemListBottomFooter.map((positioning: IAppHomeFields) => ({
					pageID: positioning.pageID,
					pageName: positioning.pageName,
					pageIcon: positioning.pageIcon,
					slot: positioning.slot,
				}));
			const pagePositioning = {
				pagePositioningID,
				appHomeTopHeader: positioningTopHeaderList,
				appHomeBottomFooter: positioningAppFooterList,
			};

			await upsertPagePositioning(
				pagePositioning,
				positioningTopHeaderList,
				positioningAppFooterList,
			);
			res.json({
				status: success,
				message: 'Page positioning successfully updated',
				pagePositioningID,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async getPostioningPage(req: Request, res: Response, next: NextFunction) {
		try {
			const positioningData = await fetchPostioingData();
			res.json({
				status: success,
				message: 'Page Positioning listed',
				reesult: positioningData,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getPostioningPageReset(req: Request, res: Response, next: NextFunction) {
		try {
			const pagePositioningID = req.params.id;
			const positioingTopHeaderList = [];
			const positioingAppFooterList = [];
			const pagePositioning = {
				pagePositioningID,
				appHomeTopHeader: positioingTopHeaderList,
				appHomeBottomFooter: positioingAppFooterList,
			};

			await upsertPagePositioning(
				pagePositioning,
				positioingTopHeaderList,
				positioingAppFooterList,
			);
			res.json({
				status: success,
				message: 'Page Reseted Succesfully',
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async deletePostioningPage(req: Request, res: Response, next: NextFunction) {
		try {
			const pagePositioningID = req.params.id;
			const result = await deletePositioningPage(pagePositioningID);
			res.json({
				status: success,
				message: 'Page positioning deleted Succesfully',
				result,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async fetchPageChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.params;
			if (![PAGE_TYPES.PREONBOARDING].includes(type)) {
				throw new AppError(
					MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PLAN_TYPE.CODE,
				);
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async fetchPage(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.params;
			const pages: IPage[] = await fetchPageByType(type);
			res.json({
				status: success,
				pages,
				message: 'Page successfully fetched',
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async fetchPageByID(req: Request, res: Response, next: NextFunction) {
		try {
			const page: IPage = await fetchPageByID(req.params.id);
			res.json({
				status: success,
				page,
				message: 'Page successfully fetched',
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async pageIDChecks(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.params.id) {
				throw new AppError(
					MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PAGE_ID_MISSING.CODE,
				);
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async createPage(req: Request, res: Response, next: NextFunction) {
		try {
			const body: IFrontEndPage = req.body;
			const { type } = req.params;
			const pageID = body.pageID || v4();
			res.locals.userID = 'admin';
			const componentList =
				body.componentList &&
				body.componentList.map((component: IComponent) => ({
					_id: convertToObjectID(component.componentID),
					componentID: component.componentID,
					componentType: component.componentType,
					fields: component.fields,
				}));
			const page: IPage = {
				pageType: type,
				pageID,
				pageVersion: 0,
				pageName: body.pageName,
				status: PAGE_STATUS.DRAFT,
				description: body.description,
				createdBy: res.locals.userID,
				// @ts-ignore
				componentList,
			};
			// @ts-ignore
			await upsertPage(page, componentList || []);
			res.json({
				status: success,
				message: 'Page successfully updated',
				pageID,
				parentPageID: undefined,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async createPageChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const { pageName, description, pageID } = req.body;
			const { type } = req.params;
			if (![PAGE_TYPES.PREONBOARDING].includes(type)) {
				throw new AppError(
					MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PAGE_TYPE.CODE,
				);
			}
			if (!pageName) {
				throw new AppError(
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE,
				);
			}
			if (pageID) {
				const page = await fetchPageByID(pageID);
				if (page.status && page.status !== PAGE_STATUS.DRAFT) {
					throw new AppError(
						MODEL_ERRORS.PAGE_UPDATE_FAILED.MESSAGE,
						MODEL_ERRORS.PAGE_UPDATE_FAILED.MESSAGE +
							` - Page is in ${page.status} state.`,
						MODEL_ERRORS.PAGE_UPDATE_FAILED.CODE,
					);
				}
				if (page.pageVersion && page.pageVersion !== 0) {
					throw new AppError(
						MODEL_ERRORS.INVALID_PAGE_VERSION.MESSAGE,
						MODEL_ERRORS.INVALID_PAGE_VERSION.MESSAGE,
						MODEL_ERRORS.INVALID_PAGE_VERSION.CODE,
					);
				}
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async fetchActivePages(req: Request, res: Response, next: NextFunction) {
		try {
			const pageType: string = PAGE_TYPES.PREONBOARDING;
			const data = await fetchPageByStatus(pageType, PAGE_STATUS.ACTIVE);
			res.json({
				status: success,
				data,
				message: 'Successfully fetched data',
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async fetchActivePagesByID(req: Request, res: Response, next: NextFunction) {
		try {
			const pageID = req.params.id;
			const pageType: string = PAGE_TYPES.PREONBOARDING;
			const data = await fetchPageByIDAndStatus(pageType, pageID, PAGE_STATUS.ACTIVE);
			res.json({
				status: success,
				data,
				message: 'Successfully fetched data',
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async deletePage(req: Request, res: Response, next: NextFunction) {
		try {
			const page: IPage = res.locals.page;
			await deletePage(page.pageID);
			res.json({
				status: success,
				message: 'Successfully deleted page data',
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async createPageEdit(req: Request, res: Response, next: NextFunction) {
		try {
			const changes: any = {};
			const parentPageID = req.params.id;
			const parentPage: IPage = res.locals.page;
			let editPage: IPage;
			try {
				editPage = await fetchPageByParentId(parentPageID);
				if (
					editPage.pageVersion === parentPage.pageVersion &&
					editPage.pageID !== parentPage.pageID
				) {
					// this case should not happen, if it does, to handle the case
					editPage = undefined;
					LogError(
						new Error('editPage.pageVersion === parentPage.pageVersion'),
						'editPageVersionSameAsParentVersion',
						{ parentPageID },
					);
					await deletePage(editPage.pageID);
				}
			} catch (e) {
				editPage = undefined;
				LogError(e, 'createPageEdit-fetchEditPageFailed', { parentPageID });
			}
			const body: IPage = req.body;
			if (
				body &&
				editPage &&
				body.pageID &&
				editPage.pageID &&
				body.pageID !== editPage.pageID
			) {
				throw new AppError(
					MODEL_ERRORS.PAGE_ID_NOTVALID.MESSAGE,
					MODEL_ERRORS.PAGE_ID_NOTVALID.MESSAGE,
					MODEL_ERRORS.PAGE_ID_NOTVALID.CODE,
				);
			}
			const pageID = (editPage && editPage.pageID) || v4();
			const pageVersion =
				(editPage && editPage.pageVersion) || (parentPage.pageVersion || 0) + 1;
			const status = PAGE_STATUS.EDIT_ACTIVE;
			const pageName = body.pageName;
			const description = body.description;

			if (!(editPage && editPage.parentPageID === parentPageID)) {
				changes.parentPageID = parentPageID;
			}
			if (!(editPage && editPage.pageID === pageID)) {
				changes.pageID = pageID;
			}
			if (!(editPage && editPage.pageVersion === pageVersion)) {
				changes.pageVersion = pageVersion;
			}
			if (!(editPage && editPage.status === status)) {
				changes.status = status;
			}
			if (!(editPage ? editPage.pageName === pageName : parentPage.pageName === pageName)) {
				changes.pageName = pageName;
			}
			if (
				!(editPage
					? editPage.description === description
					: parentPage.description === description)
			) {
				changes.description = description;
			}
			const toUpdateComponent: IComponent[] = [];
			let newComponentList =
				body.componentList &&
				body.componentList.map((component) => {
					// @ts-ignore
					const componentv: IComponent = {
						componentID: component.componentID,
						componentType: parentPage.pageType,
						fields: component.fields,
					};
					toUpdateComponent.push(componentv);
					return componentv;
				});

			newComponentList = newComponentList || [];
			changes.component = toUpdateComponent;

			// @ts-ignore
			const componentList: IComponent[] = newComponentList.map((component: IComponent) => ({
				_id: convertToObjectID(component.componentID),
				componentID: component.componentID,
			}));

			const newPage = {
				pageType: parentPage.pageType,
				pageID,
				pageVersion,
				parentPageID,
				status,
				pageName,
				description,
				updatedBy: res.locals.userID,
				createdBy: res.locals.userID,
				componentList,
			};

			await upsertPage(newPage, toUpdateComponent);
			LogEvent('createPageEdit-upsertPageSuccess', {
				parentPageID,
				newpageID: newPage.pageID,
			});
			res.json({
				status: success,
				message: 'Successfully updated page edit',
				pageID,
				parentPageID,
				changes,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async createPageEditChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const { pageName, description, pageType } = req.body;
			const pageID = req.params.id;
			if (!pageID) {
				throw new AppError(
					MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PAGE_ID_MISSING.CODE,
				);
			}
			const page = await fetchPageByID(req.params.id);
			res.locals.page = page;
			if (!page) {
				throw new AppError(
					MODEL_ERRORS.PAGE_EMPTY.MESSAGE,
					MODEL_ERRORS.PAGE_EMPTY.MESSAGE,
					MODEL_ERRORS.PAGE_EMPTY.CODE,
				);
			}

			if (!pageName) {
				throw new AppError(
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE,
				);
			}
			if (!description) {
				throw new AppError(
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.CODE,
				);
			}
			if (![PAGE_TYPES.PREONBOARDING].includes(pageType)) {
				throw new AppError(
					MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PAGE_TYPE.CODE,
				);
			}
			if (![PAGE_STATUS.ACTIVE, PAGE_STATUS.EDIT_ACTIVE].includes(page.status)) {
				throw new AppError(
					MODEL_ERRORS.PAGE_NOT_PUBLISHED.MESSAGE,
					MODEL_ERRORS.PAGE_NOT_PUBLISHED.MESSAGE,
					MODEL_ERRORS.PAGE_NOT_PUBLISHED.CODE,
				);
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async makePageActiveChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const page = await fetchPageByID(req.params.id);
			const componentIDs = page.componentList.map((component) => {
				return component.componentID;
			});
			if (page.status === PAGE_STATUS.ACTIVE) {
				throw new AppError(
					MODEL_ERRORS.PAGE_ALREADY_ACTIVE.MESSAGE,
					MODEL_ERRORS.PAGE_ALREADY_ACTIVE.MESSAGE,
					MODEL_ERRORS.PAGE_ALREADY_ACTIVE.CODE,
				);
			}
			if (page.status !== PAGE_STATUS.DRAFT) {
				throw new AppError(
					MODEL_ERRORS.PAGE_NOT_IN_DRAFT.MESSAGE,
					MODEL_ERRORS.PAGE_NOT_IN_DRAFT.MESSAGE + ` - Page is in ${page.status} state.`,
					MODEL_ERRORS.PAGE_NOT_IN_DRAFT.CODE,
				);
			}
			if (!page.description) {
				throw new AppError(
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.CODE,
				);
			}
			if (!page.pageName) {
				throw new AppError(
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE,
				);
			}
			res.locals.page = page;
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async makePageActive(req: Request, res: Response, next: NextFunction) {
		try {
			const page: IPage = res.locals.page;
			await makePageActive(page.pageID, PAGE_STATUS.ACTIVE);
			res.json({
				status: success,
				message: 'Page Successfully Active',
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async publishPageEditChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const parentPageID = req.params.id;
			if (!parentPageID) {
				throw new AppError(
					MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PAGE_ID_MISSING.CODE,
				);
			}

			const parentPage = await fetchPageByID(parentPageID);
			const editPage = await fetchPageByParentId(parentPageID);
			res.locals.editPage = editPage;
			res.locals.parentPage = parentPage;
			res.locals.editPageID = editPage.pageID;
			res.locals.parentPageID = parentPageID;

			const componentIDs = editPage.componentList.map((component) => {
				return component.componentID;
			});
			let componentList = await fetchComponentList(editPage.pageID, componentIDs); // check
			const componentListFromParent = await fetchComponentList(parentPageID, componentIDs);
			componentList = componentList.concat(componentListFromParent);

			if (editPage.status !== PAGE_STATUS.EDIT_ACTIVE) {
				throw new AppError(
					MODEL_ERRORS.PAGE_NOT_IN_EDIT.MESSAGE,
					MODEL_ERRORS.PAGE_NOT_IN_EDIT.MESSAGE +
						` - Page is in ${editPage.status} state.`,
					MODEL_ERRORS.PAGE_NOT_IN_EDIT.CODE,
				);
			}
			if (editPage.pageVersion === parentPage.pageVersion) {
				throw new AppError(
					MODEL_ERRORS.PAGE_AND_EDIT_VERSION_SAME.MESSAGE,
					MODEL_ERRORS.PAGE_AND_EDIT_VERSION_SAME.MESSAGE,
					MODEL_ERRORS.PAGE_AND_EDIT_VERSION_SAME.CODE,
				);
			}
			if (!editPage.description) {
				throw new AppError(
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.CODE,
				);
			}
			if (!editPage.pageName) {
				throw new AppError(
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE,
				);
			}
			if (componentList.length === 0) {
				throw new AppError(
					MODEL_ERRORS.PAGE_EMPTY.MESSAGE,
					MODEL_ERRORS.PAGE_EMPTY.MESSAGE,
					MODEL_ERRORS.PAGE_EMPTY.CODE,
				);
			}
			for (const component of componentList) {
				switch (editPage.pageType) {
					case PAGE_TYPES.PREONBOARDING:
						break;
					default:
						throw new AppError(
							MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE,
							MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE,
							MODEL_ERRORS.INVALID_PAGE_TYPE.CODE,
						);
				}
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async publishPageEdit(req: Request, res: Response, next: NextFunction) {
		try {
			const parentPage: IPage = res.locals.parentPage;
			const editPage: IPage = res.locals.editPage;
			const parentPageID = res.locals.parentPageID;

			const changes: any = {};

			const versionHistoryPage: ICreatePageVersionHistory = {
				createdBy: res.locals.userID,
				pageID: parentPageID,
				pageVersion: parentPage.pageVersion || 0,
				historyID: createHistoryIDforVersion(parentPageID, parentPage.pageVersion || 0),
				page: parentPage,
			};

			const updatedPage: ICreatePage = {
				pageType: parentPage.pageType,
				pageID: parentPage.pageID,
				pageVersion: editPage.pageVersion,
				status: PAGE_STATUS.ACTIVE,
				pageName: editPage.pageName,
				description: editPage.description,
				createdBy: res.locals.userID,
				componentList: editPage.componentList,
			};

			const promiseList: Array<Promise<any>> = [];
			LogEvent('publishPageEdit-StartingHistoryPush', {
				parentPageID,
				editPageID: editPage.pageID,
			});
			promiseList.push(createPageVersion(versionHistoryPage)); // create page version history
			await Promise.all(promiseList);
			LogEvent('publishPageEdit-FinishedHistoryPush', {
				parentPageID,
				editPageID: editPage.pageID,
			});

			await upsertPage(updatedPage, updatedPage.componentList);
			LogEvent('publishPageEdit-updatePage-UpsertPageComplete', {
				parentPageID: updatedPage.pageID,
			}); // update parent page and components + publish
			await Page.purgePageWithComponent(editPage.pageID); // purge components to be deleted

			res.json({
				status: success,
				message: 'Successfully Updated and Published page edit',
				changes,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	/**
	 * upload media file from onboard screen
	 * @param req
	 * @param res
	 */
	public static async uploadMedia(req: Request, res: Response) {
		try {
			const { fileName, pageID, componentID, fileSize, fileType  } = req.body;
			const mediaID = req.body.mediaID || v4();
			const fileContent = req.file.buffer;
			// extract formData
			if (!pageID) {
				return res.status(400).json({
					status: failure,
					message: 'Page ID not present',
				});
			}
			let uploadMediaRes;
			let addedFile;
			try {
				const generatedFileName = Page.generateBlobFileName(fileName, mediaID);
				uploadMediaRes = await uploadMediaToBlob(generatedFileName, fileContent);
				// save content to mongo db
				const uploadMedia: IComponentMedia = {
					mediaID,
					mediaName: fileName,
					contentSize: fileSize,
					mimeType: fileType,
				};
				addedFile = await findOnePageAndAddMedia(pageID, componentID, uploadMedia);
			} catch (error) {
				// log error
				LogError(error, EVENT_NAME.BLOB_MEDIA_UPLOAD_FAIL, {
					action: 'uploadMedia',
					pageID,
					fileName,
				});
			}

			if (!uploadMediaRes) {
				return res.status(400).json({
					status: failure,
					message: 'Failed to upload the media file',
					data: [],
				});
			} else {
				return res.json({
					status: success,
					message: 'Successfully uploaded the media file',
					data: addedFile,
				});
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	/**
	 *
	 * @param fileName fetch media files
	 */
	public static async fetchMediaFile(req: Request, res: Response) {
		try {
			const { fileName, mediaID } = req.params;
			const fetchFileName = Page.generateBlobFileName(fileName, mediaID);
			try {
				const file = await getUploadedFileFromBlob(fetchFileName);
				if (file) {
					res.end(file);
				} else {
					res.status(404).end();
				}
			} catch (error) {
				LogError(error, EVENT_NAME.BLOB_MEDIA_FETCH_FAIL, {
					action: 'fetchMediaFile',
					mediaID,
					fetchFileName,
				});
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	/**
	 *
	 * @param pageID
	 * @param fileName
	 */
	public static async deleteMediaFile(req: Request, res: Response, next: NextFunction) {
		try {
			const { pageID, componentID, fileName, mediaID } = req.params;
			const response = await deleteMediaFromPage(pageID, componentID, mediaID);
			if (!response) {
				return res
					.json({
						status: 'failure',
						message: MODEL_ERRORS.DELETE_MEDIA_FAILED.MESSAGE,
						display: false,
						response,
					})
					.status(200);
			}
			const blobFileName = Page.generateBlobFileName(fileName, pageID);
			await deleteImageFromBlob(blobFileName);
			return res
				.json({
					status: 'success',
					message: 'Successfully deleted the media',
					display: true,
					response,
				})
				.status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	private static generateBlobFileName(fileName: string, pageID: string) {
		const blobName = `${pageID}__${fileName}`;
		return blobName;
	}

	private static async purgePageWithComponent(pageID: string) {
		try {
			const promiseList: Array<Promise<any>> = [];
			promiseList.push(deleteComponentByPageID(pageID)); // purge currentPageEditComponents
			promiseList.push(deletePage(pageID)); // purge currentPageEdit
			await Promise.all(promiseList);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
}
export default Page;
