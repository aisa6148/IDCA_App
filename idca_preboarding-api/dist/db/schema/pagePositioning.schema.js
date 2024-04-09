"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagePositioning = void 0;
const mongoose_1 = require("mongoose");
const appHomeItem_schema_1 = require("./appHomeItem.schema");
exports.PagePositioning = new mongoose_1.Schema({
    pagePositioningID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    locationName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    appHomeTopHeader: {
        type: [appHomeItem_schema_1.appHomeItemSchmea],
        default: [],
    },
    appHomeBottomFooter: {
        type: [appHomeItem_schema_1.appHomeItemSchmea],
        default: [],
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
    shardKey: { pagePositioningID: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
//# sourceMappingURL=pagePositioning.schema.js.map