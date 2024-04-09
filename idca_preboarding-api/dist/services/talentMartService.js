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
class TalentMartService {
    static getUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mockDataUserAdd = [];
                for (let i = 1; i <= 20; i++) {
                    mockDataUserAdd.push({
                        title: 'Programmer',
                        firstName: 'Dinesh',
                        lastName: 'udhayakumar',
                        middleName: 'aj',
                        emailId: 'dinesh.udhayakumar' + i + '@wa.com',
                        userType: 1,
                        contact: '9629158140',
                        applyId: 'test' + i,
                        HMEmail: 'hr@walmartlabs.com',
                        preferredName: 'DineshUdhaya',
                        department: 'Developer',
                        startDate: '2018-03-29T00:00:00.000Z',
                        recruiterEmail: 'hr@walmart2.com',
                        recruiterName: 'hrhead2',
                        locationOfOffice: 'chennai2',
                        offerAcceptanceStatus: 'yes',
                        profilePic: 'test12',
                    });
                }
                return mockDataUserAdd;
            }
            catch (error) {
                // test
            }
        });
    }
}
exports.default = TalentMartService;
//# sourceMappingURL=talentMartService.js.map