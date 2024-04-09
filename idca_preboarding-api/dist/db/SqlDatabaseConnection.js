"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManage = exports.User = exports.dbConnectionInitialize = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../config/index"));
const log_model_1 = require("./model/log.model");
const user_model_1 = require("./model/user.model");
exports.dbConnectionInitialize = new sequelize_1.Sequelize(index_1.default.sqlDataBaseConfig.database, index_1.default.sqlDataBaseConfig.userName, index_1.default.sqlDataBaseConfig.password, {
    host: index_1.default.sqlDataBaseConfig.host,
    port: 1433,
    dialect: 'mssql',
    logging: true,
    dialectOptions: {
        encrypt: true,
        packetSize: index_1.default.SQLCONFIG.packetSize,
        pool: {
            max: index_1.default.SQLCONFIG.POOL.max,
            min: index_1.default.SQLCONFIG.POOL.min,
            acquire: index_1.default.SQLCONFIG.POOL.acquire,
            idle: index_1.default.SQLCONFIG.POOL.idle,
        },
        options: {
            useUTC: false,
            dateFirst: 1,
            database: index_1.default.sqlDataBaseConfig.database,
            validateBulkLoadParameters: true,
        },
        authentication: {
            options: {
                userName: index_1.default.sqlDataBaseConfig.userName,
                password: index_1.default.sqlDataBaseConfig.password,
            },
            type: 'azure-active-directory-password',
        },
        server: index_1.default.sqlDataBaseConfig.host,
    },
});
exports.dbConnectionInitialize
    .authenticate()
    .then(() => {
    /* tslint:disable */
    console.log('Data Base Connected Success');
    /* tslint:enable */
    /* Disabling sql db sync
    dbConnectionInitialize
        .sync({
            force: false,
        })
        .then(() => {
            console.log('table created if not there, successfully.');
        })
        .catch((error) => {
            console.log('oooh, did you enter wrong database credentials?');
        });
    */
})
    .catch((err) => {
    /* tslint:disable */
    console.log('failed', err);
    /* tslint:enable */
});
exports.User = user_model_1.UserFactory(exports.dbConnectionInitialize);
exports.LogManage = log_model_1.LogDetails(exports.dbConnectionInitialize);
//# sourceMappingURL=SqlDatabaseConnection.js.map