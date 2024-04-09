import { Document, Schema } from 'mongoose';
import { PAGE_STATUS } from '../../config/page';
import { Component, IComponent } from './component.schema';

export const Page: Schema = new Schema(
	{
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
	},
	{
		shardKey: { pageID: 1 },
		validateBeforeSave: true,
	},
);

export interface IPage extends Document {
	pageType: string;
	pageID: string;
	pageVersion: number;
	pageName: string;
	parentPageID: string;
	status: string;
	createdOn?: string;
	createdBy?: string;
	updatedOn?: string;
	updatedBy: string;
	componentList: IComponent[];
	description: string;
}
