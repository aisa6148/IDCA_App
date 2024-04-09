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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const user_service_1 = require("../db/services/user.service");
const sync_service_1 = require("../services/CandidateServices/sync.service");
const ImageService_1 = __importDefault(require("../services/ImageService"));
const error_utilities_1 = require("../utilities/error.utilities");
const log_utilities_1 = require("../utilities/log.utilities");
class User {
    static setUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, firstName, lastName, middleName, emailId, userType, contact, applyId, HMEmail, preferredName, department, startDate, recruiterEmail, recruiterName, locationOfOffice, offerAcceptanceStatus, profilePic, } = req.body;
                try {
                    const stats = yield ImageService_1.default.checkImageSizeMB(profilePic);
                    if (!stats) {
                        return res.status(400).json({
                            status: constants_1.failure,
                            message: 'Image size should be less than 5MB',
                        });
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Add profile image size error');
                    return res.status(400).json({
                        status: constants_1.failure,
                    });
                }
                let imgResult;
                try {
                    const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                    imgResult = yield ImageService_1.default.addContentImage(emailId, profilePic, imageType);
                    if (!imgResult) {
                        return res.status(400).json({
                            status: constants_1.failure,
                            message: 'Failed to upload user image',
                        });
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Add user image error');
                    return res.status(400).json({
                        status: constants_1.failure,
                    });
                }
                try {
                    yield user_service_1.createUser({
                        title,
                        firstName,
                        lastName,
                        middleName,
                        emailId,
                        userType,
                        contact,
                        applyId,
                        HMEmail,
                        preferredName,
                        department,
                        startDate,
                        recruiterEmail,
                        recruiterName,
                        locationOfOffice,
                        offerAcceptanceStatus,
                        profilePic: imgResult,
                    });
                    res.json({
                        status: 'success',
                        message: 'created user succesfully',
                        display: true,
                    }).status(200);
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Add user data error');
                    res.json({
                        status: 'failed',
                        message: 'failed  to add user data',
                        display: false,
                    }).status(400);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield user_service_1.fetchAllUserData();
                res.json({
                    status: 'success',
                    userList,
                    message: 'Successfully listed user data',
                    display: true,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getUserDataByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.params.id;
                const userById = yield user_service_1.fetchUserDataById(userID);
                if (userById) {
                    res.json({
                        status: 'success',
                        user: userById,
                        message: 'Successfully user data listed by userID',
                        display: true,
                    }).status(200);
                }
                else {
                    res.json({
                        status: 'success',
                        message: 'No data found',
                        display: true,
                    }).status(200);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static deleteUserDataByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.params.id;
                const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                const userById = yield user_service_1.fetchUserDataById(userID);
                const response = yield user_service_1.deleteUserDataById(userID);
                let responseBlobImageDelete;
                try {
                    responseBlobImageDelete = yield ImageService_1.default.deleteImage(imageType, userById.dataValues.emailId);
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Getting error at time deleting image from blob');
                    responseBlobImageDelete = 'error';
                }
                if (response) {
                    res.json({
                        status: 'success',
                        response,
                        responseBlobImageDelete,
                        message: 'Successfully delete user data by ID',
                        display: true,
                    }).status(200);
                }
                else {
                    res.json({
                        status: 'success',
                        message: 'No record found',
                        display: true,
                    }).status(200);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static updateUserDataByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.params.id;
                if (Object.entries(req.body).length === 0) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'Nothing for update',
                    });
                }
                const calculatedFields = {
                    userID,
                };
                let imgResult;
                // if only profile pick get change
                if (req.body.profilePic && !req.body.emailId) {
                    const userById = yield user_service_1.fetchUserDataById(userID);
                    const emailId = userById.dataValues.emailId;
                    try {
                        const stats = yield ImageService_1.default.checkImageSizeMB(req.body.profilePic);
                        if (!stats) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Image size should be less than 5MB',
                            });
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update user profile image size error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                    try {
                        const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                        imgResult = yield ImageService_1.default.addContentImage(emailId, req.body.profilePic, imageType);
                        if (!imgResult) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Failed to upload user image',
                            });
                        }
                        else {
                            calculatedFields.profilePic = imgResult;
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update user image error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                }
                // if profile pick and email id both change
                if (req.body.profilePic && req.body.emailId) {
                    const emailId = req.body.emailId;
                    try {
                        const stats = yield ImageService_1.default.checkImageSizeMB(req.body.profilePic);
                        if (!stats) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Image size should be less than 5MB',
                            });
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update user profile image size error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                    try {
                        const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                        imgResult = yield ImageService_1.default.addContentImage(emailId, req.body.profilePic, imageType);
                        if (!imgResult) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Failed to upload user image',
                            });
                        }
                        else {
                            calculatedFields.profilePic = imgResult;
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update user image error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                }
                // if email id only get changed
                if (!req.body.profilePic && req.body.emailId) {
                    const userById = yield user_service_1.fetchUserDataById(userID);
                    const image = userById.dataValues.profilePic;
                    const imageBlob = yield ImageService_1.default.fetchImage(image);
                    const emailId = req.body.emailId;
                    try {
                        const stats = yield ImageService_1.default.checkImageSizeMB(imageBlob);
                        if (!stats) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Image size should be less than 5MB',
                            });
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update user profile image size error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                    try {
                        const imageType = constants_1.IMAGE_TYPE.PROFILE_IMAGE;
                        imgResult = yield ImageService_1.default.addContentImage(emailId, imageBlob, imageType);
                        if (!imgResult) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Failed to upload user image',
                            });
                        }
                        else {
                            calculatedFields.profilePic = imgResult;
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update user image error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                }
                if (req.body.hasOwnProperty('title')) {
                    calculatedFields.title = req.body.title;
                }
                if (req.body.hasOwnProperty('firstName')) {
                    calculatedFields.firstName = req.body.firstName;
                }
                if (req.body.hasOwnProperty('lastName')) {
                    calculatedFields.lastName = req.body.lastName;
                }
                if (req.body.hasOwnProperty('middleName')) {
                    calculatedFields.middleName = req.body.middleName;
                }
                if (req.body.hasOwnProperty('emailId')) {
                    calculatedFields.emailId = req.body.emailId;
                }
                if (req.body.hasOwnProperty('userType')) {
                    calculatedFields.userType = req.body.userType;
                }
                if (req.body.hasOwnProperty('contact')) {
                    calculatedFields.contact = req.body.contact;
                }
                if (req.body.hasOwnProperty('applyId')) {
                    calculatedFields.applyId = req.body.applyId;
                }
                if (req.body.hasOwnProperty('HMEmail')) {
                    calculatedFields.HMEmail = req.body.HMEmail;
                }
                if (req.body.hasOwnProperty('preferredName')) {
                    calculatedFields.preferredName = req.body.preferredName;
                }
                if (req.body.hasOwnProperty('department')) {
                    calculatedFields.department = req.body.department;
                }
                if (req.body.hasOwnProperty('startDate')) {
                    calculatedFields.startDate = req.body.startDate;
                }
                if (req.body.hasOwnProperty('recruiterEmail')) {
                    calculatedFields.recruiterEmail = req.body.recruiterEmail;
                }
                if (req.body.hasOwnProperty('recruiterName')) {
                    calculatedFields.recruiterName = req.body.recruiterName;
                }
                if (req.body.hasOwnProperty('locationOfOffice')) {
                    calculatedFields.locationOfOffice = req.body.locationOfOffice;
                }
                if (req.body.hasOwnProperty('offerAcceptanceStatus')) {
                    calculatedFields.offerAcceptanceStatus = req.body.offerAcceptanceStatus;
                }
                const response = yield user_service_1.updateUserDataById(calculatedFields);
                res.json({
                    status: 'success',
                    message: 'Successfully updated the user data by ID',
                    display: true,
                    response,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getImageBlobName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield ImageService_1.default.fetchImage(req.params.blobName);
                res.json({
                    status: 'success',
                    message: 'Successfully render the image data',
                    display: true,
                    response,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    // Talent Mart Code Start Here.
    static talentMartCall() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield sync_service_1.deltaSyncTalentMart();
                /* tslint:disable */
                console.log('Insert and update data successfully', data);
                /* tslint:enable */
                return data;
            }
            catch (error) {
                log_utilities_1.LogError(error, 'Talent mart data update');
            }
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.controller.js.map