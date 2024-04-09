import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { v4 } from 'uuid';
import { failure, ROLES, success } from '../config/constants';
import { MODEL_ERRORS } from '../config/error';
import { EVENT_NAME } from '../config/log';
import { PLAN_STATUS } from '../config/plan';
import { PLAN_TYPES } from '../config/plan';
import { ICreatePlan } from '../db/model/plan.model';
import { ICreatePlanVersionHistory } from '../db/model/planVersionHistory.model';
import { IPlan } from '../db/schema/plan.schema';
import { IPlanMedia } from '../db/schema/planMedia.schema';
import { ITask } from '../db/schema/task.schema';
import {
	deleteMediaFromPlan,
	deletePlan,
	fetchPlanByID,
	fetchPlanByParentId,
	fetchPlanByType,
	fetchPlansByStatus,
	findOnePlanAndAddMedia,
	makePlanActive,
	upsertPlan,
} from '../db/services/plan.service';
import { createPlanVersion } from '../db/services/planVersionHistory.services';
import { deleteTaskByPlanID, fetchTaskList } from '../db/services/task.service';
import { compareTasksBasicDetails } from '../db/utilities/task.utilities';
import {
	deleteImageFromBlob,
	getUploadedFileFromBlob,
	uploadMediaToBlob,
} from '../services/azureBlob';
import { IFrontEndPlan } from '../types/plan';
import AppError, { controllerErrorHandler } from '../utilities/error.utilities';
import { LogError, LogEvent } from '../utilities/log.utilities';
import { convertToObjectID, createHistoryIDforVersion } from '../utilities/parser.utlilities';
class Plan {
	public static async fetchPlansChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.params;
			if (![PLAN_TYPES.PREONBOARDING].includes(type)) {
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
	public static async fetchPlans(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.params;
			const plans: IPlan[] = await fetchPlanByType(type);
			res.json({
				status: success,
				plans,
				message: 'Plans successfully fetched',
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async fetchPlanByID(req: Request, res: Response, next: NextFunction) {
		try {
			const plan: IPlan = await fetchPlanByID(req.params.id);
			res.json({
				status: success,
				plan,
				message: 'Plan successfully fetched',
				display: false,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async planIDChecks(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.params.id) {
				throw new AppError(
					MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PLAN_ID_MISSING.CODE,
				);
			}
			const plan = await fetchPlanByID(req.params.id);
			if (!plan.planName) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE,
				);
			}
			res.locals.plan = plan;
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async fetchActivePlans(req: Request, res: Response, next: NextFunction) {
		try {
			const planTypes: string[] = [];
			if (res.locals.roles.includes(ROLES.ADMIN)) {
				planTypes.push('PREONBOARDING');
			}
			if (res.locals.roles.includes(ROLES.MANAGER)) {
				planTypes.push('PROJECT');
			}
			const data = await fetchPlansByStatus(planTypes, PLAN_STATUS.ACTIVE);
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

	public static async makePlanActive(req: Request, res: Response, next: NextFunction) {
		try {
			const plan: IPlan = res.locals.plan;
			await makePlanActive(plan.planID, PLAN_STATUS.ACTIVE);
			res.json({
				status: success,
				message: 'Plan Successfully Active',
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async makePlanActiveChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const plan = await fetchPlanByID(req.params.id);
			const taskIDs = plan.taskList.map((task) => {
				return task.taskID;
			});
			if (plan.status === PLAN_STATUS.ACTIVE) {
				throw new AppError(
					MODEL_ERRORS.PLAN_ALREADY_ACTIVE.MESSAGE,
					MODEL_ERRORS.PLAN_ALREADY_ACTIVE.MESSAGE,
					MODEL_ERRORS.PLAN_ALREADY_ACTIVE.CODE,
				);
			}
			if (plan.status !== PLAN_STATUS.DRAFT) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NOT_IN_DRAFT.MESSAGE,
					MODEL_ERRORS.PLAN_NOT_IN_DRAFT.MESSAGE + ` - Plan is in ${plan.status} state.`,
					MODEL_ERRORS.PLAN_NOT_IN_DRAFT.CODE,
				);
			}
			if (!plan.planName) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE,
				);
			}
			res.locals.plan = plan;
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async deletePlan(req: Request, res: Response, next: NextFunction) {
		try {
			const plan: IPlan = res.locals.plan;
			await deletePlan(plan.planID);
			res.json({
				status: success,
				message: 'Successfully deleted plan data',
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async createPlan(req: Request, res: Response, next: NextFunction) {
		try {
			const body: IFrontEndPlan = req.body;
			const { type } = req.params;
			const planID = body.planID || v4();
			const taskList =
				body.taskList &&
				body.taskList.map((task) => ({
					taskID: task.taskID,
					taskType: type,
					taskName: task.taskName,
					taskVersion: 0,
					planID,
					duration: task.duration,
					fields: task.fields,
					mediaList: task.mediaList,
					mandatory: task.mandatory,
				}));
			const plan: IPlan = {
				planID,
				planVersion: 0,
				createdBy: res.locals.userID,
				status: PLAN_STATUS.DRAFT,
				// @ts-ignore
				taskList: body.taskList.map((task: ITask) => ({
					_id: convertToObjectID(task.taskID),
					taskID: task.taskID,
					taskVersion: 0,
					fields: task.fields,
					mediaList: task.mediaList,
				})),
				planName: body.planName,
				planType: type,
				description: body.description || '',
			};
			// @ts-ignore
			await upsertPlan(plan, taskList || []);
			res.json({
				status: success,
				message: 'Plan successfully updated',
				planID,
				parentPlanID: undefined,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async createPlanChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const { planName, planID } = req.body;
			const { type } = req.params;
			if (![PLAN_TYPES.PREONBOARDING].includes(type)) {
				throw new AppError(
					MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PLAN_TYPE.CODE,
				);
			}
			if (!planName) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE,
				);
			}
			if (planID) {
				const plan = await fetchPlanByID(planID);
				if (plan.status && plan.status !== PLAN_STATUS.DRAFT) {
					throw new AppError(
						MODEL_ERRORS.PLAN_UPDATE_FAILED.MESSAGE,
						MODEL_ERRORS.PLAN_UPDATE_FAILED.MESSAGE +
							` - Plan is in ${plan.status} state.`,
						MODEL_ERRORS.PLAN_UPDATE_FAILED.CODE,
					);
				}
				if (plan.planVersion && plan.planVersion !== 0) {
					throw new AppError(
						MODEL_ERRORS.INVALID_PLAN_VERSION.MESSAGE,
						MODEL_ERRORS.INVALID_PLAN_VERSION.MESSAGE,
						MODEL_ERRORS.INVALID_PLAN_VERSION.CODE,
					);
				}
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async createPlanEditChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const { planName, planType } = req.body;
			const planID = req.params.id;
			if (!planID) {
				throw new AppError(
					MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PLAN_ID_MISSING.CODE,
				);
			}
			const plan = await fetchPlanByID(req.params.id);
			res.locals.plan = plan;
			if (!plan) {
				throw new AppError(
					MODEL_ERRORS.PLAN_EMPTY.MESSAGE,
					MODEL_ERRORS.PLAN_EMPTY.MESSAGE,
					MODEL_ERRORS.PLAN_EMPTY.CODE,
				);
			}

			if (!planName) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE,
				);
			}
			if (![PLAN_TYPES.PREONBOARDING].includes(planType)) {
				throw new AppError(
					MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
					MODEL_ERRORS.INVALID_PLAN_TYPE.CODE,
				);
			}

			if (![PLAN_STATUS.ACTIVE, PLAN_STATUS.EDIT_ACTIVE].includes(plan.status)) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NOT_PUBLISHED.MESSAGE,
					MODEL_ERRORS.PLAN_NOT_PUBLISHED.MESSAGE,
					MODEL_ERRORS.PLAN_NOT_PUBLISHED.CODE,
				);
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async createPlanEdit(req: Request, res: Response, next: NextFunction) {
		try {
			const changes: any = {};
			const parentPlanID = req.params.id;
			const parentPlan: IPlan = res.locals.plan;
			let editPlan: IPlan;
			try {
				editPlan = await fetchPlanByParentId(parentPlanID);
				if (
					editPlan.planVersion === parentPlan.planVersion &&
					editPlan.planID !== parentPlan.planID
				) {
					// this case should not happen, if it does, to handle the case
					editPlan = undefined;
					LogError(
						new Error('editPlan.planVersion === parentPlan.planVersion'),
						'editPlanVersionSameAsParentVersion',
						{ parentPlanID },
					);
					Plan.purgePlanWithTask(editPlan.planID);
				}
			} catch (e) {
				editPlan = undefined;
				LogError(e, 'createPlanEdit-fetchEditPlanFailed', { parentPlanID });
			}

			const body: IPlan = req.body;
			if (
				body &&
				editPlan &&
				body.planID &&
				editPlan.planID &&
				body.planID !== editPlan.planID
			) {
				throw new AppError(
					MODEL_ERRORS.PLAN_ID_NOTVALID.MESSAGE,
					MODEL_ERRORS.PLAN_ID_NOTVALID.MESSAGE,
					MODEL_ERRORS.PLAN_ID_NOTVALID.CODE,
				);
			}

			const planID = (editPlan && editPlan.planID) || v4();
			const planVersion =
				(editPlan && editPlan.planVersion) || (parentPlan.planVersion || 0) + 1;
			const status = PLAN_STATUS.EDIT_ACTIVE;
			const planName = body.planName;
			const description = body.description || '';

			if (!(editPlan && editPlan.parentPlanID === parentPlanID)) {
				changes.parentPlanID = parentPlanID;
			}
			if (!(editPlan && editPlan.planID === planID)) {
				changes.planID = planID;
			}
			if (!(editPlan && editPlan.planVersion === planVersion)) {
				changes.planVersion = planVersion;
			}
			if (!(editPlan && editPlan.status === status)) {
				changes.status = status;
			}
			if (!(editPlan ? editPlan.planName === planName : parentPlan.planName === planName)) {
				changes.planName = planName;
			}

			const parentTaskIDs = parentPlan.taskList.map((task) => task.taskID);
			const editTaskIDs = editPlan && editPlan.taskList.map((task) => task.taskID);
			const taskIDs = (body.taskList || []).map((task) => task.taskID);

			const parentTaskVersionMap = {};
			const editedTaskVersionMap = {};

			const parentTaskList = await fetchTaskList(parentPlan.planID, parentTaskIDs);
			parentTaskList.forEach(
				(task) => (parentTaskVersionMap[task.taskID] = task.taskVersion || 0),
			);

			let editTaskList: ITask[] = [];
			if (editPlan && editPlan.planID) {
				try {
					editTaskList = await fetchTaskList(editPlan.planID, editTaskIDs);
					editTaskList.forEach(
						(task) => (editedTaskVersionMap[task.taskID] = task.taskVersion),
					); // containing only edited plans id

					const taskListFromParent = await fetchTaskList(parentPlanID, editTaskIDs);
					editTaskList = editTaskList.concat(taskListFromParent);
				} catch (e) {
					LogError(e, 'createPlanEdit-fetchEditTaskeFailed', {
						parentPlanID,
						editplanID: editPlan.planID,
					});
				}
			}

			const toUpdateTasks: ITask[] = [];

			let newTaskList: ITask[] =
				body.taskList &&
				body.taskList.map((task) => {
					// @ts-ignore
					const taskv: ITask = {
						taskID: task.taskID,
						taskType: parentPlan.planType,
						taskName: task.taskName,
						taskVersion: task.taskVersion,
						duration: task.duration,
						fields:
							task.fields &&
							task.fields.map((field) => ({
								fieldID: field.fieldID,
								fieldType: field.fieldType,
								fieldLabel: field.fieldLabel,
								fieldContent: field.fieldContent,
							})),
						mediaList:
							task.mediaList &&
							task.mediaList.map((media) => ({
								mediaID: media.mediaID,
								mediaName: media.mediaName,
								contentSize: media.contentSize,
								mimeType: media.mimeType,
							})),
						mandatory: task.mandatory,
					};

					// check if task is already being edited
					if (editedTaskVersionMap.hasOwnProperty(task.taskID)) {
						const editTask = _.find(editTaskList, { taskID: taskv.taskID });
						const taskDiff = compareTasksBasicDetails(editTask, taskv);
						if (_.size(taskDiff.taskDiff)) {
							taskv.taskVersion = editedTaskVersionMap[task.taskID];
							toUpdateTasks.push(taskv);
						}
					}
					// else check if it is present in parent
					else if (parentTaskVersionMap.hasOwnProperty(task.taskID)) {
						const parentTask = _.find(parentTaskList, { taskID: taskv.taskID });
						const taskDiff = compareTasksBasicDetails(parentTask, taskv);
						delete taskDiff.taskDiff.planID;
						delete taskDiff.taskDiff.taskVersion;
						if (_.size(taskDiff.taskDiff)) {
							taskv.taskID = v4();
							taskv.taskVersion = (parentTaskVersionMap[task.taskID] || 0) + 1;
							toUpdateTasks.push(taskv);
						}
					}
					// else it is new task
					else {
						// TaskId already present from body
						taskv.taskVersion = taskv.taskVersion || 0;
						toUpdateTasks.push(taskv);
					}

					return taskv;
				});
			newTaskList = newTaskList || [];

			changes.tasks = toUpdateTasks;

			// check for deleted tasks
			const deletedTasks = (editPlan ? editTaskList : parentTaskList).filter(
				(originalTask) =>
					_.findIndex(
						newTaskList,
						(newTask) => newTask.taskID === originalTask.taskID,
					) === -1,
			);
			changes.deletedTasks = deletedTasks; // -- changes
			// @ts-ignore
			const taskList: ITask[] = newTaskList.map((task: ITask) => ({
				_id: convertToObjectID(task.taskID),
				taskID: task.taskID,
				taskVersion: task.taskVersion,
			}));

			const existingTaskList: ITask[] = editPlan ? editPlan.taskList : parentPlan.taskList;
			const toUpdateTaskList: ITask[] = _.differenceWith(
				taskList,
				existingTaskList,
				(a, b) => a.taskVersion === b.taskVersion && a.taskID === b.taskID,
			); // -- changes

			changes.taskList = toUpdateTaskList; // -- changes
			// @ts-ignore
			const newPlan: IPlan = {
				planType: parentPlan.planType,
				planID,
				planVersion,
				parentPlanID,
				status,
				planName,
				description,
				createdBy: res.locals.userID,
				taskList,
			};

			await upsertPlan(newPlan, newTaskList);
			LogEvent('createPlanEdit-upsertPlanSuccess', {
				parentPlanID,
				newplanID: newPlan.planID,
			});
			res.json({
				status: success,
				message: 'Successfully updated plan edit',
				planID,
				parentPlanID,
				changes,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async publishPlanEditChecks(req: Request, res: Response, next: NextFunction) {
		try {
			const parentPlanID = req.params.id;
			if (!parentPlanID) {
				throw new AppError(
					MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE,
					MODEL_ERRORS.PLAN_ID_MISSING.CODE,
				);
			}
			const parentPlan = await fetchPlanByID(parentPlanID);
			const editPlan = await fetchPlanByParentId(parentPlanID);
			res.locals.editPlan = editPlan;
			res.locals.parentPlan = parentPlan;
			res.locals.editPlanID = editPlan.planID;
			res.locals.parentPlanID = parentPlanID;

			const taskIDs = editPlan.taskList.map((task) => {
				return task.taskID;
			});
			let taskList = await fetchTaskList(editPlan.planID, taskIDs); // check
			const taskListFromParent = await fetchTaskList(parentPlanID, taskIDs);
			taskList = taskList.concat(taskListFromParent);

			if (editPlan.status !== PLAN_STATUS.EDIT_ACTIVE) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NOT_IN_EDIT.MESSAGE,
					MODEL_ERRORS.PLAN_NOT_IN_EDIT.MESSAGE +
						` - Plan is in ${editPlan.status} state.`,
					MODEL_ERRORS.PLAN_NOT_IN_EDIT.CODE,
				);
			}
			if (editPlan.planVersion === parentPlan.planVersion) {
				throw new AppError(
					MODEL_ERRORS.PLAN_AND_EDIT_VERSION_SAME.MESSAGE,
					MODEL_ERRORS.PLAN_AND_EDIT_VERSION_SAME.MESSAGE,
					MODEL_ERRORS.PLAN_AND_EDIT_VERSION_SAME.CODE,
				);
			}
			if (!editPlan.planName) {
				throw new AppError(
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE,
					MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE,
				);
			}
			if (taskList.length === 0) {
				throw new AppError(
					MODEL_ERRORS.PLAN_EMPTY.MESSAGE,
					MODEL_ERRORS.PLAN_EMPTY.MESSAGE,
					MODEL_ERRORS.PLAN_EMPTY.CODE,
				);
			}
			for (const task of taskList) {
				switch (editPlan.planType) {
					case PLAN_TYPES.PREONBOARDING:
						break;
					default:
						throw new AppError(
							MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
							MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE,
							MODEL_ERRORS.INVALID_PLAN_TYPE.CODE,
						);
				}
			}
			next();
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async publishPlanEdit(req: Request, res: Response, next: NextFunction) {
		try {
			const parentPlan: IPlan = res.locals.parentPlan;
			const editPlan: IPlan = res.locals.editPlan;
			const parentPlanID = res.locals.parentPlanID;

			const changes: any = {};

			const versionHistoryPlan: ICreatePlanVersionHistory = {
				createdBy: res.locals.userID,
				planID: parentPlanID,
				planVersion: parentPlan.planVersion || 0,
				historyID: createHistoryIDforVersion(parentPlanID, parentPlan.planVersion || 0),
				plan: parentPlan,
			};

			const updatedPlan: ICreatePlan = {
				planType: parentPlan.planType,
				planID: parentPlan.planID,
				planVersion: editPlan.planVersion,
				status: PLAN_STATUS.ACTIVE,
				planName: editPlan.planName,
				description: editPlan.description || '',
				createdBy: res.locals.userID,
				taskList: editPlan.taskList,
			};

			const promiseList: Array<Promise<any>> = [];
			LogEvent('publishPlanEdit-StartingHistoryPush', {
				parentPlanID,
				editPlanID: editPlan.planID,
			});
			promiseList.push(createPlanVersion(versionHistoryPlan)); // create plan version history
			await Promise.all(promiseList);
			LogEvent('publishPlanEdit-FinishedHistoryPush', {
				parentPlanID,
				editPlanID: editPlan.planID,
			});

			await upsertPlan(updatedPlan, updatedPlan.taskList);
			LogEvent('publishPlanEdit-updatePlan-UpsertPlanComplete', {
				parentPlanID: updatedPlan.planID,
			}); // update parent plan and tasks + publish
			await Plan.purgePlanWithTask(editPlan.planID); // purge tasks to be deleted

			res.json({
				status: success,
				message: 'Successfully Updated and Published plan edit',
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
			const { fileName, planID, taskID, fileSize, fileType } = req.body;
			const mediaID = req.body.mediaID || v4();
			const fileContent = req.file.buffer;
			// extract formData
			if (!planID) {
				return res.status(400).json({
					status: failure,
					message: 'Plan ID not present',
				});
			}
			let uploadMediaRes;
			let addedFile;
			try {
				const generatedFileName = Plan.generateBlobFileName(fileName, mediaID);
				uploadMediaRes = await uploadMediaToBlob(generatedFileName, fileContent);
				// save content to mongo db
				const uploadMedia: IPlanMedia = {
					mediaID,
					mediaName: fileName,
					contentSize: Number(fileSize),
					mimeType: fileType,
				};
				addedFile = await findOnePlanAndAddMedia(planID, taskID, uploadMedia);
			} catch (error) {
				// log error
				LogError(error, EVENT_NAME.BLOB_MEDIA_UPLOAD_FAIL, {
					action: 'uploadMedia',
					planID,
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
			const fetchFileName = Plan.generateBlobFileName(fileName, mediaID);
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

	public static async deleteMediaFile(req: Request, res: Response, next: NextFunction) {
		try {
			const { planID, taskID, mediaID, fileName } = req.params;
			const response = await deleteMediaFromPlan(planID, taskID, mediaID);
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
			const blobFileName = Plan.generateBlobFileName(fileName, mediaID);
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

	private static async purgePlanWithTask(planID: string) {
		try {
			const promiseList: Array<Promise<any>> = [];
			promiseList.push(deleteTaskByPlanID(planID)); // purge currentPlanEditTasks
			promiseList.push(deletePlan(planID)); // purge currentPlanEdit
			await Promise.all(promiseList);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	private static async updatePlan(updatedPlan: ICreatePlan, updatedTasks: ITask[]) {
		try {
			await upsertPlan(updatedPlan, updatedTasks);
			LogEvent('publishPlanEdit-updatePlan-UpsertPlanComplete', {
				parentPlanID: updatedPlan.planID,
			});
			// Deliberate Comment: Functionality to be revisited once we can handle DB load
			// Plan.updatePlanForAssignedUsers(updatedPlan, toUpdateTasks, toInsertTasks);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
	private static generateBlobFileName(fileName: string, planID: string) {
		const blobName = `${planID}__${fileName}`;
		return blobName;
	}
}
export default Plan;
