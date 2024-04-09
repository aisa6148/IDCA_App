import mongoose, { Aggregate } from 'mongoose';
import { mongodbErrorHandler } from '../../utilities/mongo.utilities';
import { ICreateITestimonials, ITestimonialsModel } from '../model/testimonials.model';
import { ITestimonials, ITestimonialsUpdate } from '../schema/testimonials.schema';

export const createTestimonials = async (testimonialsData: ICreateITestimonials) => {
	try {
		const savedTestimonials: ITestimonials = await new ITestimonialsModel({
			...testimonialsData,
		}).save({
			validateBeforeSave: true,
		});
		return savedTestimonials;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const fetchAllTestimonials = async (): Promise<ITestimonials[]> => {
	try {
		const query = ITestimonialsModel.find(
			{},
			{
				_id: 0,
			},
		);
		const returnList: ITestimonials[] = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const fetchAllTestimonialsEnabled = async (enabled: boolean): Promise<ITestimonials[]> => {
	try {
		const query = ITestimonialsModel.find(
			{ enabled },
			{
				_id: 0,
			},
		);
		const returnList: ITestimonials[] = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const fetchTestimonialById = async (testimonialsID: string): Promise<ITestimonials[]> => {
	try {
		const query = ITestimonialsModel.find(
			{ testimonialsID },
			{
				_id: 0,
			},
		);
		const returnList: ITestimonials[] = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};
export const deleteTestimonialById = async (testimonialsID: string): Promise<any> => {
	try {
		const query = ITestimonialsModel.deleteOne({ testimonialsID });
		const response = await query.exec();
		return response;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const updateTestimonialById = async (
	testimonialsData: ITestimonialsUpdate,
): Promise<any> => {
	try {
		const testimonialsID = testimonialsData.testimonialsID;
		const setFields = { ...testimonialsData };
		delete setFields.testimonialsID;
		const query = ITestimonialsModel.updateOne({ testimonialsID }, { $set: setFields });
		const returnData = await query.exec();
		return returnData;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};
