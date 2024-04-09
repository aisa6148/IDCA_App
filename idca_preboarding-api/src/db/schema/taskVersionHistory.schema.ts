import { Document, Schema } from 'mongoose';
import { ITask, Task as TaskSchema } from './task.schema';

export const TaskVersionHistorySchema: Schema = new Schema(
	{
		historyID: {
			type: Schema.Types.String,
			required: true,
			unique: true,
			index: true,
		},
		taskID: {
			type: Schema.Types.String,
			required: true,
		},
		taskVersion: {
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
		task: {
			type: [TaskSchema],
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

export interface ITaskVersionHistory extends Document {
	historyID: string;
	taskID: string;
	taskVersion: number;
	createdOn?: string;
	createdBy: string;
	task: ITask;
}
