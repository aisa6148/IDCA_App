import express from 'express';
import DashboardController from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/dashboard-data', DashboardController.getDashboardData);

export default router;
