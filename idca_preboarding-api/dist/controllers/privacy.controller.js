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
const index_1 = __importDefault(require("../config/index"));
const error_utilities_1 = require("../utilities/error.utilities");
class Privacy {
    static getTermsOfUse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TERMSOFUSE = index_1.default.TERMSOFUSE;
                res.set('plain/text').status(200).send(TERMSOFUSE);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
    static getPrivacyPolicy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PRIVACYPOLICY = index_1.default.PRIVACYPOLICY;
                res.set('plain/text').status(200).send(PRIVACYPOLICY);
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
}
exports.default = Privacy;
//# sourceMappingURL=privacy.controller.js.map