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
const constants_1 = require("../config/constants");
const user_service_1 = require("../db/services/user.service");
const common_utilities_1 = require("../utilities/common.utilities");
const error_utilities_1 = require("../utilities/error.utilities");
class Login {
    static getUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailID = res.locals.email;
                const [candidateInfo] = yield Promise.all([
                    user_service_1.fetchUserDataByEmail(emailID),
                ]);
                const userData = {
                    candidateID: emailID,
                };
                let additionalUserData = {};
                if (candidateInfo && candidateInfo.active) {
                    additionalUserData = {
                        preboardingUser: true,
                        name: candidateInfo.firstName + ' ' + candidateInfo.lastName,
                        emailId: candidateInfo.emailId,
                        userType: candidateInfo.userType,
                        applyId: candidateInfo.applyId,
                        HMEmail: candidateInfo.HMEmail,
                        preferredName: candidateInfo.preferredName,
                        department: candidateInfo.department,
                        startDate: candidateInfo.startDate,
                        recruiterEmail: candidateInfo.recruiterEmail,
                        recruiterName: candidateInfo.recruiterName,
                        locationOfOffice: candidateInfo.locationOfOffice.split(', ')[0],
                        offerAcceptanceStatus: candidateInfo.offerAcceptanceStatus,
                        profilePic: candidateInfo.profilePic,
                        noOfDaysRemainingToJoin: common_utilities_1.daysBetweenDates(candidateInfo.startDate),
                        offerDesignation: candidateInfo.title,
                        startDateFormatted: common_utilities_1.formatDateForUI(candidateInfo.startDate),
                    };
                    res.json({
                        status: constants_1.success,
                        userData: Object.assign(Object.assign({}, userData), additionalUserData),
                    });
                }
                else {
                    res.json({
                        status: constants_1.success,
                        message: 'Candidate details unavailable or Candidate Inactive',
                        userData: {},
                    });
                }
            }
            catch (error) {
                error_utilities_1.controllerErrorHandler(error, req, res);
            }
        });
    }
}
exports.default = Login;
//# sourceMappingURL=login.controller.js.map