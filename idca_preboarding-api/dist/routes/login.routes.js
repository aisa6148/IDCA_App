"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const router = express_1.default.Router();
router.get('/user-data', login_controller_1.default.getUserData);
exports.default = router;
//# sourceMappingURL=login.routes.js.map