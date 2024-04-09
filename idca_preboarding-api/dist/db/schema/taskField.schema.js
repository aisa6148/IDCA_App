"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskField = void 0;
const mongoose_1 = require("mongoose");
exports.TaskField = new mongoose_1.Schema({
    fieldID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    fieldType: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    fieldLabel: {
        type: mongoose_1.Schema.Types.String,
    },
    fieldContent: {
        type: mongoose_1.Schema.Types.Mixed,
    },
});
//# sourceMappingURL=taskField.schema.js.map