"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageVersionHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const pageVersionHistory_schema_1 = require("../schema/pageVersionHistory.schema");
exports.PageVersionHistoryModel = mongoose_1.model('PageVersionHistory', pageVersionHistory_schema_1.pageVersionHistorySchema);
/* tslint:disable */
exports.PageVersionHistoryModel.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'PageVersionHistoryModel',
        });
    }
    else {
        console.log('PageVersionHistoryModel index created');
    }
});
//# sourceMappingURL=pageVersionHistory.model.js.map