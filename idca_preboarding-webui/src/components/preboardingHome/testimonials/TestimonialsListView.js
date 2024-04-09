import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import TestimonialsRowView from './TestimonialsRowView';
import { getTestimonialsData } from '../../../actions/testimonials.action';

const useStyles = makeStyles(theme => ({
	root: {
		...theme.typography.common,
		width: '100%',
	},
}));

const TestimonialsListView = () => {
	const classes = useStyles();

	const testimonialData = useSelector(state => state.testimonialData.testimonials);

	const dispatch = useDispatch();

	let testimonialSelectedFalse = [];

	if (testimonialData) {
		testimonialSelectedFalse = testimonialData.filter(
			testimonial => testimonial.enabled === false,
		);
	}
	useEffect(() => {
		dispatch(getTestimonialsData());
	}, []);

	return (
		<div className={classes.root}>
			{testimonialSelectedFalse
				? testimonialSelectedFalse.length > 0 &&
				  testimonialSelectedFalse.map(item => (
						<TestimonialsRowView key={item.testimonialsID} {...item} />
				  ))
				: 'something went wrong.. try again..'}
		</div>
	);
};

export default TestimonialsListView;
