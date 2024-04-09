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
exports.updateTestimonialById = exports.deleteTestimonialById = exports.fetchTestimonialById = exports.fetchAllTestimonialsEnabled = exports.fetchAllTestimonials = exports.createTestimonials = void 0;
const mongo_utilities_1 = require("../../utilities/mongo.utilities");
const testimonials_model_1 = require("../model/testimonials.model");
exports.createTestimonials = (testimonialsData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedTestimonials = yield new testimonials_model_1.ITestimonialsModel(Object.assign({}, testimonialsData)).save({
            validateBeforeSave: true,
        });
        return savedTestimonials;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.fetchAllTestimonials = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = testimonials_model_1.ITestimonialsModel.find({}, {
            _id: 0,
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.fetchAllTestimonialsEnabled = (enabled) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = testimonials_model_1.ITestimonialsModel.find({ enabled }, {
            _id: 0,
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.fetchTestimonialById = (testimonialsID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = testimonials_model_1.ITestimonialsModel.find({ testimonialsID }, {
            _id: 0,
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.deleteTestimonialById = (testimonialsID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = testimonials_model_1.ITestimonialsModel.deleteOne({ testimonialsID });
        const response = yield query.exec();
        return response;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.updateTestimonialById = (testimonialsData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonialsID = testimonialsData.testimonialsID;
        const setFields = Object.assign({}, testimonialsData);
        delete setFields.testimonialsID;
        const query = testimonials_model_1.ITestimonialsModel.updateOne({ testimonialsID }, { $set: setFields });
        const returnData = yield query.exec();
        return returnData;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
//# sourceMappingURL=testimonials.service.js.map