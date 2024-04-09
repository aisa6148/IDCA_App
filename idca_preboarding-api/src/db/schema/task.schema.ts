import { Document, Schema } from 'mongoose';
import { ITaskField, TaskField } from './taskField.schema';
import { ITaskMedia, TaskMedia } from './taskMedia.schema';

export const Task: Schema = new Schema(
	{
		taskID: {
			type: Schema.Types.String,
			required: true,
			index: true,
		},
		taskType: {
			type: Schema.Types.String,
			required: true,
		},
		taskName: {
			type: Schema.Types.String,
			required: true,
		},
		taskVersion: {
			type: Schema.Types.Number,
			default: 0,
		},
		createdAt: {
			type: Schema.Types.Date,
			required: true,
			default: Date.now,
		},
		fields: {
			type: [TaskField],
			default: [],
		},
		duration: {
			type: Schema.Types.Number,
			required: true,
		},
		mediaList: {
			type: [TaskMedia],
			default: [],
		},
		mandatory: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{
		shardKey: { templateID: 1 },
		validateBeforeSave: true,
		autoIndex: false,
		emitIndexErrors: true,
	},
);

export interface ITask extends Document {
	taskID: string;
	taskType: string;
	taskName: string;
	taskVersion: number;
	createdAt?: Date;
	fields: ITaskField[];
	duration: number;
	mediaList?: ITaskMedia[];
	mandatory: boolean;
}
