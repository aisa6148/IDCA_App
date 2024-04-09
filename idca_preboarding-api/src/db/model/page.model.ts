import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { IComponent } from '../schema/component.schema';
import { IPage, Page as PageSchema } from '../schema/page.schema';

export const Page = model<IPage>('Page', PageSchema);
/* tslint:disable */
Page.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'PageModel',
		});
	} else {
		console.log('PageModel index created');
	}
});
/* tslint:enable */

export interface ICreatePage {
	pageType: string;
	pageID: string;
	pageVersion: number;
	pageName: string;
	parentPageID?: string;
	status: string;
	createdOn?: string;
	createdBy?: string;
	updatedOn?: string;
	updatedBy?: string;
	componentList: IComponent[];
	description: string;
}
