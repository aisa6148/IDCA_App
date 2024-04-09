"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const router = express_1.default.Router();
router.get('/dashboard-data', dashboard_controller_1.default.getDashboardData);
exports.default = router;
//# sourceMappingURL=dashboard.router.js.map