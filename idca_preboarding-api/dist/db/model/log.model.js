"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDetails = void 0;
const sequelize_1 = require("sequelize");
function LogDetails(sequelize) {
    return sequelize.define('talentmartusersynclog', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        logEvent: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        logName: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        logMessage: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    });
}
exports.LogDetails = LogDetails;
//# sourceMappingURL=log.model.js.map