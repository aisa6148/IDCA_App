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
exports.deleteTaskByPlanID = exports.fetchTaskList = void 0;
const error_1 = require("../../config/error");
const error_utilities_1 = __importDefault(require("../../utilities/error.utilities"));
const plan_model_1 = require("../model/plan.model");
exports.fetchTaskList = (planID, taskIDs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield plan_model_1.Plan.findOne({
            planID,
        }).exec();
        if (!plan.taskList) {
            throw new error_utilities_1.default(error_1.MODEL_ERRORS.PLAN_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PLAN_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PLAN_EMPTY.CODE);
        }
        const taskListMap = {};
        for (const task of plan.taskList) {
            taskListMap[task.taskID] = task;
        }
        return taskIDs.map((taskID) => taskListMap[taskID]).filter((e) => e);
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.TASK_LIST_FAILURE.MESSAGE, error_1.MODEL_ERRORS.TASK_LIST_FAILURE.MESSAGE, error_1.MODEL_ERRORS.TASK_LIST_FAILURE.CODE, error);
    }
});
exports.deleteTaskByPlanID = (planID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield plan_model_1.Plan.updateOne({
            planID,
        }, {
            taskList: [],
        }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.TASK_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASK_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASK_DELETION_FAILED.CODE, error);
    }
});
//# sourceMappingURL=task.service.js.map