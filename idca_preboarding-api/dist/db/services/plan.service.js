"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMediaFromPlan = exports.findOnePlanAndAddMedia = exports.fetchPlanByParentId = exports.upsertPlan = exports.deletePlan = exports.makePlanActive = exports.fetchPlansByStatus = exports.fetchActivePlan = exports.fetchPlanByID = exports.fetchPlanByType = void 0;
const uuid_1 = require("uuid");
const error_1 = require("../../config/error");
const plan_1 = require("../../config/plan");
const error_utilities_1 = __importDefault(require("../../utilities/error.utilities"));
const plan_model_1 = require("../model/plan.model");
exports.fetchPlanByType = (planType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planQuery = plan_model_1.Plan.aggregate([
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
        const returnList = yield planQuery.exec();
        return returnList;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE, error);
    }
});
exports.fetchPlanByID = (planID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield plan_model_1.Plan.findOne({
            planID,
        }).exec();
        if (!plan) {
            throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE);
        }
        return plan;
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE, error);
    }
});
exports.fetchActivePlan = (status, planType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planQuery = plan_model_1.Plan.find({
            status,
            planType,
        }, {
            planID: 1,
            planName: 1,
            planType: 1,
            taskList: 1,
        });
        const returnList = yield planQuery.exec();
        return returnList;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PREONBOARDING_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PREONBOARDING_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PREONBOARDING_PLAN_FAILURE.CODE, error);
    }
});
exports.fetchPlansByStatus = (planTypes, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield plan_model_1.Plan.find({
            planType: {
                $in: planTypes,
            },
            status,
        }, {
            _id: 0,
            planType: 1,
            planID: 1,
            planName: 1,
            status: 1,
            createdOn: 1,
            createdBy: 1,
            updatedOn: 1,
            updatedBy: 1,
        }).exec();
        if (!plans) {
            throw new Error();
        }
        return plans;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_FAILURE.CODE, error);
    }
});
exports.makePlanActive = (planID, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield plan_model_1.Plan.updateMany({
            status: plan_1.PLAN_STATUS.ACTIVE,
        }, {
            $set: {
                status: plan_1.PLAN_STATUS.DRAFT,
            },
        }).exec();
        yield plan_model_1.Plan.updateOne({
            planID,
        }, {
            status,
        }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.CODE, error);
    }
});
exports.deletePlan = (planID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield plan_model_1.Plan.deleteOne({
            planID,
        }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_DELETION_FAILED.CODE, error);
    }
});
exports.upsertPlan = (plan, tasks) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planID = plan.planID || uuid_1.v4();
        yield plan_model_1.Plan.updateOne({
            planID,
        }, {
            $set: Object.assign(Object.assign({}, plan), { taskList: tasks, planID }),
        }, { upsert: true }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_CREATION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_CREATION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_CREATION_FAILED.CODE, error);
    }
});
exports.fetchPlanByParentId = (planID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield plan_model_1.Plan.findOne({
            parentPlanID: planID,
        }).exec();
        if (!plan) {
            throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.CODE);
        }
        return plan;
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PLAN_FETCH_BY_PARENTID_FAILED.CODE, error);
    }
});
/**
 *
 * findOnePlanAndAddMedia
 * @param planID
 * @param mediaList
 */
exports.findOnePlanAndAddMedia = (planID, taskID, mediaItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mediaQuery = plan_model_1.Plan.findOneAndUpdate({
            planID,
            'taskList.taskID': taskID,
        }, {
            $push: { 'taskList.$.mediaList': mediaItem },
        });
        yield mediaQuery.exec();
        return mediaItem;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.CODE, error);
    }
});
/**
 *
 * @param planID
 * @param taskID
 * @param mediaID
 */
exports.deleteMediaFromPlan = (planID, taskID, mediaID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        plan_model_1.Plan.updateOne({
            planID,
            'taskList.taskID': taskID,
        }, {
            // @ts-ignore
            $pull: { 'taskList.$.mediaList': { mediaID: { $in: mediaID } } },
        }).exec();
        return true;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.CODE, error);
    }
});
//# sourceMappingURL=plan.service.js.map