import { ITask } from '../schema/task.schema';
import { ITaskField } from '../schema/taskField.schema';

import * as _ from 'lodash';

export const compareTaskFieldBasicDetails = (field1: ITaskField, field2: ITaskField) => {
	return (
		_.isEqual(field1.fieldID, field2.fieldID) &&
		_.isEqual(field1.fieldType, field2.fieldType) &&
		_.isEqual(field1.fieldLabel, field2.fieldLabel) &&
		_.isEqual(field1.fieldContent, field2.fieldContent)
	);
};

export const compareTasksBasicDetails = (task1: ITask, task2: ITask) => {
	const taskDiff: any = {};
	[
		'taskID',
		'templateID',
		'taskVersion',
		'duration',
		'taskType',
		'taskName',
		'mandatory',
	]
		.map((f) => ({ f, old: task1[f], new: task2[f] }))
		.filter((t) => !_.isEqual(t.old, t.new))
		.filter(
			(t) =>
				!(
					(t.old === undefined && t.new === null) ||
					(t.new === undefined || t.old === null)
				),
		)
		.forEach((t) => {
			taskDiff[t.f] = { old: t.old, new: t.new };
		});

	const unchangedTaskFields = _.intersectionWith(
		task1.fields,
		task2.fields,
		compareTaskFieldBasicDetails,
	);
	const changedTask1Fields = _.differenceWith(
		task1.fields,
		unchangedTaskFields,
		compareTaskFieldBasicDetails,
	);
	const changedTask2Fields = _.differenceWith(
		task2.fields,
		unchangedTaskFields,
		compareTaskFieldBasicDetails,
	);

	if (_.size(changedTask1Fields) || _.size(changedTask2Fields)) {
		taskDiff.field = {
			old: changedTask1Fields,
			new: changedTask2Fields,
		};
	}
	return {
		taskDiff,
		unchangedTaskFields,
		changedTask1Fields,
		changedTask2Fields,
	};
};
