import { Document, Schema } from 'mongoose';
export const TaskMedia: Schema = new Schema({
	mediaID: {
		type: Schema.Types.String,
		required: true,
	},
	mediaName: {
		type: Schema.Types.String,
	},
	contentSize: {
		type: Schema.Types.Number,
		default: 0,
	},
	mimeType: {
		type: Schema.Types.String,
	},
});

export interface ITaskMedia {
	mediaID: string;
	mediaName?: string;
	contentSize?: number;
	mimeType?: string;
}
