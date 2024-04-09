import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../containers/addOnPage/Pages.container';

const useStyles = makeStyles(theme => ({
	addOnPage: {
		display: 'flex',
		fontSize: '1rem',
	},
}));
export default function AddOnPage() {
	const classes = useStyles();
	return (
		<div className={classes.addOnPage}>
			<Page />
		</div>
	);
}
