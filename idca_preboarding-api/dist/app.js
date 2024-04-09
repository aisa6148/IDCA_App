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
const casbin_1 = require("casbin");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importStar(require("path"));
const index_1 = __importDefault(require("./config/index"));
const log_1 = require("./config/log");
const failed_controller_1 = __importDefault(require("./controllers/failed.controller"));
const healthcheck_controller_1 = __importDefault(require("./controllers/healthcheck.controller"));
const api_router_1 = __importDefault(require("./routes/api.router"));
const authorization_1 = __importDefault(require("./security/authorization"));
const passport_config_1 = require("./security/passport.config");
const roleAccess_controller_1 = __importDefault(require("./security/roleAccess.controller"));
const security_controller_1 = __importDefault(require("./security/security.controller"));
const security_middleware_1 = require("./security/security.middleware");
const security_router_1 = require("./security/security.router");
const log_utilities_1 = require("./utilities/log.utilities");
const PORT = index_1.default.PORT;
const isLocal = !index_1.default.env || index_1.default.env === 'LOCAL';
const app = express_1.default();
app.use(compression_1.default());
// Compress all routes. For a high-traffic website in production you wouldn"t use this middleware.
// Instead you would use a reverse proxy like Nginx.
app.use(helmet_1.default());
// See https://helmetjs.github.io/docs/ for more information on what headers it sets/vulnerabilities it protects against
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
passport_config_1.passportConfig();
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({
    extended: false,
    limit: '20mb',
}));
app.set('trust proxy', 1);
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, max-age=0');
    next();
});
// app.use("/login", RoleAccess.getRoles, LoginRouter);
app.get('/api/v1/healthcheck', healthcheck_controller_1.default.getHealth);
app.get('/api/v1/failure', failed_controller_1.default.getFailureStatus);
app.use(security_middleware_1.securityPassportMiddleware);
app.use('/api', security_router_1.unauthorizedSecurityRouter);
app.use(security_controller_1.default.checkAuth);
app.use('/api', security_router_1.authorizedSecurityRouter);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build'), {
    index: false,
}));
app.use('/ping', (req, res) => res.json({ uptime: process.uptime() }));
app.use('/api', roleAccess_controller_1.default.getRoles, authorization_1.default(() => __awaiter(void 0, void 0, void 0, function* () {
    const enforcer = yield casbin_1.newEnforcer(path_1.join(__dirname, '/config/casbin_conf/model.conf'), path_1.join(__dirname, '/config/casbin_conf/policy.csv'));
    return enforcer;
})), api_router_1.default);
// error handler for APIs
app.use((error, req, res, next) => {
    // loggerModel.error({ error });
    if (error.status === 403) {
        res.status(error.status).json({
            error: 'Forbidden',
        });
        error.name = 'Forbidden';
    }
    else {
        res.status(error.status || 500);
        res.json({
            error: (error.message && error.message.message) ||
                error.message ||
                'Something went wrong. Please try in a bit.',
        });
        error.name = error.name || 'Internal';
    }
    next();
});
// catch 404 and forward to error handler
app.all('/api/*', (req, res, next) => {
    if (!res.headersSent) {
        next(new http_errors_1.default.NotFound());
    }
});
// code to handle all uncaughtexceptions
process.on('uncaughtException', (error) => {
    log_utilities_1.LogError(error, log_1.EVENT_NAME.PROCESS_UNCAUGHT_EXCEPTION);
});
/* tslint:disable */
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
/* tslint:enable */
module.exports = app;
//# sourceMappingURL=app.js.map