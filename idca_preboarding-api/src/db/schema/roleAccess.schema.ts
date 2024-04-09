import { Document, Schema } from 'mongoose';

export const RoleAccessSchema: Schema = new Schema(
	{
		userId: {
			type: Schema.Types.String,
		},
		roles: {
			type: Schema.Types.Array,
		},
	},
	{
		shardKey: { userId: 1 },
		validateBeforeSave: true,
		autoIndex: false,
		emitIndexErrors: true,
	},
);

RoleAccessSchema.index(
	{
		userId: 1,
	},
	{
		unique: true,
	},
);

export interface IRoleAccess extends Document {
	userId: string;
	roles: [];
}
