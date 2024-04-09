import express from 'express';
import UserContoller from '../controllers/user.controller';

const router = express.Router();
router.post('/add', UserContoller.setUserData);
router.get('/list', UserContoller.getUserData);
router.get('/talentmart', UserContoller.talentMartCall);
router.get('/:id', UserContoller.getUserDataByID);
router.get('/image/:blobName', UserContoller.getImageBlobName);
router.delete('/delete/:id', UserContoller.deleteUserDataByID);
router.put('/update/:id', UserContoller.updateUserDataByID);

export default router;
