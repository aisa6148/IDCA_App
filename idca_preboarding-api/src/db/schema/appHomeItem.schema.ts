import { Document, Schema } from 'mongoose';

export const appHomeItemSchmea: Schema = new Schema({
	pageID: {
		type: Schema.Types.String,
		required: true,
	},

	pageName: {
		type: Schema.Types.String,
		required: true,
	},
	pageIcon: {
		type: Schema.Types.String,
		required: true,
	},

	slot: {
		type: Schema.Types.String,
	},
});

export interface IAppHomeFields {
	pageID: string;
	pageName: string;
	pageIcon: string;
	slot: string;
}
