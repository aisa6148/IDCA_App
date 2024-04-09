import React from 'react';
import { Button, Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { DeleteOutline, PlayCircleOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import TestimonialsSelectedListView from './TestimonialSelectedListView';
import { addToApplicationTestimonialID } from '../../../actions/testimonials.action';
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
	root: {
		fontFamily: 'Bogle',
		width: '100%',
		height: '45px',
	},
	itemSet: {
		fontWeight: 'bold',
		paddingTop: '10px',
	},
	itemBox: {
		fontFamily: 'Bogle',
		height: '700px',
		margin: '10px',
		overflow: 'scroll',
		background: '#ffffff',
	},
	itemButton: {
		...theme.typography.h4,
		textAlign: 'left',
		color: '#002d58',
	},
	itemSet1: {
		marginTop: '10px',
		height: '30px',
		width: 'auto',
		textTransform: 'none',
		textAlign: 'left',
	},
}));

export default function TestimonialRightSideList() {
	const classes = useStyles();
	const testimonialIdsSet = useSelector(state => state.testimonialData.testimonialsID);
	const disabled = testimonialIdsSet && testimonialIdsSet.size === 0;
	const dispatch = useDispatch();
	const handleSelectRemove = () => {
		if (testimonialIdsSet) {
			dispatch(addToApplicationTestimonialID(testimonialIdsSet, false));
		}
	};
	return (
		<div>
			<Grid container spacing={2} className={classes.itemButton}>
				<Grid item xs={6} sm={7} className={classes.root}>
					<div className={classes.itemSet}>Pre-boarding App</div>
				</Grid>
				<Grid item xs={6} sm={2} className={classes.root}>
					<Tooltip title={disabled ? 'Select and remove' : ''}>
						<span>
							<Button
								onClick={handleSelectRemove}
								className={classes.itemSet1}
								disabled={disabled}
							>
								<IconButton color="inherit">
									<DeleteOutline />
								</IconButton>
								<span>Remove</span>
							</Button>
						</span>
					</Tooltip>
				</Grid>
				<Grid item xs={6} sm={3} className={classes.root}>
					<Button className={classes.itemSet1}>
						<IconButton color="inherit">
							<PlayCircleOutline />
						</IconButton>
						<span>Preview Section</span>
					</Button>
				</Grid>
			</Grid>
			<div className={classes.itemBox}>
				<TestimonialsSelectedListView />
			</div>
		</div>
	);
}
