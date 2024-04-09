import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { IUserTaskStatus, UserTaskStatus as UserTaskStatusSchema } from '../schema/userTaskStatus.schema';

export const UserTaskStatus = model<IUserTaskStatus>('UserTaskStatusSchema', UserTaskStatusSchema);
/* tslint:disable */
UserTaskStatus.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'UserTaskStatus',
		});
	} else {
		console.log('UserTaskStatus index created');
	}
});
/* tslint:enable */

export interface ICreateUserTaskStatus {
	userId: string;
	planId: string;
	taskId: string;
	status: string;
	comments?: string;
	createdOn?: string;
	createdBy?: string;
	updatedOn?: string;
	updatedBy: string;
}
