"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const mongoose_1 = require("mongoose");
const page_1 = require("../../config/page");
const component_schema_1 = require("./component.schema");
exports.Page = new mongoose_1.Schema({
    pageID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
    },
    pageVersion: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    pageName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    parentPageID: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    pageType: {
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
        default: page_1.PAGE_STATUS.DRAFT,
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
    componentList: {
        type: [component_schema_1.Component],
        default: [],
    },
}, {
    shardKey: { pageID: 1 },
    validateBeforeSave: true,
});
//# sourceMappingURL=page.schema.js.map