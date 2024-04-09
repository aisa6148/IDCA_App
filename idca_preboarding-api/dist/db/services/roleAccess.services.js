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
exports.createUsers = exports.fetchAllRoles = void 0;
const mongo_utilities_1 = require("../../utilities/mongo.utilities");
const roleAccess_model_1 = require("../model/roleAccess.model");
exports.fetchAllRoles = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = roleAccess_model_1.RoleAccessModel.find({ userId }, {
            _id: 0,
            roles: [],
        });
        const returnList = yield query.exec();
        return returnList;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
exports.createUsers = (userRoleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUsers = yield new roleAccess_model_1.RoleAccessModel(Object.assign({}, userRoleData)).save({
            validateBeforeSave: true,
        });
        return createdUsers;
    }
    catch (error) {
        mongo_utilities_1.mongodbErrorHandler(error);
    }
});
//# sourceMappingURL=roleAccess.services.js.map