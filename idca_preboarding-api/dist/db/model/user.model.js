"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const sequelize_1 = require("sequelize");
function UserFactory(sequelize) {
    return sequelize.define('users', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        emailId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userType: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        contact: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        applyId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        HMEmail: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        preferredName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        recruiterEmail: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        recruiterName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        locationOfOffice: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        offerAcceptanceStatus: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        profilePic: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        locked: {
            type: sequelize_1.DataTypes.BOOLEAN,
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
exports.UserFactory = UserFactory;
//# sourceMappingURL=user.model.js.map