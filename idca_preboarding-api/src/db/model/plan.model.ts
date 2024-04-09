import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { IPlan, Plan as PlanSchema } from '../schema/plan.schema';
import { ITask } from '../schema/task.schema';

export const Plan = model<IPlan>('Plan', PlanSchema);
/* tslint:disable */
Plan.on('index', error => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: 'PlanModel',
		});
	} else {
		console.log('PlanModel index created');
	}
});
/* tslint:enable */

export interface ICreatePlan {
	planType: string;
	planID: string;
	planVersion: number;
	planName: string;
	parentPlanID?: string;
	status: string;
	createdOn?: string;
	createdBy?: string;
	updatedOn?: string;
	updatedBy?: string;
	taskList: ITask[];
	description: string;
}
