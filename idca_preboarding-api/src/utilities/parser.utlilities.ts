import { ObjectID } from 'bson';
import { Types } from 'mongoose';
export const convertToString = (text: any): string => {
	// text = text ? text + '' : '';
	// text = text + '';
	return JSON.stringify(text);
};

export const convertToObjectID = (id: string): ObjectID => {
	return Types.ObjectId(id.replace('-', '').substr(0, 12));
};

export const createHistoryIDforVersion = (id: string, version: number): string => {
	return `${id}--hv${version}`;
};
