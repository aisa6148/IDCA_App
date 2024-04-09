import { Document, Schema } from 'mongoose';
import { appHomeItemSchmea, IAppHomeFields } from './appHomeItem.schema';
export const PagePositioning: Schema = new Schema(
	{
		pagePositioningID: {
			type: Schema.Types.String,
			required: true,
		},
		locationName: {
			type: Schema.Types.String,
			required: true,
		},
		appHomeTopHeader: {
			type: [appHomeItemSchmea],
			default: [],
		},
		appHomeBottomFooter: {
			type: [appHomeItemSchmea],
			default: [],
		},
		createdOn: {
			type: Schema.Types.Date,
			default: Date.now,
			required: true,
		},
		createdBy: {
			type: Schema.Types.String,
			required: true,
		},
		updatedOn: {
			type: Schema.Types.Date,
			default: Date.now,
			required: true,
		},
		updatedBy: {
			type: Schema.Types.String,
		},
	},
	{
		shardKey: { pagePositioningID: 1 },
		validateBeforeSave: true,
		autoIndex: false,
		emitIndexErrors: true,
	},
);

export interface IPagePositioning extends Document {
	pagePositioningID: string;
	locationName: string;
	appHomeTopHeader: IAppHomeFields[];
	appHomeBottomFooter: IAppHomeFields[];
	createdOn?: Date;
	createdBy?: string;
	updatedOn?: Date;
	updatedBy?: string;
}
