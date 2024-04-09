"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLog = void 0;
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const SqlDatabaseConnection_1 = require("../SqlDatabaseConnection");
exports.createLog = (LogDataStore) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addFields = Object.assign({}, LogDataStore);
        addFields.updatedAt = Date.now();
        addFields.createdAt = Date.now();
        const returnValue = SqlDatabaseConnection_1.LogManage.create(addFields);
        return returnValue;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.INSERT_LOG_DATA);
    }
});
//# sourceMappingURL=log.service.js.map