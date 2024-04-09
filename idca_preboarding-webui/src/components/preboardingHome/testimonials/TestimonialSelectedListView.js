import React from 'react';
import { makeStyles } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { getTestimonialsSuccess } from '../../../actions/testimonials.action';
import TestimonialsRowView from './TestimonialsRowView';

const useStyles = makeStyles(theme => ({
	root: {
		...theme.typography.common,
		width: '100%',
	},
	ribbon: {
		display: 'flex',
		width: '100%',
		height: '40px',
		marginBottom: '9px',
		padding: '10px 79px 20px 13px',
		backgroundColor: '#ffd973',
		flexDirection: 'row',
		textAlign: 'left',
	},
	ribbonText: {
		paddingLeft: '5px',
	},
}));

const TestimonialsSelectedListView = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const testimonialData = useSelector(state => state.testimonialData.testimonials);

	let testimonialSelectedtrue = [];

	if (testimonialData) {
		testimonialSelectedtrue = testimonialData.filter(
			testimonial => testimonial.enabled === true,
		);
		dispatch(getTestimonialsSuccess(testimonialData, testimonialSelectedtrue.length));
	}

	return (
		<div className={classes.root}>
			<div className={classes.ribbon}>
				<InfoOutlinedIcon />
				<span className={classes.ribbonText}>
					Maximum 5 testimonials are allowed at this section
				</span>
			</div>
			{testimonialSelectedtrue
				? testimonialSelectedtrue.length > 0 &&
				  testimonialSelectedtrue.map(item => (
						<TestimonialsRowView key={item.testimonialsID} {...item} />
				  ))
				: 'something went wrong.. try again..'}
		</div>
	);
};

export default TestimonialsSelectedListView;
