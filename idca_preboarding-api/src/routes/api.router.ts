import express from 'express';
import DashboardRouter from './dashboard.router';
import LoginRouter from './login.routes';
import NewsFeedRouter from './newsFeed.router';
import PageRouter from './page.router';
import PlansRouter from './plan.router';
import TestimonialsRouter from './testimonials.router';
import UserRouter from './user.router';
import UserTaskStatus from './userTaskStatus.router';

// import authorize, { Policies } from "../adapters/authz.adapter";

const router = express.Router();

// API Calls for login operations
router.use('/dashboard', DashboardRouter);
router.use('/newsfeed', NewsFeedRouter);
router.use('/testimonials', TestimonialsRouter);
router.use('/plans', PlansRouter);
router.use('/login', LoginRouter);
router.use('/page', PageRouter);
router.use('/markTaskComplete', UserTaskStatus);
export default router;
