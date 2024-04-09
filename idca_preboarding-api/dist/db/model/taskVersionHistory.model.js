"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskVersionHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const taskVersionHistory_schema_1 = require("../schema/taskVersionHistory.schema");
exports.TaskVersionHistoryModel = mongoose_1.model('TaskVersionHistory', taskVersionHistory_schema_1.TaskVersionHistorySchema);
/* tslint:disable */
exports.TaskVersionHistoryModel.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'TaskVersionHistoryModel',
        });
    }
    else {
        console.log('TaskVersionHistoryModel index created');
    }
});
//# sourceMappingURL=taskVersionHistory.model.js.map