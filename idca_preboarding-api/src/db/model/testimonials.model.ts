import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { ITestimonials, TestimonialsSchema } from '../schema/testimonials.schema';

export const ITestimonialsModel = model<ITestimonials>('testimonials', TestimonialsSchema);
/* tslint:disable */
ITestimonialsModel.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'ITestimonialsModel',
		});
	} else {
		console.log('Testimonials Model index created');
	}
});
/* tslint:enable */

export interface ICreateITestimonials {
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
