import express from 'express';
import UserTaskStatus from '../controllers/userTaskStatus.controller';

const router = express.Router();
router.get(
	'/fetchStatusByUserID/:taskId',
	UserTaskStatus.userIDChecks,
	UserTaskStatus.fetchStatusByUserIDAndTaskID,
);
router.get(
	'/fetchAllStatusByUserID/',
	UserTaskStatus.fetchStatusByUserID,
);
router.post(
	'/updateUserTaskStatus/:planId/:taskId/:status',
	UserTaskStatus.updateUserTaskStatusCheck,
	UserTaskStatus.updateUserTaskStatus,
);

export default router;
