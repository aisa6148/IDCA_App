"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanVersionHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const planVersionHistory_schema_1 = require("../schema/planVersionHistory.schema");
exports.PlanVersionHistoryModel = mongoose_1.model('PlanVersionHistory', planVersionHistory_schema_1.PlanVersionHistorySchema);
/* tslint:disable */
exports.PlanVersionHistoryModel.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'PlanVersionHistoryModel',
        });
    }
    else {
        console.log('PlanVersionHistoryModel index created');
    }
});
//# sourceMappingURL=planVersionHistory.model.js.map