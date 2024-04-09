"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITestimonialsModel = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const testimonials_schema_1 = require("../schema/testimonials.schema");
exports.ITestimonialsModel = mongoose_1.model('testimonials', testimonials_schema_1.TestimonialsSchema);
/* tslint:disable */
exports.ITestimonialsModel.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'ITestimonialsModel',
        });
    }
    else {
        console.log('Testimonials Model index created');
    }
});
//# sourceMappingURL=testimonials.model.js.map