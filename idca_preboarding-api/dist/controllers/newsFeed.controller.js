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
const uuid_1 = require("uuid");
const constants_1 = require("../config/constants");
const newsFeed_services_1 = require("../db/services/newsFeed.services");
const newsFeed_services_2 = require("../db/services/newsFeed.services");
const ImageService_1 = __importDefault(require("../services/ImageService"));
const error_utilities_1 = require("../utilities/error.utilities");
const log_utilities_1 = require("../utilities/log.utilities");
class NewsFeed {
    static setNewsFeedData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, image, url, enabled } = req.body;
                const ID = uuid_1.v4();
                try {
                    const stats = yield ImageService_1.default.checkImageSizeMB(image);
                    if (!stats) {
                        return res.status(400).json({
                            status: constants_1.failure,
                            message: 'Image size should be less than 5MB',
                        });
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Add newsfeed image size error');
                    return res.status(400).json({
                        status: constants_1.failure,
                    });
                }
                let imgResult;
                try {
                    const imageType = constants_1.IMAGE_TYPE.NEWSFEED_IMAGE;
                    imgResult = yield ImageService_1.default.addContentImage(ID, image, imageType);
                    if (!imgResult) {
                        return res.status(400).json({
                            status: constants_1.failure,
                            message: 'Failed to upload newsfeed Image',
                        });
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Add newsfeed image');
                    return res.status(400).json({
                        status: constants_1.failure,
                    });
                }
                yield newsFeed_services_1.createNewsFeed({
                    newsID: ID,
                    title,
                    content,
                    image: imgResult,
                    url,
                    enabled,
                    createdBy: res.locals.userID,
                    updatedBy: res.locals.userID,
                    createdOn: Date.now(),
                    updatedOn: Date.now(),
                });
                res.json({
                    status: 'success',
                    message: 'Successfully news feed data added in Database',
                    display: true,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getNewsFeedData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminRoleCheck = res.locals.roles.includes(constants_1.ROLES.ADMIN);
                if (adminRoleCheck) {
                    const allNewsFeed = yield newsFeed_services_2.fetchAllNewsFeed();
                    res.json({
                        status: 'success',
                        allNewsFeed,
                        message: 'Successfully news feed data listed for admin',
                        display: true,
                    }).status(200);
                }
                else {
                    const enabled = constants_1.FLAG.NEWSFEEDENABLED;
                    const allNewsFeedEnabled = yield newsFeed_services_2.fetchAllNewsFeedEnabled(enabled);
                    res.json({
                        status: 'success',
                        allNewsFeedEnabled,
                        message: 'Successfully news feed data listed for candidate',
                        display: true,
                    }).status(200);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getNewsFeedDataById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newsID = req.params.newsID;
                const newsFeedById = yield newsFeed_services_2.fetchNewsFeedById(newsID);
                if (newsFeedById.length !== 0) {
                    res.json({
                        status: 'success',
                        newsFeedById,
                        message: 'Successfully news feed data listed NewsID',
                        display: true,
                    }).status(200);
                }
                else {
                    res.json({
                        status: 'failure',
                        message: 'No data found',
                        display: true,
                    }).status(404);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static deleteNewsFeed(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newsID = req.params.newsID;
                const imageType = constants_1.IMAGE_TYPE.NEWSFEED_IMAGE;
                const response = yield newsFeed_services_2.deleteNewsById(newsID);
                let responseBlobImageDelete;
                try {
                    responseBlobImageDelete = yield ImageService_1.default.deleteImage(imageType, newsID);
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Getting error at time deleting image from blob');
                    responseBlobImageDelete = 'error';
                }
                res.json({
                    status: 'success',
                    message: 'Successfully deleted the newsfeed',
                    display: true,
                    response,
                    responseBlobImageDelete,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static updateNewsFeed(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newsID = req.params.newsID;
                if (Object.entries(req.body).length === 0) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'Nothing for update',
                    });
                }
                const calculatedFields = {
                    updatedBy: res.locals.userID,
                    updatedOn: Date.now(),
                    newsID,
                };
                let imgResult;
                if (req.body.image) {
                    try {
                        const stats = yield ImageService_1.default.checkImageSizeMB(req.body.image);
                        if (!stats) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Image size should be less than 5MB',
                            });
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update newsfeed image size error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                    try {
                        const imageType = constants_1.IMAGE_TYPE.NEWSFEED_IMAGE;
                        imgResult = yield ImageService_1.default.addContentImage(newsID, req.body.image, imageType);
                        if (!imgResult) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Failed to upload newsfeed Image',
                            });
                        }
                        else {
                            calculatedFields.image = imgResult;
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update newsfeed image');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                }
                if (req.body.hasOwnProperty('title')) {
                    calculatedFields.title = req.body.title;
                }
                if (req.body.hasOwnProperty('content')) {
                    calculatedFields.content = req.body.content;
                }
                if (req.body.hasOwnProperty('url')) {
                    calculatedFields.url = req.body.url;
                }
                if (req.body.hasOwnProperty('enabled')) {
                    calculatedFields.enabled = req.body.enabled;
                }
                const response = yield newsFeed_services_2.updateNewsById(calculatedFields);
                res.json({
                    status: 'success',
                    message: 'Successfully updated the newsfeed',
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
}
exports.default = NewsFeed;
//# sourceMappingURL=newsFeed.controller.js.map