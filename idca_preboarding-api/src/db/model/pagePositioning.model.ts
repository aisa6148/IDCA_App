import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { IAppHomeFields } from '../schema/appHomeItem.schema';
import {
	IPagePositioning,
	PagePositioning as PagePositioningSchema,
} from '../schema/pagePositioning.schema';

export const PagePositioingModel = model<IPagePositioning>('PagePositioning', PagePositioningSchema);
/* tslint:disable */
PagePositioingModel.on('index', (error) => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'PlanModel',
		});
	} else {
		console.log('Page Positioing Sets index created');
	}
});
/* tslint:enable */

export interface ICreatePagePositioning {
	pagePositioningID: string;
	appHomeTopHeader: IAppHomeFields[];
	appHomeBottomFooter: IAppHomeFields[];
	createdOn?: Date;
	createdBy?: string;
	updatedOn?: Date;
	updatedBy?: string;
}
