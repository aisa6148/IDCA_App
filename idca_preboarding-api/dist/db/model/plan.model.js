"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const plan_schema_1 = require("../schema/plan.schema");
exports.Plan = mongoose_1.model('Plan', plan_schema_1.Plan);
/* tslint:disable */
exports.Plan.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'PlanModel',
        });
    }
    else {
        console.log('PlanModel index created');
    }
});
//# sourceMappingURL=plan.model.js.map