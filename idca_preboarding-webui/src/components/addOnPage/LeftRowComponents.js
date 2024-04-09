import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	leftIcon: {
		padding: '10px 20px 0 15px',
		marginRight: '5%',
		color: ' #041f41',
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
const LeftRowComponents = props => {
	const classes = useStyles();

	return (
		<span className={classes.leftIcon}>
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

export default LeftRowComponents;
