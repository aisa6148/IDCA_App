"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appHomeItemSchmea = void 0;
const mongoose_1 = require("mongoose");
exports.appHomeItemSchmea = new mongoose_1.Schema({
    pageID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    pageName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    pageIcon: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    slot: {
        type: mongoose_1.Schema.Types.String,
    },
});
//# sourceMappingURL=appHomeItem.schema.js.map