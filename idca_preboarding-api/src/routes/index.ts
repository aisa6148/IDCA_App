import express from 'express';
const router = express.Router();
import { getUserInformation } from '../controllers/userInformation.controller';

router.get('/getInfo', getUserInformation);

export default router;
