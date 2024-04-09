"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("../controllers/file.controller");
const page_controller_1 = __importDefault(require("../controllers/page.controller"));
const router = express_1.default.Router();
router.get('/fetch-page/:type', page_controller_1.default.fetchPageChecks, page_controller_1.default.fetchPage);
router.put('/create-page/:type', page_controller_1.default.createPageChecks, page_controller_1.default.createPage);
router.get('/fetch/:id', page_controller_1.default.pageIDChecks, page_controller_1.default.fetchPageByID);
router.put('/save-edit/:id', page_controller_1.default.createPageEditChecks, page_controller_1.default.createPageEdit);
router.delete('/delete/:id', page_controller_1.default.pageIDChecks, page_controller_1.default.deletePage);
router.get('/fetch-active', page_controller_1.default.fetchActivePages);
router.get('/fetch-active/:id', page_controller_1.default.fetchActivePagesByID);
router.post('/publish/:id', page_controller_1.default.makePageActiveChecks, page_controller_1.default.makePageActive);
router.post('/publish-edit/:id', page_controller_1.default.publishPageEditChecks, page_controller_1.default.publishPageEdit);
router.post('/save-edit-positioning/', page_controller_1.default.createPositioningEdit);
router.get('/get-positioning/', page_controller_1.default.getPostioningPage);
router.get('/get-position-reset/:id', page_controller_1.default.getPostioningPageReset);
router.get('/page-position-delete/:id', page_controller_1.default.deletePostioningPage);
router.post('/upload-media', file_controller_1.upload.single('file'), page_controller_1.default.uploadMedia);
router.post('/fetch-media/:mediaID/:fileName', page_controller_1.default.fetchMediaFile);
router.delete('/delete-media/:pageID/:componentID/:mediaID/:fileName', page_controller_1.default.deleteMediaFile);
exports.default = router;
//# sourceMappingURL=page.router.js.map