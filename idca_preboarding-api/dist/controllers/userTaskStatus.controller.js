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
const constants_1 = require("../config/constants");
const error_1 = require("../config/error");
const taskStatus_1 = require("../config/taskStatus");
const userTaskStatus_services_1 = require("../db/services/userTaskStatus.services");
const error_utilities_1 = __importStar(require("../utilities/error.utilities"));
class UserTaskStatus {
    static userIDChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.taskId) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.TASK_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.TASK_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.TASK_ID_MISSING.CODE);
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchStatusByUserIDAndTaskID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.params;
                const id = res.locals.userID;
                const taskStatus = yield userTaskStatus_services_1.fetchStatusByUserIDAndTaskID(id, taskId);
                res.json({
                    status: constants_1.success,
                    taskStatus,
                    message: constants_1.FETCH_SUCCESSFUL,
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchStatusByUserID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = res.locals.userID;
                const taskStatus = yield userTaskStatus_services_1.fetchStatusByUserID(id);
                res.json({
                    status: constants_1.success,
                    taskStatus,
                    message: constants_1.FETCH_SUCCESSFUL,
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static updateUserTaskStatusCheck(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.taskId) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.TASK_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.TASK_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.TASK_ID_MISSING.CODE);
                }
                if (!taskStatus_1.TASK_STATUS[req.params.status]) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.STATUS_INVALID.MESSAGE, error_1.MODEL_ERRORS.STATUS_INVALID.MESSAGE, error_1.MODEL_ERRORS.STATUS_INVALID.CODE);
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static updateUserTaskStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { planId, taskId, status } = req.params;
                const id = res.locals.userID;
                // @ts-ignore
                const taskStatus = {
                    userId: id,
                    planId,
                    taskId,
                    status,
                    comments: '',
                    createdBy: res.locals.userID,
                };
                yield userTaskStatus_services_1.updateUserTaskStatus(taskId, taskStatus);
                res.json({
                    status: constants_1.success,
                    message: constants_1.UPDATE_SUCCESSFULL,
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
}
exports.default = UserTaskStatus;
//# sourceMappingURL=userTaskStatus.controller.js.map