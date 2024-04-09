// @ts-nocheck
import { MODEL_ERRORS } from '../../config/error';
import { EVENT_NAME } from '../../config/log';
import { IUserModel } from '../../db/schema/user.schema';
import AppError from '../../utilities/error.utilities';
import { LogError } from '../../utilities/log.utilities';
import { User } from '../SqlDatabaseConnection';

export const createUser = async (userData): Promise<any> => {
	try {
		const addFields = { ...userData };
		addFields.updatedAt = Date.now();
		addFields.createdAt = Date.now();
		const returnValue = User.create(addFields);
		return returnValue;
	} catch (error) {
		LogError(error, EVENT_NAME.INSERT_USER_DATA);
	}
};

export const fetchAllUserData = async () => {
	try {
		const returnList = User.findAll();
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.FETCH_USER_DATA);
	}
};

export const fetchUserDataById = async (applyId: string): Promise<any> => {
	try {
		const returnList = User.findOne({
			where: {
				applyId,
			},
		});
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.FETCH_USER_DATA_BY_ID);
	}
};

export const fetchUserDataByCandidateId = async (applyId: string): Promise<any> => {
	try {
		const returnList = User.findOne({
			where: {
				applyId,
			},
		});
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.FETCH_USER_DATA_BY_ID);
	}
};

export const fetchUserDataByEmailId = async (emailId: string): Promise<any> => {
	try {
		const returnList = User.findOne({
			where: {
				emailId,
				active: true,
			},
		});
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.FETCH_USER_DATA_BY_ID);
	}
};

export const deleteUserDataById = async (id: string): Promise<any> => {
	try {
		const returnList = User.destroy({
			where: {
				id,
			},
		});
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.DELETE_USER_DATA_BY_ID);
	}
};
export const updateUserDataById = async (userData): Promise<any> => {
	try {
		const userID = userData.userID;
		const setFields = { ...userData };
		delete setFields.userID;
		delete setFields.createdAt;
		setFields.updatedAt = Date.now();
		const returnUpdate = User.update(setFields, { where: { id: userID } });
		return returnUpdate;
	} catch (error) {
		LogError(error, EVENT_NAME.UPDATE_USER_DATA_BY_ID);
	}
};

export const updateCandidateById = async (id, userData): Promise<any> => {
	try {
		const setFields = { ...userData };
		delete setFields.createdAt;
		setFields.updatedAt = Date.now();
		const returnUpdate = User.update(setFields, { where: { id } });
		return returnUpdate;
	} catch (error) {
		LogError(error, EVENT_NAME.UPDATE_USER_DATA_BY_ID);
	}
};
export const updateCandidateStatusId = async (statusData): Promise<any> => {
	try {
		const returnUpdateStatus = User.update(
			{ active: false },
			{ where: { applyId: statusData } },
		);
		return returnUpdateStatus;
	} catch (error) {
		LogError(error, EVENT_NAME.UPDATE_USER_DATA_BY_ID);
	}
};

export const fetchAllCandidate = async (): Promise<IUserModel[]> => {
	try {
		const returnAllData = User.findAll({});
		return returnAllData;
	} catch (error) {
		throw error;
	}
};

export const deleteCandidatewithStatusFalse = async (statusData): Promise<any> => {
	try {
		const returnList = User.destroy({ where: { applyId: statusData, locked: false } });
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.DELETE_USER_DATA_BY_ID);
	}
};

export const fetchUserDataByEmail = async (emailId: string): Promise<any> => {
	try {
		const returnList = User.findOne({
			where: {
				emailId,
			},
		});
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.FETCH_USER_DATA_BY_ID);
	}
};

export const fetchUserDataById = async (id: string): Promise<any> => {
	try {
		const returnList = User.findOne({
			where: {
				id,
			},
		});
		return returnList;
	} catch (error) {
		LogError(error, EVENT_NAME.FETCH_USER_DATA_BY_ID);
	}
};
