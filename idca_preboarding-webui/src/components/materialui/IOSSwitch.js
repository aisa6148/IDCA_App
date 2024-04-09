import React from 'react';
import { Switch, withStyles } from '@material-ui/core';

export default withStyles(theme => ({
	root: {
		width: 35,
		height: 18,
		padding: 0,
		margin: theme.spacing(1),
		marginRight: 15,
	},
	switchBase: {
		padding: 1,
		'&$checked': {
			color: 'theme.palette.common.white',
			'& + $track': {
				backgroundColor: '#041f41',
				opacity: 1,
				border: 'none',
			},
		},
		'&$focusVisible $thumb': {
			color: '#041f41',
			border: '6px solid #fff',
		},
	},
	thumb: {
		width: 16,
		height: 16,
	},
	track: {
		borderRadius: 18 / 2,
		border: `1px solid ${theme.palette.grey[400]}`,
		backgroundColor: '#afb0ca',
		opacity: 1,
		transition: theme.transitions.create(['background-color', 'border']),
	},
	checked: {},
	focusVisible: {},
}))(({ classes, ...props }) => {
	return (
		<Switch
			focusVisibleClassName={classes.focusVisible}
			disableRipple
			classes={{
				root: classes.root,
				switchBase: classes.switchBase,
				thumb: classes.thumb,
				track: classes.track,
				checked: classes.checked,
			}}
			color={'default'}
			{...props}
		/>
	);
});
