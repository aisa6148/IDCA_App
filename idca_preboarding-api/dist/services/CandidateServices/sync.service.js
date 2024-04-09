"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deltaSyncTalentMart = exports.getAllCandidateFromPreboardingDB = exports.getCandidateFromTalentMartDB = void 0;
const _ = __importStar(require("lodash"));
const constants_1 = require("../../config/constants");
const log_service_1 = require("../../db/services/log.service");
const user_service_1 = require("../../db/services/user.service");
const ImageService_1 = __importDefault(require("../../services/ImageService"));
const log_utilities_1 = require("../../utilities/log.utilities");
const talentMartService_1 = __importDefault(require("../talentMartService"));
exports.getCandidateFromTalentMartDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const userDataFromTalentMart = yield talentMartService_1.default.getUserData();
    const parsedAssociates = userDataFromTalentMart.map((candidate) => ({
        title: candidate.title,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        middleName: candidate.middleName,
        emailId: candidate.emailId,
        userType: candidate.userType,
        contact: candidate.contact,
        applyId: candidate.applyId,
        HMEmail: candidate.HMEmail,
        preferredName: candidate.preferredName,
        department: candidate.department,
        startDate: candidate.startDate,
        recruiterEmail: candidate.recruiterEmail,
        recruiterName: candidate.recruiterName,
        locationOfOffice: candidate.locationOfOffice,
        offerAcceptanceStatus: candidate.offerAcceptanceStatus,
        profilePic: candidate.profilePic,
        active: candidate.active,
        locked: candidate.locked,
    }));
    return parsedAssociates;
});
exports.getAllCandidateFromPreboardingDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCandidate = yield user_service_1.fetchAllCandidate();
    const parsedCandidate = allCandidate.map((candidate) => ({
        id: candidate.id,
        title: candidate.title,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        middleName: candidate.middleName,
        emailId: candidate.emailId,
        userType: candidate.userType,
        contact: candidate.contact,
        applyId: candidate.applyId,
        HMEmail: candidate.HMEmail,
        preferredName: candidate.preferredName,
        department: candidate.department,
        startDate: candidate.startDate,
        recruiterEmail: candidate.recruiterEmail,
        recruiterName: candidate.recruiterName,
        locationOfOffice: candidate.locationOfOffice,
        offerAcceptanceStatus: candidate.offerAcceptanceStatus,
        profilePic: candidate.profilePic,
        active: candidate.active,
        locked: candidate.locked,
        createdAt: candidate.createdAt,
        updatedAt: candidate.updatedAt,
    }));
    const candidateMap = {};
    parsedCandidate.forEach((candidate) => {
        if (candidate.applyId) {
            candidateMap[candidate.applyId] = candidate;
        }
    });
    return {
        candidateMap,
    };
});
exports.deltaSyncTalentMart = () => __awaiter(void 0, void 0, void 0, function* () {
    const ts = Date.now();
    const logPrefix = `DeltaSyncTalentMart-${ts}`;
    const LogDataStore = {
        logName: logPrefix,
        logEvent: 'START',
        logMessage: 'Sync Started',
    };
    const resLog = yield log_service_1.createLog(LogDataStore);
    let talentMartCandidateMap;
    let preboardingDBCandidateRes;
    try {
        talentMartCandidateMap = yield exports.getCandidateFromTalentMartDB();
    }
    catch (error) {
        const LogDataStoreError = {
            logName: logPrefix,
            logEvent: 'ERROR',
            logMessage: 'Error in getting value from the talentmart DB',
        };
        yield log_service_1.createLog(LogDataStoreError);
        log_utilities_1.LogError(error, 'Error in getting value from the talent mart');
        throw error;
    }
    try {
        preboardingDBCandidateRes = yield exports.getAllCandidateFromPreboardingDB();
    }
    catch (e) {
        const LogDataStorePreDB = {
            logName: logPrefix,
            logEvent: 'ERROR',
            logMessage: 'Error in getting value from the Preboarding SQL DB',
        };
        yield log_service_1.createLog(LogDataStorePreDB);
        log_utilities_1.LogError(e, 'Error in getting value from the DB');
        throw e;
    }
    try {
        const data = yield insertAndUpdateProcessWithTalentMartData(logPrefix, talentMartCandidateMap, preboardingDBCandidateRes);
        return data;
    }
    catch (e) {
        const LogDataStorePreDB = {
            logName: logPrefix,
            logEvent: 'ERROR',
            logMessage: 'Error in process',
        };
        yield log_service_1.createLog(LogDataStorePreDB);
        log_utilities_1.LogError(e, 'Error in process');
        throw e;
    }
});
function insertAndUpdateProcessWithTalentMartData(logPrefix, talentMartCandidateMap, preboardingDBCandidateRes) {
    return __awaiter(this, void 0, void 0, function* () {
        const preboardingDBCandidateIdMap = preboardingDBCandidateRes.candidateMap;
        const applyId = [];
        const candidateToAdd = {};
        const candidateUpdate = [];
        for (const candidate of talentMartCandidateMap) {
            applyId.push(candidate.applyId);
            const id = candidate.applyId;
            if (!preboardingDBCandidateIdMap[id]) {
                const toCreateAssociate = {
                    title: candidate.title,
                    firstName: candidate.firstName,
                    lastName: candidate.lastName,
                    middleName: candidate.middleName,
                    emailId: candidate.emailId,
                    userType: candidate.userType,
                    contact: candidate.contact,
                    applyId: candidate.applyId,
                    HMEmail: candidate.HMEmail,
                    preferredName: candidate.preferredName,
                    department: candidate.department,
                    startDate: candidate.startDate,
                    recruiterEmail: candidate.recruiterEmail,
                    recruiterName: candidate.recruiterName,
                    locationOfOffice: candidate.locationOfOffice,
                    offerAcceptanceStatus: candidate.offerAcceptanceStatus,
                    active: true,
                    locked: false,
                    profilePic: candidate.profilePic,
                };
                candidateToAdd[id] = toCreateAssociate;
            }
            else if (preboardingDBCandidateIdMap[id].locked) {
                const LogDataStoreLock = {
                    logName: logPrefix,
                    logEvent: 'ACCOUNT_LOCK_ENABLED',
                    logMessage: 'This Account has been locked and User ID is -' +
                        preboardingDBCandidateIdMap[id].applyId,
                };
                yield log_service_1.createLog(LogDataStoreLock);
            }
            else {
                try {
                    const candidateUpdateValue = yield updateUserDataFormateTalentMart(candidate, preboardingDBCandidateIdMap, id);
                    candidateUpdate.push(candidateUpdateValue);
                }
                catch (e) {
                    const LogDataStoreStruct = {
                        logName: logPrefix,
                        logEvent: 'ERROR',
                        logMessage: 'Error in formating value for the update process',
                    };
                    yield log_service_1.createLog(LogDataStoreStruct);
                    log_utilities_1.LogError(e, 'Error in formating value for the update process');
                    throw e;
                }
            }
        }
        const valuesForUpdateCandidate = Object.assign({}, ...candidateUpdate);
        const keysFromDBCandidate = [];
        for (const k in preboardingDBCandidateIdMap) {
            keysFromDBCandidate.push(k);
        }
        const candidateNotExsist = keysFromDBCandidate.filter((x) => applyId.indexOf(x) === -1);
        const status = yield valuesForTalentmartProcess(logPrefix, candidateToAdd, valuesForUpdateCandidate, candidateNotExsist);
        return status;
    });
}
function updateUserDataFormateTalentMart(candidate, preboardingDBCandidateIdMap, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidateToUpdate = {};
        const prebData = preboardingDBCandidateIdMap[id];
        const updateValues = {};
        const blobName = constants_1.IMAGE_TYPE.PROFILE_IMAGE + '-' + id;
        const responseImageFrom = yield ImageService_1.default.fetchImage(blobName);
        if (prebData.title !== candidate.title) {
            updateValues.title = candidate.title;
        }
        if (prebData.firstName !== candidate.firstName) {
            updateValues.firstName = candidate.firstName;
        }
        if (prebData.lastName !== candidate.lastName) {
            updateValues.lastName = candidate.lastName;
        }
        if (prebData.middleName !== candidate.middleName) {
            updateValues.middleName = candidate.middleName;
        }
        if (prebData.emailId !== candidate.emailId) {
            updateValues.emailId = candidate.emailId;
        }
        if (prebData.userType !== candidate.userType) {
            updateValues.userType = candidate.userType;
        }
        if (prebData.contact !== candidate.contact) {
            updateValues.contact = candidate.contact;
        }
        if (prebData.applyId !== candidate.applyId) {
            updateValues.applyId = candidate.applyId;
        }
        if (prebData.HMEmail !== candidate.HMEmail) {
            updateValues.HMEmail = candidate.HMEmail;
        }
        if (prebData.preferredName !== candidate.preferredName) {
            updateValues.preferredName = candidate.preferredName;
        }
        if (prebData.department !== candidate.department) {
            updateValues.department = candidate.department;
        }
        if (prebData.startDate.getTime() !== new Date(candidate.startDate).getTime()) {
            updateValues.startDate = candidate.startDate;
        }
        if (prebData.recruiterEmail !== candidate.recruiterEmail) {
            updateValues.recruiterEmail = candidate.recruiterEmail;
        }
        if (prebData.recruiterName !== candidate.recruiterName) {
            updateValues.recruiterName = candidate.recruiterName;
        }
        if (prebData.locationOfOffice !== candidate.locationOfOffice) {
            updateValues.locationOfOffice = candidate.locationOfOffice;
        }
        if (prebData.offerAcceptanceStatus !== candidate.offerAcceptanceStatus) {
            updateValues.offerAcceptanceStatus = candidate.offerAcceptanceStatus;
        }
        if (responseImageFrom !== candidate.profilePic) {
            updateValues.profilePic = candidate.profilePic;
        }
        // active and locked handle by default values
        if (_.size(updateValues)) {
            candidateToUpdate[prebData.id] = updateValues;
        }
        return candidateToUpdate;
    });
}
function valuesForTalentmartProcess(logPrefix, candidateToAdd, candidateToUpdate, candidateNotExsist) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield updataInsertInTalentmart(logPrefix, candidateToAdd, candidateToUpdate, candidateNotExsist);
            const stat = {
                addSuccess: res.addSuccess,
                addFail: res.addFail,
                updateSuccess: res.updateSuccess,
                updateFail: res.updateFail,
                deletesucess: res.deletesucess,
                deleteFailed: res.deleteFailed,
            };
            const LogDataStoreStatus = {
                logName: logPrefix,
                logEvent: 'STAT',
                logMessage: 'Added success:' +
                    _.size(res.addSuccess) +
                    'Add Failed:' +
                    _.size(res.addFail) +
                    'Update Success:' +
                    _.size(res.updateSuccess) +
                    'Update Failed:' +
                    _.size(res.updateFail) +
                    'delete Success:' +
                    _.size(res.deletesucess) +
                    'delete Failed:' +
                    _.size(res.deleteFailed),
            };
            try {
                yield log_service_1.createLog(LogDataStoreStatus);
            }
            catch (e) {
                log_utilities_1.LogError(e, 'Error in add log values');
                throw e;
            }
            const LogDataStoreDataSetError = {
                logName: logPrefix,
                logEvent: 'END',
                logMessage: 'End  of the Data mart Sync values',
            };
            yield log_service_1.createLog(LogDataStoreDataSetError);
            return stat;
        }
        catch (error) {
            const LogDataStoreDataSetError = {
                logName: logPrefix,
                logEvent: 'ERROR',
                logMessage: 'Error in add and update values',
            };
            yield log_service_1.createLog(LogDataStoreDataSetError);
            log_utilities_1.LogError(error, 'Error in add and update values');
            throw error;
        }
    });
}
function updataInsertInTalentmart(logPrefix, candidateToAdd, candidateToUpdate, candidateNotExsist) {
    return __awaiter(this, void 0, void 0, function* () {
        const addSuccess = [];
        const addFail = {};
        const updateSuccess = [];
        const updateFail = {};
        const deletesucess = [];
        const deleteFailed = {};
        // add associates
        for (const id in candidateToAdd) {
            try {
                let imgResult;
                const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                imgResult = yield ImageService_1.default.addContentImage(id, candidateToAdd[id].profilePic, imageType);
                candidateToAdd[id].profilePic = imgResult;
                const res = yield user_service_1.createUser(candidateToAdd[id]);
                addSuccess.push(candidateToAdd[id].applyId);
            }
            catch (e) {
                addFail[id] = e;
                const LogDataStoreCreateUser = {
                    logName: logPrefix,
                    logEvent: 'ERROR',
                    logMessage: 'Error in add values at time of insert' + addFail[id],
                };
                yield log_service_1.createLog(LogDataStoreCreateUser);
                log_utilities_1.LogError(e, 'Error in add values');
                throw e;
            }
        }
        // update associates
        for (const id in candidateToUpdate) {
            try {
                let imgResult;
                const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                if (candidateToUpdate[id].profilePic) {
                    const dataResponceForapplyID = yield user_service_1.fetchUserDataById(id);
                    imgResult = yield ImageService_1.default.addContentImage(dataResponceForapplyID.applyId, candidateToUpdate[id].profilePic, imageType);
                    candidateToUpdate[id].profilePic = imgResult;
                }
                const res = yield user_service_1.updateCandidateById(id, candidateToUpdate[id]);
                updateSuccess.push(candidateToUpdate[id]);
            }
            catch (e) {
                updateFail[id] = e;
                const LogDataStoreUpdateUser = {
                    logName: logPrefix,
                    logEvent: 'ERROR',
                    logMessage: 'Error in update' + updateFail[id],
                };
                yield log_service_1.createLog(LogDataStoreUpdateUser);
                log_utilities_1.LogError(e, 'Error in update values');
                throw e;
            }
        }
        // TODO: handle inactive users.
        for (let id in candidateNotExsist) {
            try {
                id = candidateNotExsist[id].toString();
                const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                yield ImageService_1.default.deleteImage(imageType, id);
                const res = yield user_service_1.deleteCandidatewithStatusFalse(id);
                if (res === 1) {
                    deletesucess.push(id);
                }
            }
            catch (error) {
                deleteFailed[id] = error;
                const LogDataStoreDeleteUser = {
                    logName: logPrefix,
                    logEvent: 'ERROR',
                    logMessage: 'Error in delete' + deleteFailed[id],
                };
                yield log_service_1.createLog(LogDataStoreDeleteUser);
                log_utilities_1.LogError(error, 'Error in status update values');
                throw error;
            }
        }
        return {
            addSuccess,
            addFail,
            updateSuccess,
            updateFail,
            deletesucess,
            deleteFailed,
        };
    });
}
//# sourceMappingURL=sync.service.js.map