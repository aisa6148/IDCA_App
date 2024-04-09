import { Document, Schema } from 'mongoose';

export const Component: Schema = new Schema(
	{
		componentID: {
			type: Schema.Types.String,
			required: true,
			index: true,
		},
		componentType: {
			type: Schema.Types.String,
			required: true,
		},
		fields: {
			type: Schema.Types.Mixed,
		},
		createdAt: {
			type: Schema.Types.Date,
			required: true,
			default: Date.now,
		},
	},
);

export interface IComponent extends Document {
	componentID: string;
	componentType: string;
	fields?: any;
	createdAt?: Date;
}
