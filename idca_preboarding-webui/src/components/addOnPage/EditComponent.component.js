import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import FieldComponent from '../../containers/addOnPage/Field.container';
import EmptyDropComponent from '../../containers/plan/EmptyDrop.container';

const useStyles = makeStyles(theme => ({
	container: {
		padding: '0px 30px 0px 30px',
		height: 'calc(100vh - 120px)',
	},
}));

const EditComponent = props => {
	const classes = useStyles();
	const { fields } = props.mappedAddOnPageState;

	return (
		<div className={classes.container}>
			<EmptyDropComponent empty={fields.length === 0} />
			{fields &&
				fields.map((field, i) => {
					return <FieldComponent key={field.fieldID} index={i} id={field.fieldID} />;
				})}
		</div>
	);
};

export default EditComponent;
