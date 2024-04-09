"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFeedModel = void 0;
const mongoose_1 = require("mongoose");
const log_1 = require("../../config/log");
const log_utilities_1 = require("../../utilities/log.utilities");
const newsFeed_schema_1 = require("../schema/newsFeed.schema");
exports.NewsFeedModel = mongoose_1.model('newsfeed', newsFeed_schema_1.NewsFeedSchema);
/* tslint:disable */
exports.NewsFeedModel.on('index', error => {
    if (error) {
        log_utilities_1.LogError(error, log_1.EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
            modelName: 'NewsfeedModel',
        });
    }
    else {
        console.log('Newsfeed Model index created');
    }
});
//# sourceMappingURL=newsFeed.model.js.map