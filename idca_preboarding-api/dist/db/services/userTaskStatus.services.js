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
exports.updateUserTaskStatus = exports.fetchStatusByUserID = exports.fetchStatusByUserIDAndTaskID = void 0;
const error_1 = require("../../config/error");
const error_utilities_1 = __importDefault(require("../../utilities/error.utilities"));
const userTaskStatus_model_1 = require("../model/userTaskStatus.model");
exports.fetchStatusByUserIDAndTaskID = (userId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskStatus = yield userTaskStatus_model_1.UserTaskStatus.findOne({
            userId,
            taskId,
        }).exec();
        return taskStatus;
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.CODE, error);
    }
});
exports.fetchStatusByUserID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskStatus = yield userTaskStatus_model_1.UserTaskStatus.find({
            userId,
        }).exec();
        return taskStatus;
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_USER_TASK_STATUS_FAILURE.CODE, error);
    }
});
exports.updateUserTaskStatus = (taskId, taskStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userTaskStatus_model_1.UserTaskStatus.updateOne({
            taskId,
        }, {
            $set: Object.assign({}, taskStatus),
        }, { upsert: true }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.CODE, error);
    }
});
//# sourceMappingURL=userTaskStatus.services.js.map