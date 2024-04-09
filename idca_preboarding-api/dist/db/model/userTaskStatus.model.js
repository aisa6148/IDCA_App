"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTaskStatus = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const userTaskStatus_schema_1 = require("../schema/userTaskStatus.schema");
exports.UserTaskStatus = mongoose_1.model('UserTaskStatusSchema', userTaskStatus_schema_1.UserTaskStatus);
/* tslint:disable */
exports.UserTaskStatus.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'UserTaskStatus',
        });
    }
    else {
        console.log('UserTaskStatus index created');
    }
});
//# sourceMappingURL=userTaskStatus.model.js.map