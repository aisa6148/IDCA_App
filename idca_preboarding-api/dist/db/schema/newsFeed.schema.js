"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFeedSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NewsFeedSchema = new mongoose_1.Schema({
    newsID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    content: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    image: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    url: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    enabled: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    createdOn: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        default: Date.now,
    },
    updatedOn: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
}, {
    shardKey: { newsID: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
exports.NewsFeedSchema.index({
    newsID: 1,
}, {
    unique: true,
});
//# sourceMappingURL=newsFeed.schema.js.map