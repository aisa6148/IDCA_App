import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { ITask } from '../schema/task.schema';
import { ITaskVersionHistory, TaskVersionHistorySchema } from '../schema/taskVersionHistory.schema';

export const TaskVersionHistoryModel = model<ITaskVersionHistory>(
	'TaskVersionHistory',
	TaskVersionHistorySchema,
);
/* tslint:disable */
TaskVersionHistoryModel.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'TaskVersionHistoryModel',
		});
	} else {
		console.log('TaskVersionHistoryModel index created');
	}
});
/* tslint:enable */

export interface ICreateTaskVersionHistory {
	historyID: string;
	taskID: string;
	taskVersion: number;
	createdOn?: string;
	createdBy: string;
	task: ITask;
}
