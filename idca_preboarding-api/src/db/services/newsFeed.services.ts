import mongoose, { Aggregate } from 'mongoose';
import { mongodbErrorHandler } from '../../utilities/mongo.utilities';
import { ICreateNewsFeed, NewsFeedModel } from '../model/newsFeed.model';
import { INewsFeed, INewsFeedUpdate } from '../schema/newsFeed.schema';

export const createNewsFeed = async (newsFeedData: ICreateNewsFeed) => {
	try {
		const savedNewsFeed: INewsFeed = await new NewsFeedModel({
			...newsFeedData,
		}).save({
			validateBeforeSave: true,
		});
		return savedNewsFeed;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const fetchAllNewsFeed = async (): Promise<INewsFeed[]> => {
	try {
		const query = NewsFeedModel.find(
			{},
			{
				_id: 0,
			},
		);
		const returnList: INewsFeed[] = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const fetchAllNewsFeedEnabled = async (enabled: boolean): Promise<INewsFeed[]> => {
	try {
		const query = NewsFeedModel.find(
			{ enabled },
			{
				_id: 0,
			},
		);
		const returnList: INewsFeed[] = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const fetchNewsFeedById = async (newsID: string): Promise<INewsFeed[]> => {
	try {
		const query = NewsFeedModel.find(
			{ newsID },
			{
				_id: 0,
			},
		);
		const returnList: INewsFeed[] = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const deleteNewsById = async (newsID: string): Promise<any> => {
	try {
		const query = NewsFeedModel.deleteOne({ newsID });
		const response = await query.exec();
		return response;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const updateNewsById = async (newsData: INewsFeedUpdate): Promise<any> => {
	try {
		const newsID = newsData.newsID;
		const setFields = { ...newsData };
		delete setFields.newsID;
		const query = NewsFeedModel.updateOne({ newsID }, { $set: setFields });
		const returnData = await query.exec();
		return returnData;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};
