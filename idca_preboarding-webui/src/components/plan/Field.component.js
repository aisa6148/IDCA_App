import React from 'react';
import FieldSet from '../common/fieldComponents/FieldSet.component';

const Field = props => {
	const { index, id, selectedTaskIndex, editLabel, editContent, selectField } = props;
	const { taskList, selectedField, planID } = props.mappedPlanState;
	const highlightContainer = selectedField === id;
	const { mediaList } = taskList[selectedTaskIndex];
	const { fieldID, fieldType, fieldLabel, fieldContent } = taskList[selectedTaskIndex].fields[
		index
	];
	const values = {
		fieldID,
		fieldType,
		fieldLabel,
		fieldContent,
		highlightContainer,
		mediaList,
		planID,
	};
	return <FieldSet {...props} {...values} />;
};

export default Field;
