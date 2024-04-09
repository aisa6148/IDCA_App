"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("../controllers/file.controller");
const plan_controller_1 = __importDefault(require("../controllers/plan.controller"));
const router = express_1.default.Router();
// API Calls for template operations
router.get('/fetch-plans/:type', plan_controller_1.default.fetchPlansChecks, plan_controller_1.default.fetchPlans);
router.put('/create-plan/:type', plan_controller_1.default.createPlanChecks, plan_controller_1.default.createPlan);
router.post('/publish/:id', plan_controller_1.default.makePlanActiveChecks, plan_controller_1.default.makePlanActive);
router.delete('/delete/:id', plan_controller_1.default.planIDChecks, plan_controller_1.default.deletePlan);
router.put('/save-edit/:id', plan_controller_1.default.createPlanEditChecks, plan_controller_1.default.createPlanEdit);
router.post('/publish-edit/:id', plan_controller_1.default.publishPlanEditChecks, plan_controller_1.default.publishPlanEdit);
router.get('/fetch/:id', plan_controller_1.default.planIDChecks, plan_controller_1.default.fetchPlanByID);
router.get('/fetch-active', plan_controller_1.default.fetchActivePlans);
router.post('/upload-media', file_controller_1.upload.single('file'), plan_controller_1.default.uploadMedia);
router.post('/fetch-media/:mediaID/:fileName', plan_controller_1.default.fetchMediaFile);
router.delete('/delete-media/:planID/:taskID/:mediaID/:fileName', plan_controller_1.default.deleteMediaFile);
exports.default = router;
//# sourceMappingURL=plan.router.js.map