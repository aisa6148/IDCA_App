"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAccessSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RoleAccessSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.String,
    },
    roles: {
        type: mongoose_1.Schema.Types.Array,
    },
}, {
    shardKey: { userId: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
exports.RoleAccessSchema.index({
    userId: 1,
}, {
    unique: true,
});
//# sourceMappingURL=roleAccess.schema.js.map