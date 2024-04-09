import express from 'express';
import NewsFeedController from '../controllers/newsFeed.controller';

const router = express.Router();
router.post('/add', NewsFeedController.setNewsFeedData);
router.get('/list', NewsFeedController.getNewsFeedData);
router.get('/image/:blobName', NewsFeedController.getImageBlobName);
router.get('/:newsID', NewsFeedController.getNewsFeedDataById);
router.delete('/delete-newsfeed/:newsID', NewsFeedController.deleteNewsFeed);
router.put('/update-newsfeed/:newsID', NewsFeedController.updateNewsFeed);

export default router;
