"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_router_1 = __importDefault(require("./dashboard.router"));
const login_routes_1 = __importDefault(require("./login.routes"));
const newsFeed_router_1 = __importDefault(require("./newsFeed.router"));
const page_router_1 = __importDefault(require("./page.router"));
const plan_router_1 = __importDefault(require("./plan.router"));
const testimonials_router_1 = __importDefault(require("./testimonials.router"));
const userTaskStatus_router_1 = __importDefault(require("./userTaskStatus.router"));
// import authorize, { Policies } from "../adapters/authz.adapter";
const router = express_1.default.Router();
// API Calls for login operations
router.use('/dashboard', dashboard_router_1.default);
router.use('/newsfeed', newsFeed_router_1.default);
router.use('/testimonials', testimonials_router_1.default);
router.use('/plans', plan_router_1.default);
router.use('/login', login_routes_1.default);
router.use('/page', page_router_1.default);
router.use('/markTaskComplete', userTaskStatus_router_1.default);
exports.default = router;
//# sourceMappingURL=api.router.js.map