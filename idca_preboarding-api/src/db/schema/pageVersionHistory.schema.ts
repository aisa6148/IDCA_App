import { Document, Schema } from 'mongoose';
import { PAGE_STATUS } from '../../config/page';
import { Component } from './component.schema';
import { IPage } from './page.schema';

const pageVersionSchema = new Schema({
	pageID: {
		type: Schema.Types.String,
		required: true,
		unique: true,
	},
	pageVersion: {
		type: Schema.Types.Number,
		required: true,
	},
	pageName: {
		type: Schema.Types.String,
		required: true,
	},
	parentPageID: {
		type: Schema.Types.String,
		required: false,
	},
	pageType: {
		type: Schema.Types.String,
		required: true,
	},
	description: {
		type: Schema.Types.String,
		required: true,
	},
	status: {
		type: Schema.Types.String,
		required: true,
		default: PAGE_STATUS.DRAFT,
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
	componentList: {
		type: [Component],
		default: [],
	},
});

export const pageVersionHistorySchema: Schema = new Schema(
	{
		historyID: {
			type: Schema.Types.String,
			required: true,
			unique: true,
			index: true,
		},
		pageID: {
			type: Schema.Types.String,
			required: true,
		},
		pageVersion: {
			type: Schema.Types.Number,
			required: true,
		},
		createdOn: {
			type: Schema.Types.Date,
			default: Date.now(),
			required: true,
		},
		createdBy: {
			type: Schema.Types.String,
			required: true,
		},
		page: {
			type: [pageVersionSchema],
			required: true,
		},
	},
	{
		shardKey: { historyID: 1 },
		validateBeforeSave: true,
		autoIndex: false,
		emitIndexErrors: true,
	},
);

export interface IPageVersionHistory extends Document {
	historyID: string;
	pageID: string;
	pageVersion: number;
	createdOn?: string;
	createdBy: string;
	page: IPage;
}
