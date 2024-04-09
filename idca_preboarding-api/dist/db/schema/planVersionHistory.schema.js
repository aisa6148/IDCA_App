"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanVersionHistorySchema = void 0;
const mongoose_1 = require("mongoose");
const task_schema_1 = require("./task.schema");
// Replica of planSchema
const planVersionSchema = new mongoose_1.Schema({
    planID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    planVersion: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        default: 0,
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
    trainingType: {
        type: mongoose_1.Schema.Types.String,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    createdOn: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    updatedOn: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.String,
    },
    taskList: {
        type: [task_schema_1.Task],
        default: [],
    },
    tags: {
        type: [mongoose_1.Schema.Types.String],
        default: [],
    },
});
exports.PlanVersionHistorySchema = new mongoose_1.Schema({
    historyID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
        index: true,
    },
    planID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    planVersion: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    createdOn: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now(),
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    plan: {
        type: [planVersionSchema],
        required: true,
    },
}, {
    shardKey: { historyID: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
//# sourceMappingURL=planVersionHistory.schema.js.map