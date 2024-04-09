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
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const index_1 = __importDefault(require("../config/index"));
const log_utilities_1 = require("../utilities/log.utilities");
class PassportController {
    static passportValidate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('saml', (err, user, info) => {
                if (err) {
                    log_utilities_1.LogError(err, 'IssueInSetCookie');
                    return res.end(err);
                }
                if (!user) {
                    /* tslint:disable */
                    console.log('passport auth - not user');
                    /* tslint:enable */
                    return res.redirect('/login-error');
                }
                req.logIn(user, (e) => {
                    if (e) {
                        return next(e);
                    }
                    next();
                });
            })(req, res, next);
        });
    }
    static setCookies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.userId =
                    req.user.userID ||
                        req.user.userid ||
                        req.user.sAMAccountName ||
                        req.user['Associate User ID'];
                req.session.email = req.user.mail || req.user.email;
                req.session.name = req.user.name;
                req.session.displayName = req.user.displayName;
                req.session.upn = req.user.upn || req.user.nameID;
                req.session.memberOf = req.user.memberOf;
                return res.redirect('/');
            }
            catch (e) {
                log_utilities_1.LogError(e, 'IssueInSetCookiePfed');
                res.status(401).json('Issue in login');
                return;
            }
        });
    }
}
exports.default = PassportController;
PassportController.passportAuthenticate = passport_1.default.authenticate('saml', {
    failureRedirect: `/api/login?q=${index_1.default.AUTH.TYPE.PFED}`,
    successRedirect: '/',
    failureFlash: 'Authentication failed. Try again by clear browes cache',
    session: false,
});
PassportController.passportCallback = [
    body_parser_1.default.urlencoded({ extended: false }),
    PassportController.passportValidate,
    PassportController.setCookies,
];
//# sourceMappingURL=passport.controller.js.map