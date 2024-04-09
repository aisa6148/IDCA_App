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
const validate_1 = require("../config/validate");
const testimonials_service_1 = require("../db/services/testimonials.service");
const testimonials_service_2 = require("../db/services/testimonials.service");
const ImageService_1 = __importDefault(require("../services/ImageService"));
const error_utilities_1 = require("../utilities/error.utilities");
const log_utilities_1 = require("../utilities/log.utilities");
class Testimonials {
    static setTestimonialsData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, designation, testimonials, image, enabled } = req.body;
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
                    log_utilities_1.LogError(error, 'Add testimonails image size error');
                    return res.status(400).json({
                        status: constants_1.failure,
                    });
                }
                let imgResult;
                try {
                    const imageType = constants_1.IMAGE_TYPE.TESTMONIAL_IMAGE;
                    imgResult = yield ImageService_1.default.addContentImage(ID, image, imageType);
                    if (!imgResult) {
                        return res.status(400).json({
                            status: constants_1.failure,
                            message: 'Failed to upload testimonaial image',
                        });
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Add testimonial image error');
                    return res.status(400).json({
                        status: constants_1.failure,
                    });
                }
                const lengthValidate = validate_1.checkLength(testimonials.length);
                if (lengthValidate) {
                    yield testimonials_service_1.createTestimonials({
                        testimonialsID: ID,
                        name,
                        designation,
                        testimonials,
                        image: imgResult,
                        enabled,
                        createdBy: res.locals.userID,
                        updatedBy: res.locals.userID,
                        createdOn: Date.now(),
                        updatedOn: Date.now(),
                    });
                    res.json({
                        status: 'success',
                        message: 'Successfully added testimonials',
                        display: true,
                    }).status(200);
                }
                else {
                    res.json({
                        status: 'failed',
                        message: 'failed  to added testimonials testimonails length should be less than 250 Characters',
                        display: false,
                    }).status(400);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getTestimonialsData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminRoleCheck = res.locals.roles.includes(constants_1.ROLES.ADMIN);
                if (adminRoleCheck) {
                    const testimonials = yield testimonials_service_2.fetchAllTestimonials();
                    res.json({
                        status: 'success',
                        testimonials,
                        message: 'Successfully testimonials listed for admin',
                        display: true,
                    }).status(200);
                }
                else {
                    const enabled = constants_1.FLAG.TESTIMONIALSENABLED;
                    const testimonials = yield testimonials_service_2.fetchAllTestimonialsEnabled(enabled);
                    res.json({
                        status: 'success',
                        testimonials,
                        message: 'Successfully testimonials listed for candidate',
                        display: true,
                    }).status(200);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getTestimonialsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testimonialsID = req.params.testimonialsID;
                const testimonialById = yield testimonials_service_2.fetchTestimonialById(testimonialsID);
                if (testimonialById.length !== 0) {
                    res.json({
                        status: 'success',
                        testimonialById,
                        message: 'Successfully testimonials data listed by TestimonialsID',
                        display: true,
                    }).status(200);
                }
                else {
                    res.json({
                        status: 'failure',
                        message: 'No data found',
                        display: false,
                    }).status(404);
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static deleteTestimonials(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testimonialsID = req.params.testimonialsID;
                const imageType = constants_1.IMAGE_TYPE.TESTMONIAL_IMAGE;
                const response = yield testimonials_service_2.deleteTestimonialById(testimonialsID);
                let responseBlobImageDelete;
                try {
                    responseBlobImageDelete = yield ImageService_1.default.deleteImage(imageType, testimonialsID);
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Getting error at time deleting image from blob');
                    responseBlobImageDelete = 'error';
                }
                res.json({
                    status: 'success',
                    message: 'Successfully deleted the testimonial',
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
    static updateTestimonials(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testimonialsID = req.params.testimonialsID;
                if (Object.entries(req.body).length === 0) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'Nothing for update',
                    });
                }
                const calculatedFields = {
                    updatedBy: res.locals.userID,
                    updatedOn: Date.now(),
                    testimonialsID,
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
                        log_utilities_1.LogError(error, 'update testimonails image size error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                    try {
                        const imageType = constants_1.IMAGE_TYPE.TESTMONIAL_IMAGE;
                        imgResult = yield ImageService_1.default.addContentImage(testimonialsID, req.body.image, imageType);
                        if (!imgResult) {
                            return res.status(400).json({
                                status: constants_1.failure,
                                message: 'Failed to upload testimonaial image',
                            });
                        }
                        else {
                            calculatedFields.image = imgResult;
                        }
                    }
                    catch (error) {
                        log_utilities_1.LogError(error, 'update testimonial image error');
                        return res.status(400).json({
                            status: constants_1.failure,
                        });
                    }
                }
                if (req.body.hasOwnProperty('name')) {
                    calculatedFields.name = req.body.name;
                }
                if (req.body.hasOwnProperty('designation')) {
                    calculatedFields.designation = req.body.designation;
                }
                if (req.body.hasOwnProperty('testimonials')) {
                    calculatedFields.testimonials = req.body.testimonials;
                }
                if (req.body.hasOwnProperty('enabled')) {
                    calculatedFields.enabled = req.body.enabled;
                }
                const response = yield testimonials_service_2.updateTestimonialById(calculatedFields);
                res.json({
                    status: 'success',
                    message: 'Successfully updated the testimonial',
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
exports.default = Testimonials;
//# sourceMappingURL=testimonials.controller.js.map