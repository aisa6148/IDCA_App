import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	rightIcon: {
		padding: '10px 15px 0 20px',
		marginLeft: '2%',
		color: '#041f41',
	},
	iconText: {
		textAlign: 'center',
		fontSize: '12px',
		marginTop: '1px',
		color: ' #2e2f32',
	},
	iconColor: {
		color: '#041f41',
	},
}));
const RightRowComponents = props => {
	const classes = useStyles();

	return (
		<span className={classes.rightIcon}>
			<IconButton
				className={classes.iconColor}
				onClick={() => props.createField({ fieldType: props.itemType })}
			>
				{props.icon}
			</IconButton>
			<div className={classes.iconText}>{props.iconText}</div>
		</span>
	);
};

export default RightRowComponents;
