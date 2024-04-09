import { Document, Schema } from 'mongoose';
export const UserTaskStatus: Schema = new Schema({
	userId: {
		type: Schema.Types.String,
		required: true,
	},
	planId: {
		type: Schema.Types.String,
	},
	taskId: {
		type: Schema.Types.String,
	},
	status: {
		type: Schema.Types.String,
	},
	comments: {
		type: Schema.Types.String,
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
		shardKey: { userId: 1 },
		validateBeforeSave: true,
		autoIndex: false,
		emitIndexErrors: true,
	},
);

UserTaskStatus.index(
	{
		userId: 1,
	},
	{
		unique: false,
	},
);

export interface IUserTaskStatus extends Document {
	userId: string;
	planId: string;
	taskId: string;
	status: string;
	comments?: string;
	createdOn?: string;
	createdBy?: string;
	updatedOn?: string;
	updatedBy: string;
}
