"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerErrorHandler = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("../config/constants");
class AppError extends Error {
    constructor(name, message, code, error, httpCode = 500) {
        super(message);
        this.name = name;
        this.code = code;
        this.httpCode = httpCode;
        this.error = error;
    }
}
exports.default = AppError;
exports.controllerErrorHandler = (error, req, res) => {
    let errorProperties = {};
    const correlationID = req.headers['x-corelation-id'] || uuid_1.v4();
    if (error instanceof AppError) {
        res.statusCode = error.httpCode;
        res.json({
            status: constants_1.failure,
            code: error.code,
            message: error.message || constants_1.SOMETHING_WENT_WRONG,
            correlationID,
        });
        errorProperties = {
            statusCode: error.httpCode,
            status: constants_1.failure,
            code: error.code,
            message: error.message || constants_1.SOMETHING_WENT_WRONG,
            method: req.method,
            path: req.url,
            trace: error.stack,
            correlationID,
            error: error.error,
        };
    }
    else {
        res.statusCode = 500;
        res.json({
            status: constants_1.failure,
            message: constants_1.SOMETHING_WENT_WRONG,
            correlationID,
        });
        errorProperties = {
            statusCode: 500,
            status: constants_1.failure,
            message: constants_1.SOMETHING_WENT_WRONG,
            method: req.method,
            path: req.url,
            correlationID,
            error,
        };
    }
};
//# sourceMappingURL=error.utilities.js.map