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
const mongoose_1 = __importDefault(require("mongoose"));
const log_utilities_1 = require("../utilities/log.utilities");
class HealthCheck {
}
HealthCheck.getHealth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let isCosmosDatabaseUp = false;
    let serverStatus = false;
    try {
        // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
        isCosmosDatabaseUp = mongoose_1.default.connection.readyState === 1;
    }
    catch (error) {
        log_utilities_1.LogError(error, 'HEALTH_CHECK_ERROR_MONGOOSE');
    }
    serverStatus = [isCosmosDatabaseUp].reduce((v, a) => a && v);
    res.json({
        'status': serverStatus,
        'server-start-time': new Date(new Date().getTime() - process.uptime() * 1000),
        'dependencies': {
            'onboarding-mongoose-database': {
                'status': isCosmosDatabaseUp,
                'database-connection-status': mongoose_1.default.STATES[mongoose_1.default.connection.readyState],
            },
        },
    });
});
exports.default = HealthCheck;
//# sourceMappingURL=healthcheck.controller.js.map