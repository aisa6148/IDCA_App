"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTaskStatus = void 0;
const mongoose_1 = require("mongoose");
exports.UserTaskStatus = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    planId: {
        type: mongoose_1.Schema.Types.String,
    },
    taskId: {
        type: mongoose_1.Schema.Types.String,
    },
    status: {
        type: mongoose_1.Schema.Types.String,
    },
    comments: {
        type: mongoose_1.Schema.Types.String,
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
}, {
    shardKey: { userId: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
exports.UserTaskStatus.index({
    userId: 1,
}, {
    unique: false,
});
//# sourceMappingURL=userTaskStatus.schema.js.map