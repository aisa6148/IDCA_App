"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanMedia = void 0;
const mongoose_1 = require("mongoose");
exports.PlanMedia = new mongoose_1.Schema({
    mediaID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    mediaName: {
        type: mongoose_1.Schema.Types.String,
    },
    contentSize: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    mimeType: {
        type: mongoose_1.Schema.Types.String,
    },
});
//# sourceMappingURL=planMedia.schema.js.map