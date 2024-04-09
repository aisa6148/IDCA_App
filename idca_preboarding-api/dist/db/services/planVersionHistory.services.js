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
exports.fetchPlanHistoryWithPlanID = exports.createPlanVersion = void 0;
const error_1 = require("../../config/error");
const error_utilities_1 = __importDefault(require("../../utilities/error.utilities"));
const planVersionHistory_model_1 = require("../model/planVersionHistory.model");
exports.createPlanVersion = (planVersionHistory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedPlanVersionHistory = yield new planVersionHistory_model_1.PlanVersionHistoryModel(planVersionHistory).save({
            validateBeforeSave: true,
        });
        return savedPlanVersionHistory;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.MESSAGE, error_1.MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.MESSAGE, error_1.MODEL_ERRORS.CREATE_PLAN_VERSIONHISTORY.CODE, error);
    }
});
exports.fetchPlanHistoryWithPlanID = (planID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planQuery = planVersionHistory_model_1.PlanVersionHistoryModel.find({ planID });
        const returnList = yield planQuery.exec();
        return returnList;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PLAN_VERSIONHISTORY_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_VERSIONHISTORY_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PLAN_VERSIONHISTORY_FAILURE.CODE, error);
    }
});
//# sourceMappingURL=planVersionHistory.services.js.map