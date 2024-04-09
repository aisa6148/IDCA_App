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
const _ = __importStar(require("lodash"));
const constants_1 = require("../config/constants");
const constants_2 = require("../config/constants");
const error_1 = require("../config/error");
const index_1 = __importDefault(require("../config/index"));
const roleAccess_services_1 = require("../db/services/roleAccess.services");
const user_service_1 = require("../db/services/user.service");
const memcached_1 = require("../services/memcached");
const config_utilities_1 = require("../utilities/config.utilities");
const error_utilities_1 = __importStar(require("../utilities/error.utilities"));
const log_utilities_1 = require("../utilities/log.utilities");
const security_controller_1 = __importDefault(require("./security.controller"));
class RoleAccess {
    static getRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (process.env.DEBUG) {
                    /* tslint:disable */
                    try {
                        let logHeaders = req.headers && Object.assign({}, req.headers);
                        delete logHeaders[constants_1.AUTH_HEADERS.ICAAUTH_SECRET];
                        delete logHeaders[constants_1.AUTH_HEADERS.ICAAUTH_TOKEN];
                        delete logHeaders[constants_1.AUTH_HEADERS.IAM_AUTH_TOKEN];
                        delete logHeaders[constants_1.AUTH_HEADERS.IAM_AUTH_TOKEN.toLocaleLowerCase()];
                        console.log({ headers: logHeaders, body: req.body });
                    }
                    catch (e) { }
                    /* tslint:enable */
                }
                const authType = security_controller_1.default.whichAuthIsReq(req);
                if (!process.env.ENV && !index_1.default.AUTH.PFED.ENABLED) {
                    res.locals.userID = process.env.mock_userID;
                    res.locals.upn = process.env.mock_upn;
                    res.locals.userName = process.env.mock_userName;
                    res.locals.mail = process.env.mock_mail;
                    res.locals.userADJoining = process.env.mock_userADJoining;
                }
                else {
                    switch (authType) {
                        case index_1.default.AUTH.TYPE.IAM:
                            const getIAMUserProfileData = yield memcachedSessionIAMUserProfile(res.locals.loginid);
                            if (!getIAMUserProfileData) {
                                throw new error_utilities_1.default(error_1.MODEL_ERRORS.USERAUTH_FAILED_USERRECORD.NAME, error_1.MODEL_ERRORS.USERAUTH_FAILED_USERRECORD.MESSAGE, error_1.MODEL_ERRORS.USERAUTH_FAILED_USERRECORD.CODE);
                            }
                            res.locals.userID = getIAMUserProfileData.userID;
                            res.locals.userName = getIAMUserProfileData.displayName;
                            res.locals.email = getIAMUserProfileData.emailID;
                            break;
                        case index_1.default.AUTH.TYPE.ICA:
                            // TODO
                            break;
                        case index_1.default.AUTH.TYPE.PFED:
                            // @ts-ignore - Property "upn" does not exist on type "Session & Partial<SessionData>".
                            let upn = req.session.upn || '';
                            // @ts-ignore - Property "userId" does not exist on type "Session & Partial<SessionData>".
                            let userID = req.session.userId;
                            // @ts-ignore - Property "email" does not exist on type "Session & Partial<SessionData>".
                            const email = req.session.email;
                            // @ts-ignore - Property "displayName" does not exist on type "Session & Partial<SessionData>".
                            const displayName = req.session.displayName;
                            // @ts-ignore - Property "memberOf" does not exist on type "Session & Partial<SessionData>".
                            const memberOf = config_utilities_1.getParsedArraySafe(req.session.memberOf);
                            if (!userID) {
                                return res.redirect('/api/login');
                            }
                            upn = upn.toLowerCase();
                            userID = userID.toLowerCase();
                            res.locals.userID = userID;
                            res.locals.upn = upn;
                            res.locals.memberOf = memberOf;
                            res.locals.email = email;
                            res.locals.displayName = displayName;
                            break;
                        default:
                            return res.status(403).end();
                    }
                }
                // check role
                const roles = new Set();
                switch (authType) {
                    case index_1.default.AUTH.TYPE.IAM:
                        if (res.locals.userID && res.locals.email) {
                            roles.add(constants_1.ROLES.CANDIDATE);
                        }
                        break;
                    case index_1.default.AUTH.TYPE.ICA:
                        // TODO
                        roles.add(constants_1.ROLES.ADMIN);
                        break;
                    case index_1.default.AUTH.TYPE.PFED:
                        try {
                            const roleDB = yield memcachedSessionPFEDUserRole(res.locals.userid);
                            _.each(roleDB, (v, i) => roles.add(v));
                            if (res.locals.memberOf &&
                                res.locals.memberOf.includes(index_1.default.AUTH.ROLEACCESS.SUPERADMIN_AD_GROUP)) {
                                roles.add(constants_1.ROLES.ADMIN);
                            }
                        }
                        catch (e) {
                            _.noop();
                        }
                        break;
                    default:
                }
                res.locals.roles = Array.from(roles);
                next();
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
}
function memcachedSessionIAMUserProfile(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let sessionUserDetailData;
        const key = `${constants_2.MEMCACHED.IAM_USER_PROFILE}_${userID}`;
        try {
            sessionUserDetailData = yield memcached_1.getValue(key);
            if (sessionUserDetailData) {
                return sessionUserDetailData;
            }
            else {
                const userData = yield user_service_1.fetchUserDataByEmailId(userID);
                if (!userData) {
                    return;
                }
                const userValues = {
                    emailID: userData.emailId,
                    displayName: userData.firstName,
                    userID,
                };
                try {
                    yield memcached_1.setValue(key, userValues, index_1.default.refreshTime);
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Error In IAM User Profile - Set Cache value');
                }
                return userValues;
            }
        }
        catch (error) {
            log_utilities_1.LogError(error, 'Error In IAM User Profile - session value get');
        }
    });
}
function memcachedSessionPFEDUserRole(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let sessionRoleData;
        const key = `${constants_2.MEMCACHED.PFED_ROLE}_${userID}`;
        try {
            sessionRoleData = yield memcached_1.getValue(key);
            if (sessionRoleData) {
                return sessionRoleData;
            }
            else {
                const allRoles = yield roleAccess_services_1.fetchAllRoles(userID);
                const roleDB = allRoles[0].roles;
                try {
                    yield memcached_1.setValue(key, roleDB, index_1.default.refreshTime);
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Error in RoleAccess - PFED role set Cache value');
                }
                return roleDB;
            }
        }
        catch (error) {
            log_utilities_1.LogError(error, 'Error in RoleAccess - PFED session value get');
        }
    });
}
exports.default = RoleAccess;
//# sourceMappingURL=roleAccess.controller.js.map