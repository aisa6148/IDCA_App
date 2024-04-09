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
exports.BasicAuthorizer = void 0;
const casbin_1 = require("casbin");
class BasicAuthorizer {
    constructor(req, res, enforcer) {
        this.req = req;
        this.res = res;
        this.enforcer = enforcer;
    }
    checkPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            const { req, enforcer } = this;
            const { originalUrl, method } = req;
            const userRole = this.getUserRole();
            let permission = false;
            for (const role of userRole) {
                permission = permission || (yield enforcer.enforce(role, originalUrl, method));
                if (permission) {
                    break;
                }
            }
            return permission;
        });
    }
    getUserRole() {
        const { roles } = this.res.locals;
        return roles;
    }
}
exports.BasicAuthorizer = BasicAuthorizer;
// the authorizer middleware
function authz(newEnforcer) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const enforcer = yield newEnforcer();
        if (!(enforcer instanceof casbin_1.Enforcer)) {
            res.status(500).json({ 500: 'Invalid enforcer' });
            return;
        }
        const authorizer = new BasicAuthorizer(req, res, enforcer);
        if (!(yield authorizer.checkPermission())) {
            res.status(403).json({ 403: 'Forbidden' });
            return;
        }
        next();
    });
}
exports.default = authz;
//# sourceMappingURL=authorization.js.map