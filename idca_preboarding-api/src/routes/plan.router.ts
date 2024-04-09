import express, { Request, Response } from 'express';
import { upload as Upload } from '../controllers/file.controller';
import PlanController from '../controllers/plan.controller';

const router = express.Router();
// API Calls for template operations
router.get(
	'/fetch-plans/:type',
	PlanController.fetchPlansChecks,
	PlanController.fetchPlans,
);

router.put(
	'/create-plan/:type',
	PlanController.createPlanChecks,
	PlanController.createPlan,
);
router.post(
	'/publish/:id',
	PlanController.makePlanActiveChecks,
	PlanController.makePlanActive,
);
router.delete(
	'/delete/:id',
	PlanController.planIDChecks,
	PlanController.deletePlan,
);

router.put(
	'/save-edit/:id',
	PlanController.createPlanEditChecks,
	PlanController.createPlanEdit,
);
router.post(
	'/publish-edit/:id',
	PlanController.publishPlanEditChecks,
	PlanController.publishPlanEdit,
);

router.get('/fetch/:id', PlanController.planIDChecks, PlanController.fetchPlanByID);
router.get('/fetch-active', PlanController.fetchActivePlans);

router.post('/upload-media', Upload.single('file'), PlanController.uploadMedia);
router.post('/fetch-media/:mediaID/:fileName', PlanController.fetchMediaFile);
router.delete('/delete-media/:planID/:taskID/:mediaID/:fileName', PlanController.deleteMediaFile);
export default router;
