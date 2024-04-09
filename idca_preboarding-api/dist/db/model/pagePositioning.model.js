"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagePositioingModel = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const pagePositioning_schema_1 = require("../schema/pagePositioning.schema");
exports.PagePositioingModel = mongoose_1.model('PagePositioning', pagePositioning_schema_1.PagePositioning);
/* tslint:disable */
exports.PagePositioingModel.on('index', (error) => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'PlanModel',
        });
    }
    else {
        console.log('Page Positioing Sets index created');
    }
});
//# sourceMappingURL=pagePositioning.model.js.map