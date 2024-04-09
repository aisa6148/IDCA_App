"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = exports.getConfig = exports.securityPassportMiddleware = exports.pureNonPfedRoutes = void 0;
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("../config/index"));
const passport_1 = __importDefault(require("passport"));
const memcached_1 = require("../services/memcached");
const passport_config_1 = require("./passport.config");
const security_controller_1 = __importDefault(require("./security.controller"));
exports.pureNonPfedRoutes = ['/api/login/iam', '/unauthping'];
exports.securityPassportMiddleware = (req, res, next) => {
    const mwUse = exports.getConfig(req);
    new Promise((resolveSession, rejectSession) => {
        if (mwUse.session) {
            exports.sessionMiddleware(req, res, () => {
                resolveSession();
            });
        }
        else {
            resolveSession();
        }
    })
        .then(() => {
        if (mwUse.passport) {
            passport_config_1.passportConfig();
            return new Promise((resolvePassportInit, rejectPassportInit) => {
                passport_1.default.initialize()(req, res, () => {
                    passport_1.default.session()(req, res, () => {
                        resolvePassportInit();
                    });
                });
            });
        }
    })
        .then(() => {
        next();
    })
        .catch((err) => {
        res.status(500).end();
    });
};
exports.getConfig = (req) => {
    let usePassport = true;
    let useSession = true;
    const authType = security_controller_1.default.whichAuthIsReq(req);
    if (authType === index_1.default.AUTH.TYPE.IAM || authType === index_1.default.AUTH.TYPE.ICA) {
        usePassport = false;
        useSession = false;
    }
    if (exports.pureNonPfedRoutes.includes(req.url)) {
        usePassport = false;
        useSession = false;
    }
    return {
        passport: usePassport,
        session: useSession,
    };
};
exports.sessionMiddleware = express_session_1.default({
    store: memcached_1.memcachedSessionStore,
    secret: index_1.default.SESSION.KEY1,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: index_1.default.SESSION.MAX_AGE,
        secure: !index_1.default.SESSION.unencryptedCookie,
        signed: !index_1.default.SESSION.unencryptedCookie,
    },
});
//# sourceMappingURL=security.middleware.js.map