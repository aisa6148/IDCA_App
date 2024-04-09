"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const uuid_1 = require("uuid");
const constants_1 = require("../config/constants");
const error_1 = require("../config/error");
const log_1 = require("../config/log");
const plan_1 = require("../config/plan");
const plan_2 = require("../config/plan");
const plan_service_1 = require("../db/services/plan.service");
const planVersionHistory_services_1 = require("../db/services/planVersionHistory.services");
const task_service_1 = require("../db/services/task.service");
const task_utilities_1 = require("../db/utilities/task.utilities");
const azureBlob_1 = require("../services/azureBlob");
const error_utilities_1 = __importStar(require("../utilities/error.utilities"));
const log_utilities_1 = require("../utilities/log.utilities");
const parser_utlilities_1 = require("../utilities/parser.utlilities");
class Plan {
    static fetchPlansChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.params;
                if (![plan_2.PLAN_TYPES.PREONBOARDING].includes(type)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.CODE);
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchPlans(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.params;
                const plans = yield plan_service_1.fetchPlanByType(type);
                res.json({
                    status: constants_1.success,
                    plans,
                    message: 'Plans successfully fetched',
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchPlanByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plan = yield plan_service_1.fetchPlanByID(req.params.id);
                res.json({
                    status: constants_1.success,
                    plan,
                    message: 'Plan successfully fetched',
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static planIDChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_MISSING.CODE);
                }
                const plan = yield plan_service_1.fetchPlanByID(req.params.id);
                if (!plan.planName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE);
                }
                res.locals.plan = plan;
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchActivePlans(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planTypes = [];
                if (res.locals.roles.includes(constants_1.ROLES.ADMIN)) {
                    planTypes.push('PREONBOARDING');
                }
                if (res.locals.roles.includes(constants_1.ROLES.MANAGER)) {
                    planTypes.push('PROJECT');
                }
                const data = yield plan_service_1.fetchPlansByStatus(planTypes, plan_1.PLAN_STATUS.ACTIVE);
                res.json({
                    status: constants_1.success,
                    data,
                    message: 'Successfully fetched data',
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static makePlanActive(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plan = res.locals.plan;
                yield plan_service_1.makePlanActive(plan.planID, plan_1.PLAN_STATUS.ACTIVE);
                res.json({
                    status: constants_1.success,
                    message: 'Plan Successfully Active',
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static makePlanActiveChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plan = yield plan_service_1.fetchPlanByID(req.params.id);
                const taskIDs = plan.taskList.map((task) => {
                    return task.taskID;
                });
                if (plan.status === plan_1.PLAN_STATUS.ACTIVE) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_ALREADY_ACTIVE.MESSAGE, error_1.MODEL_ERRORS.PLAN_ALREADY_ACTIVE.MESSAGE, error_1.MODEL_ERRORS.PLAN_ALREADY_ACTIVE.CODE);
                }
                if (plan.status !== plan_1.PLAN_STATUS.DRAFT) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NOT_IN_DRAFT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NOT_IN_DRAFT.MESSAGE + ` - Plan is in ${plan.status} state.`, error_1.MODEL_ERRORS.PLAN_NOT_IN_DRAFT.CODE);
                }
                if (!plan.planName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE);
                }
                res.locals.plan = plan;
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static deletePlan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plan = res.locals.plan;
                yield plan_service_1.deletePlan(plan.planID);
                res.json({
                    status: constants_1.success,
                    message: 'Successfully deleted plan data',
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPlan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { type } = req.params;
                const planID = body.planID || uuid_1.v4();
                const taskList = body.taskList &&
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
                const plan = {
                    planID,
                    planVersion: 0,
                    createdBy: res.locals.userID,
                    status: plan_1.PLAN_STATUS.DRAFT,
                    // @ts-ignore
                    taskList: body.taskList.map((task) => ({
                        _id: parser_utlilities_1.convertToObjectID(task.taskID),
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
                yield plan_service_1.upsertPlan(plan, taskList || []);
                res.json({
                    status: constants_1.success,
                    message: 'Plan successfully updated',
                    planID,
                    parentPlanID: undefined,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPlanChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { planName, planID } = req.body;
                const { type } = req.params;
                if (![plan_2.PLAN_TYPES.PREONBOARDING].includes(type)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.CODE);
                }
                if (!planName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE);
                }
                if (planID) {
                    const plan = yield plan_service_1.fetchPlanByID(planID);
                    if (plan.status && plan.status !== plan_1.PLAN_STATUS.DRAFT) {
                        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_UPDATE_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_UPDATE_FAILED.MESSAGE +
                            ` - Plan is in ${plan.status} state.`, error_1.MODEL_ERRORS.PLAN_UPDATE_FAILED.CODE);
                    }
                    if (plan.planVersion && plan.planVersion !== 0) {
                        throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PLAN_VERSION.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_VERSION.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_VERSION.CODE);
                    }
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPlanEditChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { planName, planType } = req.body;
                const planID = req.params.id;
                if (!planID) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_MISSING.CODE);
                }
                const plan = yield plan_service_1.fetchPlanByID(req.params.id);
                res.locals.plan = plan;
                if (!plan) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PLAN_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PLAN_EMPTY.CODE);
                }
                if (!planName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE);
                }
                if (![plan_2.PLAN_TYPES.PREONBOARDING].includes(planType)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.CODE);
                }
                if (![plan_1.PLAN_STATUS.ACTIVE, plan_1.PLAN_STATUS.EDIT_ACTIVE].includes(plan.status)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NOT_PUBLISHED.MESSAGE, error_1.MODEL_ERRORS.PLAN_NOT_PUBLISHED.MESSAGE, error_1.MODEL_ERRORS.PLAN_NOT_PUBLISHED.CODE);
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPlanEdit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const changes = {};
                const parentPlanID = req.params.id;
                const parentPlan = res.locals.plan;
                let editPlan;
                try {
                    editPlan = yield plan_service_1.fetchPlanByParentId(parentPlanID);
                    if (editPlan.planVersion === parentPlan.planVersion &&
                        editPlan.planID !== parentPlan.planID) {
                        // this case should not happen, if it does, to handle the case
                        editPlan = undefined;
                        log_utilities_1.LogError(new Error('editPlan.planVersion === parentPlan.planVersion'), 'editPlanVersionSameAsParentVersion', { parentPlanID });
                        Plan.purgePlanWithTask(editPlan.planID);
                    }
                }
                catch (e) {
                    editPlan = undefined;
                    log_utilities_1.LogError(e, 'createPlanEdit-fetchEditPlanFailed', { parentPlanID });
                }
                const body = req.body;
                if (body &&
                    editPlan &&
                    body.planID &&
                    editPlan.planID &&
                    body.planID !== editPlan.planID) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_ID_NOTVALID.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_NOTVALID.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_NOTVALID.CODE);
                }
                const planID = (editPlan && editPlan.planID) || uuid_1.v4();
                const planVersion = (editPlan && editPlan.planVersion) || (parentPlan.planVersion || 0) + 1;
                const status = plan_1.PLAN_STATUS.EDIT_ACTIVE;
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
                const parentTaskList = yield task_service_1.fetchTaskList(parentPlan.planID, parentTaskIDs);
                parentTaskList.forEach((task) => (parentTaskVersionMap[task.taskID] = task.taskVersion || 0));
                let editTaskList = [];
                if (editPlan && editPlan.planID) {
                    try {
                        editTaskList = yield task_service_1.fetchTaskList(editPlan.planID, editTaskIDs);
                        editTaskList.forEach((task) => (editedTaskVersionMap[task.taskID] = task.taskVersion)); // containing only edited plans id
                        const taskListFromParent = yield task_service_1.fetchTaskList(parentPlanID, editTaskIDs);
                        editTaskList = editTaskList.concat(taskListFromParent);
                    }
                    catch (e) {
                        log_utilities_1.LogError(e, 'createPlanEdit-fetchEditTaskeFailed', {
                            parentPlanID,
                            editplanID: editPlan.planID,
                        });
                    }
                }
                const toUpdateTasks = [];
                let newTaskList = body.taskList &&
                    body.taskList.map((task) => {
                        // @ts-ignore
                        const taskv = {
                            taskID: task.taskID,
                            taskType: parentPlan.planType,
                            taskName: task.taskName,
                            taskVersion: task.taskVersion,
                            duration: task.duration,
                            fields: task.fields &&
                                task.fields.map((field) => ({
                                    fieldID: field.fieldID,
                                    fieldType: field.fieldType,
                                    fieldLabel: field.fieldLabel,
                                    fieldContent: field.fieldContent,
                                })),
                            mediaList: task.mediaList &&
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
                            const taskDiff = task_utilities_1.compareTasksBasicDetails(editTask, taskv);
                            if (_.size(taskDiff.taskDiff)) {
                                taskv.taskVersion = editedTaskVersionMap[task.taskID];
                                toUpdateTasks.push(taskv);
                            }
                        }
                        // else check if it is present in parent
                        else if (parentTaskVersionMap.hasOwnProperty(task.taskID)) {
                            const parentTask = _.find(parentTaskList, { taskID: taskv.taskID });
                            const taskDiff = task_utilities_1.compareTasksBasicDetails(parentTask, taskv);
                            delete taskDiff.taskDiff.planID;
                            delete taskDiff.taskDiff.taskVersion;
                            if (_.size(taskDiff.taskDiff)) {
                                taskv.taskID = uuid_1.v4();
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
                const deletedTasks = (editPlan ? editTaskList : parentTaskList).filter((originalTask) => _.findIndex(newTaskList, (newTask) => newTask.taskID === originalTask.taskID) === -1);
                changes.deletedTasks = deletedTasks; // -- changes
                // @ts-ignore
                const taskList = newTaskList.map((task) => ({
                    _id: parser_utlilities_1.convertToObjectID(task.taskID),
                    taskID: task.taskID,
                    taskVersion: task.taskVersion,
                }));
                const existingTaskList = editPlan ? editPlan.taskList : parentPlan.taskList;
                const toUpdateTaskList = _.differenceWith(taskList, existingTaskList, (a, b) => a.taskVersion === b.taskVersion && a.taskID === b.taskID); // -- changes
                changes.taskList = toUpdateTaskList; // -- changes
                // @ts-ignore
                const newPlan = {
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
                yield plan_service_1.upsertPlan(newPlan, newTaskList);
                log_utilities_1.LogEvent('createPlanEdit-upsertPlanSuccess', {
                    parentPlanID,
                    newplanID: newPlan.planID,
                });
                res.json({
                    status: constants_1.success,
                    message: 'Successfully updated plan edit',
                    planID,
                    parentPlanID,
                    changes,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static publishPlanEditChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parentPlanID = req.params.id;
                if (!parentPlanID) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PLAN_ID_MISSING.CODE);
                }
                const parentPlan = yield plan_service_1.fetchPlanByID(parentPlanID);
                const editPlan = yield plan_service_1.fetchPlanByParentId(parentPlanID);
                res.locals.editPlan = editPlan;
                res.locals.parentPlan = parentPlan;
                res.locals.editPlanID = editPlan.planID;
                res.locals.parentPlanID = parentPlanID;
                const taskIDs = editPlan.taskList.map((task) => {
                    return task.taskID;
                });
                let taskList = yield task_service_1.fetchTaskList(editPlan.planID, taskIDs); // check
                const taskListFromParent = yield task_service_1.fetchTaskList(parentPlanID, taskIDs);
                taskList = taskList.concat(taskListFromParent);
                if (editPlan.status !== plan_1.PLAN_STATUS.EDIT_ACTIVE) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NOT_IN_EDIT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NOT_IN_EDIT.MESSAGE +
                        ` - Plan is in ${editPlan.status} state.`, error_1.MODEL_ERRORS.PLAN_NOT_IN_EDIT.CODE);
                }
                if (editPlan.planVersion === parentPlan.planVersion) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_AND_EDIT_VERSION_SAME.MESSAGE, error_1.MODEL_ERRORS.PLAN_AND_EDIT_VERSION_SAME.MESSAGE, error_1.MODEL_ERRORS.PLAN_AND_EDIT_VERSION_SAME.CODE);
                }
                if (!editPlan.planName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PLAN_NAME_NOT_PRESENT.CODE);
                }
                if (taskList.length === 0) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PLAN_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PLAN_EMPTY.CODE);
                }
                for (const task of taskList) {
                    switch (editPlan.planType) {
                        case plan_2.PLAN_TYPES.PREONBOARDING:
                            break;
                        default:
                            throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.CODE);
                    }
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static publishPlanEdit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parentPlan = res.locals.parentPlan;
                const editPlan = res.locals.editPlan;
                const parentPlanID = res.locals.parentPlanID;
                const changes = {};
                const versionHistoryPlan = {
                    createdBy: res.locals.userID,
                    planID: parentPlanID,
                    planVersion: parentPlan.planVersion || 0,
                    historyID: parser_utlilities_1.createHistoryIDforVersion(parentPlanID, parentPlan.planVersion || 0),
                    plan: parentPlan,
                };
                const updatedPlan = {
                    planType: parentPlan.planType,
                    planID: parentPlan.planID,
                    planVersion: editPlan.planVersion,
                    status: plan_1.PLAN_STATUS.ACTIVE,
                    planName: editPlan.planName,
                    description: editPlan.description || '',
                    createdBy: res.locals.userID,
                    taskList: editPlan.taskList,
                };
                const promiseList = [];
                log_utilities_1.LogEvent('publishPlanEdit-StartingHistoryPush', {
                    parentPlanID,
                    editPlanID: editPlan.planID,
                });
                promiseList.push(planVersionHistory_services_1.createPlanVersion(versionHistoryPlan)); // create plan version history
                yield Promise.all(promiseList);
                log_utilities_1.LogEvent('publishPlanEdit-FinishedHistoryPush', {
                    parentPlanID,
                    editPlanID: editPlan.planID,
                });
                yield plan_service_1.upsertPlan(updatedPlan, updatedPlan.taskList);
                log_utilities_1.LogEvent('publishPlanEdit-updatePlan-UpsertPlanComplete', {
                    parentPlanID: updatedPlan.planID,
                }); // update parent plan and tasks + publish
                yield Plan.purgePlanWithTask(editPlan.planID); // purge tasks to be deleted
                res.json({
                    status: constants_1.success,
                    message: 'Successfully Updated and Published plan edit',
                    changes,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    /**
     * upload media file from onboard screen
     * @param req
     * @param res
     */
    static uploadMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fileName, planID, taskID, fileSize, fileType } = req.body;
                const mediaID = req.body.mediaID || uuid_1.v4();
                const fileContent = req.file.buffer;
                // extract formData
                if (!planID) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'Plan ID not present',
                    });
                }
                let uploadMediaRes;
                let addedFile;
                try {
                    const generatedFileName = Plan.generateBlobFileName(fileName, mediaID);
                    uploadMediaRes = yield azureBlob_1.uploadMediaToBlob(generatedFileName, fileContent);
                    // save content to mongo db
                    const uploadMedia = {
                        mediaID,
                        mediaName: fileName,
                        contentSize: Number(fileSize),
                        mimeType: fileType,
                    };
                    addedFile = yield plan_service_1.findOnePlanAndAddMedia(planID, taskID, uploadMedia);
                }
                catch (error) {
                    // log error
                    log_utilities_1.LogError(error, log_1.EVENT_NAME.BLOB_MEDIA_UPLOAD_FAIL, {
                        action: 'uploadMedia',
                        planID,
                        fileName,
                    });
                }
                if (!uploadMediaRes) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'Failed to upload the media file',
                        data: [],
                    });
                }
                else {
                    return res.json({
                        status: constants_1.success,
                        message: 'Successfully uploaded the media file',
                        data: addedFile,
                    });
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    /**
     *
     * @param fileName fetch media files
     */
    static fetchMediaFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fileName, mediaID } = req.params;
                const fetchFileName = Plan.generateBlobFileName(fileName, mediaID);
                try {
                    const file = yield azureBlob_1.getUploadedFileFromBlob(fetchFileName);
                    if (file) {
                        res.end(file);
                    }
                    else {
                        res.status(404).end();
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, log_1.EVENT_NAME.BLOB_MEDIA_FETCH_FAIL, {
                        action: 'fetchMediaFile',
                        mediaID,
                        fetchFileName,
                    });
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static deleteMediaFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { planID, taskID, mediaID, fileName } = req.params;
                const response = yield plan_service_1.deleteMediaFromPlan(planID, taskID, mediaID);
                if (!response) {
                    return res
                        .json({
                        status: 'failure',
                        message: error_1.MODEL_ERRORS.DELETE_MEDIA_FAILED.MESSAGE,
                        display: false,
                        response,
                    })
                        .status(200);
                }
                const blobFileName = Plan.generateBlobFileName(fileName, mediaID);
                yield azureBlob_1.deleteImageFromBlob(blobFileName);
                return res
                    .json({
                    status: 'success',
                    message: 'Successfully deleted the media',
                    display: true,
                    response,
                })
                    .status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static purgePlanWithTask(planID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promiseList = [];
                promiseList.push(task_service_1.deleteTaskByPlanID(planID)); // purge currentPlanEditTasks
                promiseList.push(plan_service_1.deletePlan(planID)); // purge currentPlanEdit
                yield Promise.all(promiseList);
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
    static updatePlan(updatedPlan, updatedTasks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield plan_service_1.upsertPlan(updatedPlan, updatedTasks);
                log_utilities_1.LogEvent('publishPlanEdit-updatePlan-UpsertPlanComplete', {
                    parentPlanID: updatedPlan.planID,
                });
                // Deliberate Comment: Functionality to be revisited once we can handle DB load
                // Plan.updatePlanForAssignedUsers(updatedPlan, toUpdateTasks, toInsertTasks);
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
    static generateBlobFileName(fileName, planID) {
        const blobName = `${planID}__${fileName}`;
        return blobName;
    }
}
exports.default = Plan;
//# sourceMappingURL=plan.controller.js.map