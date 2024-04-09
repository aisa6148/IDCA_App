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
const lodash_1 = __importDefault(require("lodash"));
const constants_1 = require("../config/constants");
const index_1 = __importDefault(require("../config/index"));
const user_service_1 = require("../db/services/user.service");
const IAMServices_1 = __importDefault(require("../services/IAMServices/IAMServices"));
const log_utilities_1 = require("../utilities/log.utilities");
const passport_controller_1 = __importDefault(require("./passport.controller"));
class SecurityController {
    static checkPFEDAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.locals.authType = index_1.default.AUTH.TYPE.PFED;
            return SecurityController.checkCookies(req, res, next);
        });
    }
    static checkIAMAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const iamAuthtokenHeader = req.headers[constants_1.AUTH_HEADERS.IAM_AUTH_TOKEN] ||
                req.headers[constants_1.AUTH_HEADERS.IAM_AUTH_TOKEN.toLocaleLowerCase()];
            const iamAuthtoken = iamAuthtokenHeader;
            if (iamAuthtoken) {
                try {
                    const authRes = yield IAMServices_1.default.authenticateToken(iamAuthtoken);
                    res.locals.authType = index_1.default.AUTH.TYPE.IAM;
                    res.locals.loginid = authRes.principal.loginId;
                    next();
                }
                catch (e) {
                    log_utilities_1.LogError(e, 'Error-AuthenticateIAM');
                    return res.status(401).json(e);
                }
            }
            else {
                return res.status(401).end();
            }
        });
    }
    static checkICAAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const icaAuthtokenHeader = req.headers[constants_1.AUTH_HEADERS.ICAAUTH_TOKEN] ||
                req.headers[constants_1.AUTH_HEADERS.ICAAUTH_TOKEN.toLocaleLowerCase()];
            const icaAuthSecretHeader = req.headers[constants_1.AUTH_HEADERS.ICAAUTH_SECRET] ||
                req.headers[constants_1.AUTH_HEADERS.ICAAUTH_SECRET.toLocaleLowerCase()];
            if (icaAuthtokenHeader === index_1.default.AUTH.ICA.AUTH_TOKEN &&
                icaAuthSecretHeader === index_1.default.AUTH.ICA.SECRET) {
                res.locals.authType = index_1.default.AUTH.TYPE.ICA;
                next();
            }
            else {
                return res.status(401).end();
            }
        });
    }
    static whichAuthIsReq(req) {
        if (req.headers[constants_1.AUTH_HEADERS.ICAAUTH_TOKEN] ||
            req.headers[constants_1.AUTH_HEADERS.ICAAUTH_TOKEN.toLocaleLowerCase()]) {
            return index_1.default.AUTH.TYPE.ICA;
        }
        else if (req.headers[constants_1.AUTH_HEADERS.IAM_AUTH_TOKEN] ||
            req.headers[constants_1.AUTH_HEADERS.IAM_AUTH_TOKEN.toLocaleLowerCase()]) {
            return index_1.default.AUTH.TYPE.IAM;
        }
        else {
            return index_1.default.AUTH.TYPE.PFED;
        }
    }
    static checkAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authType = SecurityController.whichAuthIsReq(req);
            /* tslint:disable */
            console.log('in check auth', authType);
            /* tslint:enable */
            switch (authType) {
                case index_1.default.AUTH.TYPE.IAM:
                    return SecurityController.checkIAMAuth(req, res, next);
                case index_1.default.AUTH.TYPE.ICA:
                    return SecurityController.checkICAAuth(req, res, next);
                case index_1.default.AUTH.TYPE.PFED:
                    return SecurityController.checkCookies(req, res, next);
                default:
                    return res.status(401).end();
            }
        });
    }
    static checkCookies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session || req.session.userId === undefined || req.session.userId === null) {
                /* tslint:disable */
                console.log('checkcookies false - redirect -', req.session ? req.session.userId : undefined);
                /* tslint:enable */
                return res.redirect('/api/login');
            }
            else {
                /* tslint:disable */
                console.log('checkcookies true - next -', req.session.userId);
                /* tslint:enable */
                res.locals.userId = req.session.userId;
                next();
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return passport_controller_1.default.passportAuthenticate(req, res, next);
        });
    }
    static loginIAM(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, password } = req.body;
            try {
                const authRes = yield IAMServices_1.default.authenticateUser(userId, password);
                return res.json(authRes);
            }
            catch (e) {
                return res.status(400).json(e);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            SecurityController.logoutSession(req);
            const authType = SecurityController.whichAuthIsReq(req);
            switch (authType) {
                case index_1.default.AUTH.TYPE.IAM:
                    const logoutIAMRes = yield SecurityController.logoutIAM(req);
                    return res.end('Logged out IAM');
                case index_1.default.AUTH.TYPE.ICA:
                    return res.end('Logged out ICA');
                case index_1.default.AUTH.TYPE.PFED:
                default:
                    return res.redirect(index_1.default.AUTH.PFED.LOGOUT_URL);
            }
        });
    }
    static logoutSession(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session) {
                    if (req.session.destroy) {
                        req.session.destroy((err) => {
                            lodash_1.default.noop();
                        });
                    }
                    else {
                        req.session = undefined;
                    }
                }
            }
            catch (e) {
                log_utilities_1.LogError(e, 'logoutSession');
            }
        });
    }
    static logoutIAM(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                log_utilities_1.LogEvent('LogoutIAM', {});
            }
            catch (e) {
                log_utilities_1.LogError(e, 'logoutSession');
            }
        });
    }
    static CheckIfCandidateActive(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.emailId) {
                try {
                    const emailID = IAMServices_1.default.userIDDecrypt(req.body.emailId);
                    const resultEmailID = yield user_service_1.fetchUserDataByEmailId(emailID);
                    if (resultEmailID) {
                        next();
                    }
                    else {
                        return res
                            .json({
                            status: 'failed',
                            message: 'EmailId not registered or active',
                            display: false,
                        })
                            .status(401);
                    }
                }
                catch (error) {
                    log_utilities_1.LogError(error, 'Error-Fetching Registered EmailID');
                    return res.status(401).json(error);
                }
            }
            else {
                res.json({
                    status: 'failed',
                    message: 'Enter the valid Email ID',
                    display: false,
                }).status(401);
            }
        });
    }
    static loginError(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.end('Login Error');
        });
    }
}
exports.default = SecurityController;
//# sourceMappingURL=security.controller.js.map