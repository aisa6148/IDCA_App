"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbErrorHandler = void 0;
const error_1 = require("../config/error");
const mongo_error_code_1 = require("../config/mongo-error-code");
const error_utilities_1 = __importDefault(require("./error.utilities"));
exports.mongodbErrorHandler = (error) => {
    switch (error.code) {
        case mongo_error_code_1.MongoErrorCode.DUPLICATE_KEY: {
            throw new error_utilities_1.default(error_1.MODEL_ERRORS.MONGO_DUPLICATE_ERROR.MESSAGE, error_1.MODEL_ERRORS.MONGO_DUPLICATE_ERROR.MESSAGE, error_1.MODEL_ERRORS.MONGO_DUPLICATE_ERROR.CODE, error);
        }
        default:
            throw error;
    }
};
//# sourceMappingURL=mongo.utilities.js.map