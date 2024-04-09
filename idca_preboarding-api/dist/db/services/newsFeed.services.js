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
exports.updateNewsById = exports.deleteNewsById = exports.fetchNewsFeedById = exports.fetchAllNewsFeedEnabled = exports.fetchAllNewsFeed = exports.createNewsFeed = void 0;
const mongo_utilities_1 = require("../../utilities/mongo.utilities");
const newsFeed_model_1 = require("../model/newsFeed.model");
exports.createNewsFeed = (newsFeedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedNewsFeed = yield new newsFeed_model_1.NewsFeedModel(Object.assign({}, newsFeedData)).save({
            validateBeforeSave: true,
        });
        return savedNewsFeed;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.fetchAllNewsFeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = newsFeed_model_1.NewsFeedModel.find({}, {
            _id: 0,
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.fetchAllNewsFeedEnabled = (enabled) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = newsFeed_model_1.NewsFeedModel.find({ enabled }, {
            _id: 0,
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.fetchNewsFeedById = (newsID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = newsFeed_model_1.NewsFeedModel.find({ newsID }, {
            _id: 0,
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.deleteNewsById = (newsID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = newsFeed_model_1.NewsFeedModel.deleteOne({ newsID });
        const response = yield query.exec();
        return response;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.updateNewsById = (newsData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsID = newsData.newsID;
        const setFields = Object.assign({}, newsData);
        delete setFields.newsID;
        const query = newsFeed_model_1.NewsFeedModel.updateOne({ newsID }, { $set: setFields });
        const returnData = yield query.exec();
        return returnData;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
//# sourceMappingURL=newsFeed.services.js.map