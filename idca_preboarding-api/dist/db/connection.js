"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../config/index"));
const log_1 = require("../config/log");
const log_utilities_1 = require("../utilities/log.utilities");
const { userName, password, database, host, port } = index_1.default.cosmosDataBaseConfig;
mongoose_1.default.set('useUnifiedTopology', true);
mongoose_1.default.set('autoCreate', false);
exports.connectDB = () => {
    mongoose_1.default
        .connect(`mongodb://${host}:${port}/${database}?ssl=true&retrywrites=false`, {
        auth: {
            user: userName,
            password,
        },
        replicaSet: 'globaldb',
        ssl: true,
        // server: {
        // 	reconnectTries: Number.MAX_VALUE,
        // 	reconnectInterval: 1000,
        // },
        useCreateIndex: false,
        useNewUrlParser: true,
        autoIndex: false,
    })
        .then((db) => {
        /* tslint:disable */
        console.log('DB Connection Established. ReadyState:', db.connection.readyState);
    })
        .catch(error => {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.DB_CONNECTION_FAILED);
    });
};
if (index_1.default.env === 'LOCAL' || process.env.DEBUG) {
    mongoose_1.default.set('debug', true);
}
//# sourceMappingURL=connection.js.map