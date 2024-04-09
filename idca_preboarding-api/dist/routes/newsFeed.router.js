"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsFeed_controller_1 = __importDefault(require("../controllers/newsFeed.controller"));
const router = express_1.default.Router();
router.post('/add', newsFeed_controller_1.default.setNewsFeedData);
router.get('/list', newsFeed_controller_1.default.getNewsFeedData);
router.get('/image/:blobName', newsFeed_controller_1.default.getImageBlobName);
router.get('/:newsID', newsFeed_controller_1.default.getNewsFeedDataById);
router.delete('/delete-newsfeed/:newsID', newsFeed_controller_1.default.deleteNewsFeed);
router.put('/update-newsfeed/:newsID', newsFeed_controller_1.default.updateNewsFeed);
exports.default = router;
//# sourceMappingURL=newsFeed.router.js.map