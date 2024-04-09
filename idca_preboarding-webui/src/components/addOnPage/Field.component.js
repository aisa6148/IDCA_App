import React from 'react';
import { makeStyles } from '@material-ui/core';
import FieldSet from '../common/fieldComponents/FieldSet.component';

const useStyles = makeStyles({});
const Field = props => {
	const classes = useStyles();
	const { index, id, editLabel, editContent, selectField } = props;
	const { fields, selectedField, pageID } = props.mappedAddOnPageState;

	const highlightContainer = selectedField === id;

	const { fieldID, fieldType, fieldLabel, fieldContent } = fields[index];
	if (id !== fieldID) {
		throw new Error('mismatch in ID');
	}
	const values = {
		fieldID,
		fieldType,
		fieldLabel,
		fieldContent,
		highlightContainer,
		pageID,
	};
	return <FieldSet {...props} {...values} />;
};
export default Field;
