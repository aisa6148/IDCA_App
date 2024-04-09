"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAccessModel = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const roleAccess_schema_1 = require("../schema/roleAccess.schema");
exports.RoleAccessModel = mongoose_1.model('roleconfig', roleAccess_schema_1.RoleAccessSchema);
/* tslint:disable */
exports.RoleAccessModel.on("index", (error) => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: "RoleAccessModel",
        });
    }
    else {
        console.log("Role Access Model index created");
    }
});
//# sourceMappingURL=roleAccess.model.js.map