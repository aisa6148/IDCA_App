import { Document, Schema } from 'mongoose';
import { IPlan } from './plan.schema';
import { Task } from './task.schema';

// Replica of planSchema
const planVersionSchema = new Schema({
	planID: {
		type: Schema.Types.String,
		required: true,
	},
	planVersion: {
		type: Schema.Types.Number,
		required: true,
		default: 0,
	},
	planName: {
		type: Schema.Types.String,
		required: true,
	},
	parentPlanID: {
		type: Schema.Types.String,
		required: false,
	},
	planType: {
		type: Schema.Types.String,
		required: true,
	},
	trainingType: {
		type: Schema.Types.String,
	},
	description: {
		type: Schema.Types.String,
		required: true,
	},
	status: {
		type: Schema.Types.String,
		required: true,
	},
	createdOn: {
		type: Schema.Types.Date,
		required: true,
	},
	createdBy: {
		type: Schema.Types.String,
		required: true,
	},
	updatedOn: {
		type: Schema.Types.Date,
		required: true,
	},
	updatedBy: {
		type: Schema.Types.String,
	},
	taskList: {
		type: [Task],
		default: [],
	},
	tags: {
		type: [Schema.Types.String],
		default: [],
	},
});

export const PlanVersionHistorySchema: Schema = new Schema(
	{
		historyID: {
			type: Schema.Types.String,
			required: true,
			unique: true,
			index: true,
		},
		planID: {
			type: Schema.Types.String,
			required: true,
		},
		planVersion: {
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
		plan: {
			type: [planVersionSchema],
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

export interface IPlanVersionHistory extends Document {
	historyID: string;
	planID: string;
	planVersion: number;
	createdOn?: string;
	createdBy: string;
	plan: IPlan;
}
