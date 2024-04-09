"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizedSecurityRouter = exports.unauthorizedSecurityRouter = void 0;
const express_1 = __importDefault(require("express"));
const privacy_controller_1 = __importDefault(require("../controllers/privacy.controller"));
const passport_controller_1 = __importDefault(require("./passport.controller"));
const security_controller_1 = __importDefault(require("./security.controller"));
const unauthorizedRouter = express_1.default.Router();
exports.unauthorizedSecurityRouter = unauthorizedRouter;
unauthorizedRouter.get('/unauthping', (req, res) => res.json({
    uptime: process.uptime(),
    auth: 'unauth',
}));
unauthorizedRouter.get('/privacypolicy', privacy_controller_1.default.getPrivacyPolicy);
unauthorizedRouter.get('/termsofuse', privacy_controller_1.default.getTermsOfUse);
unauthorizedRouter.get('/login', security_controller_1.default.login);
unauthorizedRouter.get('/logout', security_controller_1.default.logout);
unauthorizedRouter.get('/login-error', security_controller_1.default.loginError);
unauthorizedRouter.post('/login/iam', security_controller_1.default.CheckIfCandidateActive, security_controller_1.default.loginIAM);
unauthorizedRouter.post('/samlcallback', passport_controller_1.default.passportCallback);
const authorizedRouter = express_1.default.Router();
exports.authorizedSecurityRouter = authorizedRouter;
authorizedRouter.get('/authping', (req, res) => res.json({
    uptime: process.uptime(),
    auth: 'auth',
}));
//# sourceMappingURL=security.router.js.map