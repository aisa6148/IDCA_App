import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { IPlan } from '../schema/plan.schema';
import {
	IPlanVersionHistory,
	PlanVersionHistorySchema,
} from '../schema/planVersionHistory.schema';

export const PlanVersionHistoryModel = model<IPlanVersionHistory>(
	'PlanVersionHistory',
	PlanVersionHistorySchema,
);
/* tslint:disable */
PlanVersionHistoryModel.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'PlanVersionHistoryModel',
		});
	} else {
		console.log('PlanVersionHistoryModel index created');
	}
});
/* tslint:enable */

export interface ICreatePlanVersionHistory {
	historyID: string;
	planID: string;
	planVersion: number;
	createdOn?: string;
	createdBy: string;
	plan: IPlan;
}
