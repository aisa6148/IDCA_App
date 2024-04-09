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
exports.health = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
exports.health = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            'status': true,
            'server-start-time': new Date(new Date().getTime() - process.uptime() * 1000),
            'dependencies': {
                database: {
                    status: true,
                },
            },
        });
    }
    catch (e) {
        next(new http_errors_1.default.InternalServerError(e.message));
    }
});
//# sourceMappingURL=health.js.map