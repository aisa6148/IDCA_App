"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskVersionHistorySchema = void 0;
const mongoose_1 = require("mongoose");
const task_schema_1 = require("./task.schema");
exports.TaskVersionHistorySchema = new mongoose_1.Schema({
    historyID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
        index: true,
    },
    taskID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    taskVersion: {
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
    task: {
        type: [task_schema_1.Task],
        required: true,
    },
}, {
    shardKey: { historyID: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
//# sourceMappingURL=taskVersionHistory.schema.js.map