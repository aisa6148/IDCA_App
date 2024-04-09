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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../config/constants");
const error_1 = require("../config/error");
const log_1 = require("../config/log");
const page_1 = require("../config/page");
const page_2 = require("../config/page");
const page_service_1 = require("../db/services/page.service");
const pageVersionHistory_services_1 = require("../db/services/pageVersionHistory.services");
const azureBlob_1 = require("../services/azureBlob");
const error_utilities_1 = __importStar(require("../utilities/error.utilities"));
const log_utilities_1 = require("../utilities/log.utilities");
const parser_utlilities_1 = require("../utilities/parser.utlilities");
class Page {
    static createPositioningEdit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                let pagePositioningID;
                const positioningData = yield page_service_1.fetchPostioingData();
                if (positioningData.length !== 0) {
                    pagePositioningID = body.pagePositioningID;
                    if (!body.pagePositioningID) {
                        return res.status(400).json({
                            status: constants_1.failure,
                            message: 'positioning ID is Required',
                        });
                    }
                }
                else {
                    pagePositioningID = body.pagePositioningID || uuid_1.v4();
                }
                if (body.appHomeItemListTopHeader.length > 4 ||
                    body.appHomeItemListBottomFooter.length > 4) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'size of the header and  footer should be less than 4',
                    });
                }
                const slotHomeTop = [];
                body.appHomeItemListTopHeader.forEach((element) => {
                    slotHomeTop.push(element.slot);
                });
                const uniqueTop = new Set(slotHomeTop).size !== slotHomeTop.length;
                if (uniqueTop === true) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'slot number should distinct for top header',
                    });
                }
                const slotHomeBottom = [];
                body.appHomeItemListBottomFooter.forEach((element) => {
                    slotHomeBottom.push(element.slot);
                });
                const uniqueBottom = new Set(slotHomeBottom).size !== slotHomeBottom.length;
                if (uniqueBottom === true) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'slot number should distinct for bottom',
                    });
                }
                const positioningTopHeaderList = body.appHomeItemListTopHeader &&
                    body.appHomeItemListTopHeader.map((positioning) => ({
                        pageID: positioning.pageID,
                        pageName: positioning.pageName,
                        pageIcon: positioning.pageIcon,
                        slot: positioning.slot,
                    }));
                const positioningAppFooterList = body.appHomeItemListBottomFooter &&
                    body.appHomeItemListBottomFooter.map((positioning) => ({
                        pageID: positioning.pageID,
                        pageName: positioning.pageName,
                        pageIcon: positioning.pageIcon,
                        slot: positioning.slot,
                    }));
                const pagePositioning = {
                    pagePositioningID,
                    appHomeTopHeader: positioningTopHeaderList,
                    appHomeBottomFooter: positioningAppFooterList,
                };
                yield page_service_1.upsertPagePositioning(pagePositioning, positioningTopHeaderList, positioningAppFooterList);
                res.json({
                    status: constants_1.success,
                    message: 'Page positioning successfully updated',
                    pagePositioningID,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getPostioningPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const positioningData = yield page_service_1.fetchPostioingData();
                res.json({
                    status: constants_1.success,
                    message: 'Page Positioning listed',
                    reesult: positioningData,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getPostioningPageReset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagePositioningID = req.params.id;
                const positioingTopHeaderList = [];
                const positioingAppFooterList = [];
                const pagePositioning = {
                    pagePositioningID,
                    appHomeTopHeader: positioingTopHeaderList,
                    appHomeBottomFooter: positioingAppFooterList,
                };
                yield page_service_1.upsertPagePositioning(pagePositioning, positioingTopHeaderList, positioingAppFooterList);
                res.json({
                    status: constants_1.success,
                    message: 'Page Reseted Succesfully',
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static deletePostioningPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagePositioningID = req.params.id;
                const result = yield page_service_1.deletePositioningPage(pagePositioningID);
                res.json({
                    status: constants_1.success,
                    message: 'Page positioning deleted Succesfully',
                    result,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchPageChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.params;
                if (![page_2.PAGE_TYPES.PREONBOARDING].includes(type)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PLAN_TYPE.CODE);
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.params;
                const pages = yield page_service_1.fetchPageByType(type);
                res.json({
                    status: constants_1.success,
                    pages,
                    message: 'Page successfully fetched',
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchPageByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield page_service_1.fetchPageByID(req.params.id);
                res.json({
                    status: constants_1.success,
                    page,
                    message: 'Page successfully fetched',
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static pageIDChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_MISSING.CODE);
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { type } = req.params;
                const pageID = body.pageID || uuid_1.v4();
                res.locals.userID = 'admin';
                const componentList = body.componentList &&
                    body.componentList.map((component) => ({
                        _id: parser_utlilities_1.convertToObjectID(component.componentID),
                        componentID: component.componentID,
                        componentType: component.componentType,
                        fields: component.fields,
                    }));
                const page = {
                    pageType: type,
                    pageID,
                    pageVersion: 0,
                    pageName: body.pageName,
                    status: page_1.PAGE_STATUS.DRAFT,
                    description: body.description,
                    createdBy: res.locals.userID,
                    // @ts-ignore
                    componentList,
                };
                // @ts-ignore
                yield page_service_1.upsertPage(page, componentList || []);
                res.json({
                    status: constants_1.success,
                    message: 'Page successfully updated',
                    pageID,
                    parentPageID: undefined,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPageChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pageName, description, pageID } = req.body;
                const { type } = req.params;
                if (![page_2.PAGE_TYPES.PREONBOARDING].includes(type)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.CODE);
                }
                if (!pageName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE);
                }
                if (pageID) {
                    const page = yield page_service_1.fetchPageByID(pageID);
                    if (page.status && page.status !== page_1.PAGE_STATUS.DRAFT) {
                        throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_UPDATE_FAILED.MESSAGE, error_1.MODEL_ERRORS.PAGE_UPDATE_FAILED.MESSAGE +
                            ` - Page is in ${page.status} state.`, error_1.MODEL_ERRORS.PAGE_UPDATE_FAILED.CODE);
                    }
                    if (page.pageVersion && page.pageVersion !== 0) {
                        throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PAGE_VERSION.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_VERSION.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_VERSION.CODE);
                    }
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchActivePages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageType = page_2.PAGE_TYPES.PREONBOARDING;
                const data = yield page_service_1.fetchPageByStatus(pageType, page_1.PAGE_STATUS.ACTIVE);
                res.json({
                    status: constants_1.success,
                    data,
                    message: 'Successfully fetched data',
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static fetchActivePagesByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageID = req.params.id;
                const pageType = page_2.PAGE_TYPES.PREONBOARDING;
                const data = yield page_service_1.fetchPageByIDAndStatus(pageType, pageID, page_1.PAGE_STATUS.ACTIVE);
                res.json({
                    status: constants_1.success,
                    data,
                    message: 'Successfully fetched data',
                    display: false,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static deletePage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = res.locals.page;
                yield page_service_1.deletePage(page.pageID);
                res.json({
                    status: constants_1.success,
                    message: 'Successfully deleted page data',
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPageEdit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const changes = {};
                const parentPageID = req.params.id;
                const parentPage = res.locals.page;
                let editPage;
                try {
                    editPage = yield page_service_1.fetchPageByParentId(parentPageID);
                    if (editPage.pageVersion === parentPage.pageVersion &&
                        editPage.pageID !== parentPage.pageID) {
                        // this case should not happen, if it does, to handle the case
                        editPage = undefined;
                        log_utilities_1.LogError(new Error('editPage.pageVersion === parentPage.pageVersion'), 'editPageVersionSameAsParentVersion', { parentPageID });
                        yield page_service_1.deletePage(editPage.pageID);
                    }
                }
                catch (e) {
                    editPage = undefined;
                    log_utilities_1.LogError(e, 'createPageEdit-fetchEditPageFailed', { parentPageID });
                }
                const body = req.body;
                if (body &&
                    editPage &&
                    body.pageID &&
                    editPage.pageID &&
                    body.pageID !== editPage.pageID) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_ID_NOTVALID.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_NOTVALID.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_NOTVALID.CODE);
                }
                const pageID = (editPage && editPage.pageID) || uuid_1.v4();
                const pageVersion = (editPage && editPage.pageVersion) || (parentPage.pageVersion || 0) + 1;
                const status = page_1.PAGE_STATUS.EDIT_ACTIVE;
                const pageName = body.pageName;
                const description = body.description;
                if (!(editPage && editPage.parentPageID === parentPageID)) {
                    changes.parentPageID = parentPageID;
                }
                if (!(editPage && editPage.pageID === pageID)) {
                    changes.pageID = pageID;
                }
                if (!(editPage && editPage.pageVersion === pageVersion)) {
                    changes.pageVersion = pageVersion;
                }
                if (!(editPage && editPage.status === status)) {
                    changes.status = status;
                }
                if (!(editPage ? editPage.pageName === pageName : parentPage.pageName === pageName)) {
                    changes.pageName = pageName;
                }
                if (!(editPage
                    ? editPage.description === description
                    : parentPage.description === description)) {
                    changes.description = description;
                }
                const toUpdateComponent = [];
                let newComponentList = body.componentList &&
                    body.componentList.map((component) => {
                        // @ts-ignore
                        const componentv = {
                            componentID: component.componentID,
                            componentType: parentPage.pageType,
                            fields: component.fields,
                        };
                        toUpdateComponent.push(componentv);
                        return componentv;
                    });
                newComponentList = newComponentList || [];
                changes.component = toUpdateComponent;
                // @ts-ignore
                const componentList = newComponentList.map((component) => ({
                    _id: parser_utlilities_1.convertToObjectID(component.componentID),
                    componentID: component.componentID,
                }));
                const newPage = {
                    pageType: parentPage.pageType,
                    pageID,
                    pageVersion,
                    parentPageID,
                    status,
                    pageName,
                    description,
                    updatedBy: res.locals.userID,
                    createdBy: res.locals.userID,
                    componentList,
                };
                yield page_service_1.upsertPage(newPage, toUpdateComponent);
                log_utilities_1.LogEvent('createPageEdit-upsertPageSuccess', {
                    parentPageID,
                    newpageID: newPage.pageID,
                });
                res.json({
                    status: constants_1.success,
                    message: 'Successfully updated page edit',
                    pageID,
                    parentPageID,
                    changes,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static createPageEditChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pageName, description, pageType } = req.body;
                const pageID = req.params.id;
                if (!pageID) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_MISSING.CODE);
                }
                const page = yield page_service_1.fetchPageByID(req.params.id);
                res.locals.page = page;
                if (!page) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PAGE_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PAGE_EMPTY.CODE);
                }
                if (!pageName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE);
                }
                if (!description) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.CODE);
                }
                if (![page_2.PAGE_TYPES.PREONBOARDING].includes(pageType)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.CODE);
                }
                if (![page_1.PAGE_STATUS.ACTIVE, page_1.PAGE_STATUS.EDIT_ACTIVE].includes(page.status)) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_NOT_PUBLISHED.MESSAGE, error_1.MODEL_ERRORS.PAGE_NOT_PUBLISHED.MESSAGE, error_1.MODEL_ERRORS.PAGE_NOT_PUBLISHED.CODE);
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static makePageActiveChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield page_service_1.fetchPageByID(req.params.id);
                const componentIDs = page.componentList.map((component) => {
                    return component.componentID;
                });
                if (page.status === page_1.PAGE_STATUS.ACTIVE) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_ALREADY_ACTIVE.MESSAGE, error_1.MODEL_ERRORS.PAGE_ALREADY_ACTIVE.MESSAGE, error_1.MODEL_ERRORS.PAGE_ALREADY_ACTIVE.CODE);
                }
                if (page.status !== page_1.PAGE_STATUS.DRAFT) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_NOT_IN_DRAFT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NOT_IN_DRAFT.MESSAGE + ` - Page is in ${page.status} state.`, error_1.MODEL_ERRORS.PAGE_NOT_IN_DRAFT.CODE);
                }
                if (!page.description) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.CODE);
                }
                if (!page.pageName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE);
                }
                res.locals.page = page;
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static makePageActive(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = res.locals.page;
                yield page_service_1.makePageActive(page.pageID, page_1.PAGE_STATUS.ACTIVE);
                res.json({
                    status: constants_1.success,
                    message: 'Page Successfully Active',
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static publishPageEditChecks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parentPageID = req.params.id;
                if (!parentPageID) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_MISSING.MESSAGE, error_1.MODEL_ERRORS.PAGE_ID_MISSING.CODE);
                }
                const parentPage = yield page_service_1.fetchPageByID(parentPageID);
                const editPage = yield page_service_1.fetchPageByParentId(parentPageID);
                res.locals.editPage = editPage;
                res.locals.parentPage = parentPage;
                res.locals.editPageID = editPage.pageID;
                res.locals.parentPageID = parentPageID;
                const componentIDs = editPage.componentList.map((component) => {
                    return component.componentID;
                });
                let componentList = yield page_service_1.fetchComponentList(editPage.pageID, componentIDs); // check
                const componentListFromParent = yield page_service_1.fetchComponentList(parentPageID, componentIDs);
                componentList = componentList.concat(componentListFromParent);
                if (editPage.status !== page_1.PAGE_STATUS.EDIT_ACTIVE) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_NOT_IN_EDIT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NOT_IN_EDIT.MESSAGE +
                        ` - Page is in ${editPage.status} state.`, error_1.MODEL_ERRORS.PAGE_NOT_IN_EDIT.CODE);
                }
                if (editPage.pageVersion === parentPage.pageVersion) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_AND_EDIT_VERSION_SAME.MESSAGE, error_1.MODEL_ERRORS.PAGE_AND_EDIT_VERSION_SAME.MESSAGE, error_1.MODEL_ERRORS.PAGE_AND_EDIT_VERSION_SAME.CODE);
                }
                if (!editPage.description) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_DESCRIPTION_NOT_PRESENT.CODE);
                }
                if (!editPage.pageName) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.MESSAGE, error_1.MODEL_ERRORS.PAGE_NAME_NOT_PRESENT.CODE);
                }
                if (componentList.length === 0) {
                    throw new error_utilities_1.default(error_1.MODEL_ERRORS.PAGE_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PAGE_EMPTY.MESSAGE, error_1.MODEL_ERRORS.PAGE_EMPTY.CODE);
                }
                for (const component of componentList) {
                    switch (editPage.pageType) {
                        case page_2.PAGE_TYPES.PREONBOARDING:
                            break;
                        default:
                            throw new error_utilities_1.default(error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.MESSAGE, error_1.MODEL_ERRORS.INVALID_PAGE_TYPE.CODE);
                    }
                }
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static publishPageEdit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parentPage = res.locals.parentPage;
                const editPage = res.locals.editPage;
                const parentPageID = res.locals.parentPageID;
                const changes = {};
                const versionHistoryPage = {
                    createdBy: res.locals.userID,
                    pageID: parentPageID,
                    pageVersion: parentPage.pageVersion || 0,
                    historyID: parser_utlilities_1.createHistoryIDforVersion(parentPageID, parentPage.pageVersion || 0),
                    page: parentPage,
                };
                const updatedPage = {
                    pageType: parentPage.pageType,
                    pageID: parentPage.pageID,
                    pageVersion: editPage.pageVersion,
                    status: page_1.PAGE_STATUS.ACTIVE,
                    pageName: editPage.pageName,
                    description: editPage.description,
                    createdBy: res.locals.userID,
                    componentList: editPage.componentList,
                };
                const promiseList = [];
                log_utilities_1.LogEvent('publishPageEdit-StartingHistoryPush', {
                    parentPageID,
                    editPageID: editPage.pageID,
                });
                promiseList.push(pageVersionHistory_services_1.createPageVersion(versionHistoryPage)); // create page version history
                yield Promise.all(promiseList);
                log_utilities_1.LogEvent('publishPageEdit-FinishedHistoryPush', {
                    parentPageID,
                    editPageID: editPage.pageID,
                });
                yield page_service_1.upsertPage(updatedPage, updatedPage.componentList);
                log_utilities_1.LogEvent('publishPageEdit-updatePage-UpsertPageComplete', {
                    parentPageID: updatedPage.pageID,
                }); // update parent page and components + publish
                yield Page.purgePageWithComponent(editPage.pageID); // purge components to be deleted
                res.json({
                    status: constants_1.success,
                    message: 'Successfully Updated and Published page edit',
                    changes,
                }).status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    /**
     * upload media file from onboard screen
     * @param req
     * @param res
     */
    static uploadMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fileName, pageID, componentID, fileSize, fileType } = req.body;
                const mediaID = req.body.mediaID || uuid_1.v4();
                const fileContent = req.file.buffer;
                // extract formData
                if (!pageID) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'Page ID not present',
                    });
                }
                let uploadMediaRes;
                let addedFile;
                try {
                    const generatedFileName = Page.generateBlobFileName(fileName, mediaID);
                    uploadMediaRes = yield azureBlob_1.uploadMediaToBlob(generatedFileName, fileContent);
                    // save content to mongo db
                    const uploadMedia = {
                        mediaID,
                        mediaName: fileName,
                        contentSize: fileSize,
                        mimeType: fileType,
                    };
                    addedFile = yield page_service_1.findOnePageAndAddMedia(pageID, componentID, uploadMedia);
                }
                catch (error) {
                    // log error
                    log_utilities_1.LogError(error, log_1.EVENT_NAME.BLOB_MEDIA_UPLOAD_FAIL, {
                        action: 'uploadMedia',
                        pageID,
                        fileName,
                    });
                }
                if (!uploadMediaRes) {
                    return res.status(400).json({
                        status: constants_1.failure,
                        message: 'Failed to upload the media file',
                        data: [],
                    });
                }
                else {
                    return res.json({
                        status: constants_1.success,
                        message: 'Successfully uploaded the media file',
                        data: addedFile,
                    });
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    /**
     *
     * @param fileName fetch media files
     */
    static fetchMediaFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fileName, mediaID } = req.params;
                const fetchFileName = Page.generateBlobFileName(fileName, mediaID);
                try {
                    const file = yield azureBlob_1.getUploadedFileFromBlob(fetchFileName);
                    if (file) {
                        res.end(file);
                    }
                    else {
                        res.status(404).end();
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, log_1.EVENT_NAME.BLOB_MEDIA_FETCH_FAIL, {
                        action: 'fetchMediaFile',
                        mediaID,
                        fetchFileName,
                    });
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    /**
     *
     * @param pageID
     * @param fileName
     */
    static deleteMediaFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pageID, componentID, fileName, mediaID } = req.params;
                const response = yield page_service_1.deleteMediaFromPage(pageID, componentID, mediaID);
                if (!response) {
                    return res
                        .json({
                        status: 'failure',
                        message: error_1.MODEL_ERRORS.DELETE_MEDIA_FAILED.MESSAGE,
                        display: false,
                        response,
                    })
                        .status(200);
                }
                const blobFileName = Page.generateBlobFileName(fileName, pageID);
                yield azureBlob_1.deleteImageFromBlob(blobFileName);
                return res
                    .json({
                    status: 'success',
                    message: 'Successfully deleted the media',
                    display: true,
                    response,
                })
                    .status(200);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static generateBlobFileName(fileName, pageID) {
        const blobName = `${pageID}__${fileName}`;
        return blobName;
    }
    static purgePageWithComponent(pageID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promiseList = [];
                promiseList.push(page_service_1.deleteComponentByPageID(pageID)); // purge currentPageEditComponents
                promiseList.push(page_service_1.deletePage(pageID)); // purge currentPageEdit
                yield Promise.all(promiseList);
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
}
exports.default = Page;
//# sourceMappingURL=page.controller.js.map