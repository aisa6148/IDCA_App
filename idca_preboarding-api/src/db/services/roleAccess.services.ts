import mongoose, { Aggregate } from 'mongoose';
import { mongodbErrorHandler } from '../../utilities/mongo.utilities';
import { ICreateRoleAccess, RoleAccessModel } from '../model/roleAccess.model';
import { IRoleAccess } from '../schema/roleAccess.schema';

export const fetchAllRoles = async (userId: string): Promise<IRoleAccess[]> => {
	try {
		const query = RoleAccessModel.find(
			{ userId },
			{
				_id: 0,
				roles: [],
			},
		);
		const returnList: IRoleAccess[] = await query.exec();
		return returnList;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};

export const createUsers = async (userRoleData: ICreateRoleAccess) => {
	try {
		const createdUsers: IRoleAccess = await new RoleAccessModel({
			...userRoleData,
		}).save({
			validateBeforeSave: true,
		});
		return createdUsers;
	} catch (error) {
		mongodbErrorHandler(error);
	}
};
