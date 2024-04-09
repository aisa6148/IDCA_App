import { Document, Schema } from 'mongoose';
import { PLAN_STATUS } from '../../config/plan';
import { ITask, Task } from './task.schema';

export const Plan: Schema = new Schema(
	{
		planID: {
			type: Schema.Types.String,
			required: true,
			unique: true,
		},
		planVersion: {
			type: Schema.Types.Number,
			required: true,
		},
		planName: {
			type: Schema.Types.String,
			required: true,
			// unique: true,
		},
		parentPlanID: {
			type: Schema.Types.String,
			required: false,
		},
		planType: {
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
			default: PLAN_STATUS.DRAFT,
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
		taskList: {
			type: [Task],
			default: [],
		},
	},
	{
		shardKey: { planID: 1 },
		validateBeforeSave: true,
	},
);

Plan.index(
	{
		planID: 1,
	},
	{
		unique: true,
	},
);

Plan.index(
	{
		planID: 1,
		planName: 1,
	},
	{
		unique: true,
	},
);
export interface IPlan extends Document {
	planType: string;
	planID: string;
	planVersion: number;
	planName: string;
	parentPlanID: string;
	status: string;
	createdOn?: string;
	createdBy?: string;
	updatedOn?: string;
	updatedBy: string;
	taskList: ITask[];
	description: string;
}
