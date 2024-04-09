"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskField_schema_1 = require("./taskField.schema");
const taskMedia_schema_1 = require("./taskMedia.schema");
exports.Task = new mongoose_1.Schema({
    taskID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        index: true,
    },
    taskType: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    taskName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    taskVersion: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        default: Date.now,
    },
    fields: {
        type: [taskField_schema_1.TaskField],
        default: [],
    },
    duration: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    mediaList: {
        type: [taskMedia_schema_1.TaskMedia],
        default: [],
    },
    mandatory: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
}, {
    shardKey: { templateID: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
//# sourceMappingURL=task.schema.js.map