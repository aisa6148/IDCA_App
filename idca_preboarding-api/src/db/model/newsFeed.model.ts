import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { INewsFeed, NewsFeedSchema } from '../schema/newsFeed.schema';

export const NewsFeedModel = model<INewsFeed>('newsfeed', NewsFeedSchema);
/* tslint:disable */
NewsFeedModel.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'NewsfeedModel',
		});
	} else {
		console.log('Newsfeed Model index created');
	}
});
/* tslint:enable */

export interface ICreateNewsFeed {
	newsID: string;
	title: string;
	content: string;
	image: string;
	url: string;
	enabled: boolean;
	createdBy: string;
	updatedBy: string;
	createdOn: number;
	updatedOn: number;
}
