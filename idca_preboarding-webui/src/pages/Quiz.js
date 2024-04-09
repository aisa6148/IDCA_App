import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { pagesTitle } from './pagesConstants';

const useStyles = makeStyles(theme => ({
	pages: {
		...theme.typography.pages,
	},
}));
export default function Quiz() {
	const classes = useStyles();
	return <div className={classes.pages}>{pagesTitle.QUIZ}</div>;
}
