import express, { Request, Response } from 'express';
import { health } from '../controllers/health';
const router = express.Router();
router.get('/health', health);

export default router;
