import express, { Request, Response } from 'express';
import { upload as Upload } from '../controllers/file.controller';
import PageController from '../controllers/page.controller';

const router = express.Router();

router.get('/fetch-page/:type', PageController.fetchPageChecks, PageController.fetchPage);
router.put('/create-page/:type', PageController.createPageChecks, PageController.createPage);
router.get('/fetch/:id', PageController.pageIDChecks, PageController.fetchPageByID);
router.put('/save-edit/:id', PageController.createPageEditChecks, PageController.createPageEdit);
router.delete('/delete/:id', PageController.pageIDChecks, PageController.deletePage);
router.get('/fetch-active', PageController.fetchActivePages);
router.get('/fetch-active/:id', PageController.fetchActivePagesByID);
router.post('/publish/:id', PageController.makePageActiveChecks, PageController.makePageActive);
router.post('/publish-edit/:id', PageController.publishPageEditChecks, PageController.publishPageEdit );
router.post('/save-edit-positioning/', PageController.createPositioningEdit);
router.get('/get-positioning/', PageController.getPostioningPage);
router.get('/get-position-reset/:id', PageController.getPostioningPageReset);
router.get('/page-position-delete/:id', PageController.deletePostioningPage);
router.post('/upload-media', Upload.single('file'), PageController.uploadMedia);
router.post('/fetch-media/:mediaID/:fileName', PageController.fetchMediaFile);
router.delete('/delete-media/:pageID/:componentID/:mediaID/:fileName', PageController.deleteMediaFile);

export default router;
