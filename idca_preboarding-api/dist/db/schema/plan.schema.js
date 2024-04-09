"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
const plan_1 = require("../../config/plan");
const task_schema_1 = require("./task.schema");
exports.Plan = new mongoose_1.Schema({
    planID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
    },
    planVersion: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    planName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    parentPlanID: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    planType: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: plan_1.PLAN_STATUS.DRAFT,
    },
    createdOn: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    updatedOn: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now,
        required: true,
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.String,
    },
    taskList: {
        type: [task_schema_1.Task],
        default: [],
    },
}, {
    shardKey: { planID: 1 },
    validateBeforeSave: true,
});
exports.Plan.index({
    planID: 1,
}, {
    unique: true,
});
exports.Plan.index({
    planID: 1,
    planName: 1,
}, {
    unique: true,
});
//# sourceMappingURL=plan.schema.js.map