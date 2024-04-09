import { Document, Schema } from 'mongoose';

export const TaskField: Schema = new Schema({
	fieldID: {
		type: Schema.Types.String,
		required: true,
	},

	fieldType: {
		type: Schema.Types.String,
		required: true,
	},

	fieldLabel: {
		type: Schema.Types.String,
	},

	fieldContent: {
		type: Schema.Types.Mixed,
	},
});

export interface ITaskField {
	fieldID: string;
	fieldType: string;
	fieldLabel: string;
	fieldContent: object;
}
