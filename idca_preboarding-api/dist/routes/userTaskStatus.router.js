"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userTaskStatus_controller_1 = __importDefault(require("../controllers/userTaskStatus.controller"));
const router = express_1.default.Router();
router.get('/fetchStatusByUserID/:taskId', userTaskStatus_controller_1.default.userIDChecks, userTaskStatus_controller_1.default.fetchStatusByUserIDAndTaskID);
router.get('/fetchAllStatusByUserID/', userTaskStatus_controller_1.default.fetchStatusByUserID);
router.post('/updateUserTaskStatus/:planId/:taskId/:status', userTaskStatus_controller_1.default.updateUserTaskStatusCheck, userTaskStatus_controller_1.default.updateUserTaskStatus);
exports.default = router;
//# sourceMappingURL=userTaskStatus.router.js.map