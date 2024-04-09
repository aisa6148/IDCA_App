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
exports.deleteMediaFromPage = exports.findOnePageAndAddMedia = exports.makePageActive = exports.deleteComponentByPageID = exports.fetchPageByParentId = exports.deletePage = exports.fetchPageByIDAndStatus = exports.fetchPageByStatus = exports.deletePositioningPage = exports.upsertPagePositioning = exports.upsertPage = exports.fetchPageByID = exports.fetchPageByType = exports.fetchPostioingData = exports.fetchComponentList = void 0;
const uuid_1 = require("uuid");
const error_1 = require("../../config/error");
const page_1 = require("../../config/page");
const error_utilities_1 = __importDefault(require("../../utilities/error.utilities"));
const mongo_utilities_1 = require("../../utilities/mongo.utilities");
const page_model_1 = require("../model/page.model");
const pagePositioning_model_1 = require("../model/pagePositioning.model");
exports.fetchComponentList = (pageID, componentIDs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const componentList = yield page_model_1.Page.findOne({
            pageID,
        }).exec();
        if (!componentList) {
            throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PAGE_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PAGE_EMPTY.CODE);
        }
        const componentListMap = {};
        for (const component of componentList.componentList) {
            componentListMap[component.componentID] = component;
        }
        return componentIDs.map((componentID) => componentListMap[componentID]).filter((e) => e);
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.COMPONENT_LIST_FAILURE.MESSAGE, error_1.MODEL_ERRORS.COMPONENT_LIST_FAILURE.MESSAGE, error_1.MODEL_ERRORS.COMPONENT_LIST_FAILURE.CODE, error);
    }
});
exports.fetchPostioingData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = pagePositioning_model_1.PagePositioingModel.find({}, {
            _id: 0,
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.fetchPageByType = (pageType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageQuery = page_model_1.Page.aggregate([
            { $match: { pageType } },
            {
                $project: {
                    _id: 0,
                    pageType: 1,
                    pageID: 1,
                    pageVersion: 1,
                    parentPageID: 1,
                    pageName: 1,
                    status: 1,
                    createdOn: 1,
                    createdBy: 1,
                    updatedOn: 1,
                    updatedBy: 1,
                    count: { $size: '$componentList' },
                },
            },
        ]);
        const returnList = yield pageQuery.exec();
        return returnList;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE, error);
    }
});
exports.fetchPageByID = (pageID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield page_model_1.Page.findOne({
            pageID,
        }).exec();
        if (!page) {
            throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE);
        }
        return page;
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE, error);
    }
});
exports.upsertPage = (page, component) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageID = page.pageID || uuid_1.v4();
        yield page_model_1.Page.updateOne({
            pageID,
        }, {
            $set: Object.assign(Object.assign({}, page), { componentList: component, pageID }),
        }, { upsert: true }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_CREATION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_CREATION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_CREATION_FAILED.CODE, error);
    }
});
exports.upsertPagePositioning = (pagePositioning, pagePositioningItemHeader, pagePositioningItemFooter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagePositioningID = pagePositioning.pagePositioningID;
        yield pagePositioning_model_1.PagePositioingModel.updateOne({
            pagePositioningID,
        }, {
            $set: Object.assign(Object.assign({}, pagePositioning), { appHomeTopHeader: pagePositioningItemHeader, appHomeBottomFooter: pagePositioningItemFooter, pagePositioningID }),
        }, { upsert: true }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_POSITIONING_UPSERT_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_POSITIONING_UPSERT_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_POSITIONING_UPSERT_FAILED.CODE, error);
    }
});
exports.deletePositioningPage = (pagePositioningID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pagePositioning_model_1.PagePositioingModel.remove().exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_DELETION_FAILED.CODE, error);
    }
});
exports.fetchPageByStatus = (pageType, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield page_model_1.Page.find({
            pageType,
            status,
        }, {
            _id: 0,
            pageType: 1,
            pageID: 1,
            pageVersion: 1,
            parentPageID: 1,
            pageName: 1,
            status: 1,
            createdOn: 1,
            createdBy: 1,
            updatedOn: 1,
            updatedBy: 1,
        }).exec();
        if (!pages) {
            throw new Error();
        }
        return pages;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE, error);
    }
});
exports.fetchPageByIDAndStatus = (pageType, pageID, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield page_model_1.Page.findOne({
            pageID,
            pageType,
            status,
        }, {
            _id: 0,
            pageType: 1,
            pageID: 1,
            pageVersion: 1,
            parentPageID: 1,
            pageName: 1,
            status: 1,
            createdOn: 1,
            createdBy: 1,
            updatedOn: 1,
            updatedBy: 1,
        }).exec();
        if (!pages) {
            throw new Error();
        }
        return pages;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.MESSAGE, error_1.MODEL_ERRORS.FETCH_PAGE_FAILURE.CODE, error);
    }
});
exports.deletePage = (pageID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page_model_1.Page.deleteOne({
            pageID,
        }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_DELETION_FAILED.CODE, error);
    }
});
exports.fetchPageByParentId = (pageID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield page_model_1.Page.findOne({
            parentPageID: pageID,
        }).exec();
        if (!page) {
            throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.CODE);
        }
        return page;
    }
    catch (error) {
        if (error instanceof error_utilities_1.default) {
            throw error;
        }
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_FETCH_BY_PARENTID_FAILED.CODE, error);
    }
});
exports.deleteComponentByPageID = (pageID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page_model_1.Page.updateOne({
            pageID,
        }, {
            componentList: [],
        }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.COMPONENT_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.COMPONENT_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.COMPONENT_DELETION_FAILED.CODE, error);
    }
});
exports.makePageActive = (pageID, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page_model_1.Page.updateMany({
            status: page_1.PAGE_STATUS.ACTIVE,
        }, {
            $set: {
                status: page_1.PAGE_STATUS.DRAFT,
            },
        }).exec();
        yield page_model_1.Page.updateOne({
            pageID,
        }, {
            status,
        }).exec();
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.MESSAGE, error_1.MODEL_ERRORS.TASKS_STATUS_CHANGE_FAILED.CODE, error);
    }
});
/**
 *
 * findOnePageAndAddMedia
 * @param pageID
 * @param mediaList
 */
exports.findOnePageAndAddMedia = (pageID, componentID, mediaItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mediaQuery = page_model_1.Page.findOneAndUpdate({
            pageID,
            'componentList.componentID': componentID,
        }, {
            $push: { 'componentList.$.mediaList': mediaItem },
        });
        yield mediaQuery.exec();
        return mediaItem;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILEUPLOAD_FAILURE.CODE, error);
    }
});
/**
 *
 * @param pageID
 * @param mediaID
 */
exports.deleteMediaFromPage = (pageID, componentID, mediaID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        page_model_1.Page.updateOne({
            pageID,
            'componentList.componentID': componentID,
        }, {
            // @ts-ignore
            $pull: { 'componentList.$.mediaList': { mediaID: { $in: mediaID } } },
        }).exec();
        return true;
    }
    catch (error) {
        throw new error_utilities_1.default(error_1.MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.MESSAGE, error_1.MODEL_ERRORS.BLOB_FILE_DELETION_FAILED.CODE, error);
    }
});
//# sourceMappingURL=page.service.js.map