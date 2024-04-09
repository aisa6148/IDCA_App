"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const page_schema_1 = require("../schema/page.schema");
exports.Page = mongoose_1.model('Page', page_schema_1.Page);
/* tslint:disable */
exports.Page.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'PageModel',
        });
    }
    else {
        console.log('PageModel index created');
    }
});
//# sourceMappingURL=page.model.js.map