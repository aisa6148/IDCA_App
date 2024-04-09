import { Document, Schema } from 'mongoose';

export const TestimonialsSchema: Schema = new Schema(
	{
		testimonialsID: {
			type: Schema.Types.String,
			required: true,
		},
		name: {
			type: Schema.Types.String,
			required: true,
		},
		designation: {
			type: Schema.Types.String,
			required: true,
		},
		testimonials: {
			type: Schema.Types.String,
			required: true,
		},
		image: {
			type: Schema.Types.String,
			required: true,
		},
		enabled: {
			type: Schema.Types.Boolean,
			required: true,
		},
		createdBy: {
			type: Schema.Types.String,
			required: true,
		},
		updatedBy: {
			type: Schema.Types.String,
			required: true,
		},
		createdOn: {
			type: Schema.Types.Number,
			required: true,
			default: Date.now,
		},
		updatedOn: {
			type: Schema.Types.Number,
			required: true,
		},
	},
	{
		shardKey: { testimonialsID: 1 },
		validateBeforeSave: true,
		autoIndex: false,
		emitIndexErrors: true,
	},
);

TestimonialsSchema.index(
	{
		testimonialsID: 1,
	},
	{
		unique: true,
	},
);

export interface ITestimonials extends Document {
	testimonialsID: string;
	name: string;
	designation: string;
	testimonials: string;
	image: string;
	enabled: boolean;
	createdBy: string;
	updatedBy: string;
	createdOn: number;
	updatedOn: number;
}

export interface ITestimonialsUpdate {
	testimonialsID: string;
	name?: string;
	designation?: string;
	testimonials?: string;
	image?: string;
	enabled?: boolean;
	updatedBy: string;
	updatedOn: number;
}
