import { Document, Schema } from 'mongoose';

export const NewsFeedSchema: Schema = new Schema(
	{
		newsID: {
			type: Schema.Types.String,
			required: true,
		},
		title: {
			type: Schema.Types.String,
			required: true,
		},
		content: {
			type: Schema.Types.String,
			required: true,
		},
		image: {
			type: Schema.Types.String,
			required: true,
		},
		url: {
			type: Schema.Types.String,
			required: true,
		},
		enabled: {
			type: Schema.Types.Boolean,
			required: true,
		},
		createdBy: {
			type: Schema.Types.String,
			required: true,
		},
		updatedBy: {
			type: Schema.Types.String,
			required: true,
		},
		createdOn: {
			type: Schema.Types.Number,
			required: true,
			default: Date.now,
		},
		updatedOn: {
			type: Schema.Types.Number,
			required: true,
		},
	},
	{
		shardKey: { newsID: 1 },
		validateBeforeSave: true,
		autoIndex: false,
		emitIndexErrors: true,
	},
);

NewsFeedSchema.index(
	{
		newsID: 1,
	},
	{
		unique: true,
	},
);

export interface INewsFeed extends Document {
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

export interface INewsFeedUpdate {
	newsID: string;
	title?: string;
	content?: string;
	image?: string;
	url?: string;
	enabled?: boolean;
	updatedBy: string;
	updatedOn: number;
}
