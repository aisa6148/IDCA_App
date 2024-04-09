import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { IPage } from '../schema/page.schema';
import {
	IPageVersionHistory,
	pageVersionHistorySchema,
} from '../schema/pageVersionHistory.schema';

export const PageVersionHistoryModel = model<IPageVersionHistory>(
	'PageVersionHistory',
	pageVersionHistorySchema,
);
/* tslint:disable */
PageVersionHistoryModel.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'PageVersionHistoryModel',
		});
	} else {
		console.log('PageVersionHistoryModel index created');
	}
});
/* tslint:enable */

export interface ICreatePageVersionHistory {
	historyID: string;
	pageID: string;
	pageVersion: number;
	createdOn?: string;
	createdBy: string;
	page: IPage;
}
