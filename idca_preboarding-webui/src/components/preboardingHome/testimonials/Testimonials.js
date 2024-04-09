import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TestimonialLeftSideList from './TestimonialLeftSide';
import TestimonialRightSideList from './TestimonialRightSide';

const useStyles = makeStyles(() => ({
	root: {
		marginTop: '15px',
		fontSize: '12px',
		textAlign: 'center',
		scroll: 'auto',
	},
}));

export default function Testimonials() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TestimonialLeftSideList />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TestimonialRightSideList />
				</Grid>
			</Grid>
		</div>
	);
}
