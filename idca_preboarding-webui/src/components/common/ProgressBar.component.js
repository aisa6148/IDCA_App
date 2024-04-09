import React from 'react';
import { LinearProgress, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	progressBar: {
		zIndex: theme.zIndex.drawer + 2,
		position: 'absolute',
		top: '0px',
		left: '0px',
		width: '100vw',
	},
	hidden: {
		visibility: 'hidden',
	},
}));

const ProgressBar = props => {
	const classes = useStyles();
	return (
		<LinearProgress
			variant="indeterminate"
			className={clsx(classes.progressBar, {
				[classes.hidden]: props.mappedLoadingState <= 0,
			})}
		/>
	);
};

export default ProgressBar;
