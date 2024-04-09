"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
router.post('/add', user_controller_1.default.setUserData);
router.get('/list', user_controller_1.default.getUserData);
router.get('/talentmart', user_controller_1.default.talentMartCall);
router.get('/:id', user_controller_1.default.getUserDataByID);
router.get('/image/:blobName', user_controller_1.default.getImageBlobName);
router.delete('/delete/:id', user_controller_1.default.deleteUserDataByID);
router.put('/update/:id', user_controller_1.default.updateUserDataByID);
exports.default = router;
//# sourceMappingURL=user.router.js.map