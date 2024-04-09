"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const mongoose_1 = require("mongoose");
exports.Component = new mongoose_1.Schema({
    componentID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        index: true,
    },
    componentType: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    fields: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        default: Date.now,
    },
});
//# sourceMappingURL=component.schema.js.map