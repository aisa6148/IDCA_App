import express from 'express';
import LoginController from '../controllers/login.controller';

const router = express.Router();

router.get('/user-data', LoginController.getUserData);

export default router;
