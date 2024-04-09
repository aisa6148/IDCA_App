"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TestimonialsSchema = new mongoose_1.Schema({
    testimonialsID: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    designation: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    testimonials: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    image: {
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
    shardKey: { testimonialsID: 1 },
    validateBeforeSave: true,
    autoIndex: false,
    emitIndexErrors: true,
});
exports.TestimonialsSchema.index({
    testimonialsID: 1,
}, {
    unique: true,
});
//# sourceMappingURL=testimonials.schema.js.map