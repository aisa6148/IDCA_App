import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { LogManage } from '../SqlDatabaseConnection';
export const createLog = async (LogDataStore): Promise<any> => {
	try {
		const addFields = { ...LogDataStore };
		addFields.updatedAt = Date.now();
		addFields.createdAt = Date.now();
		const returnValue = LogManage.create(addFields);
		return returnValue;
	} catch (error) {
		LogError(error, EVENT_NAME.INSERT_LOG_DATA);
	}
};
