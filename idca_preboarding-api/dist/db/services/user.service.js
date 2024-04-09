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
exports.fetchUserDataByEmail = exports.deleteCandidatewithStatusFalse = exports.fetchAllCandidate = exports.updateCandidateStatusId = exports.updateCandidateById = exports.updateUserDataById = exports.deleteUserDataById = exports.fetchUserDataByEmailId = exports.fetchUserDataByCandidateId = exports.fetchUserDataById = exports.fetchAllUserData = exports.createUser = void 0;
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const SqlDatabaseConnection_1 = require("../SqlDatabaseConnection");
exports.createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addFields = Object.assign({}, userData);
        addFields.updatedAt = Date.now();
        addFields.createdAt = Date.now();
        const returnValue = SqlDatabaseConnection_1.User.create(addFields);
        return returnValue;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.INSERT_USER_DATA);
    }
});
exports.fetchAllUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.findAll();
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.FETCH_USER_DATA);
    }
});
exports.fetchUserDataById = (applyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.findOne({
            where: {
                applyId,
            },
        });
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.FETCH_USER_DATA_BY_ID);
    }
});
exports.fetchUserDataByCandidateId = (applyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.findOne({
            where: {
                applyId,
            },
        });
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.FETCH_USER_DATA_BY_ID);
    }
});
exports.fetchUserDataByEmailId = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.findOne({
            where: {
                emailId,
                active: true,
            },
        });
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.FETCH_USER_DATA_BY_ID);
    }
});
exports.deleteUserDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.destroy({
            where: {
                id,
            },
        });
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.DELETE_USER_DATA_BY_ID);
    }
});
exports.updateUserDataById = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = userData.userID;
        const setFields = Object.assign({}, userData);
        delete setFields.userID;
        delete setFields.createdAt;
        setFields.updatedAt = Date.now();
        const returnUpdate = SqlDatabaseConnection_1.User.update(setFields, { where: { id: userID } });
        return returnUpdate;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.UPDATE_USER_DATA_BY_ID);
    }
});
exports.updateCandidateById = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setFields = Object.assign({}, userData);
        delete setFields.createdAt;
        setFields.updatedAt = Date.now();
        const returnUpdate = SqlDatabaseConnection_1.User.update(setFields, { where: { id } });
        return returnUpdate;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.UPDATE_USER_DATA_BY_ID);
    }
});
exports.updateCandidateStatusId = (statusData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnUpdateStatus = SqlDatabaseConnection_1.User.update({ active: false }, { where: { applyId: statusData } });
        return returnUpdateStatus;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.UPDATE_USER_DATA_BY_ID);
    }
});
exports.fetchAllCandidate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnAllData = SqlDatabaseConnection_1.User.findAll({});
        return returnAllData;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCandidatewithStatusFalse = (statusData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.destroy({ where: { applyId: statusData, locked: false } });
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.DELETE_USER_DATA_BY_ID);
    }
});
exports.fetchUserDataByEmail = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.findOne({
            where: {
                emailId,
            },
        });
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.FETCH_USER_DATA_BY_ID);
    }
});
exports.fetchUserDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnList = SqlDatabaseConnection_1.User.findOne({
            where: {
                id,
            },
        });
        return returnList;
    }
    catch (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.FETCH_USER_DATA_BY_ID);
    }
});
//# sourceMappingURL=user.service.js.map