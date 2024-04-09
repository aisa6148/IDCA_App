import React, { useState, useEffect } from 'react';
import { makeStyles, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedTestimonialIDs } from '../../../actions/testimonials.action';

const useStyles = makeStyles(theme => ({
	root: {
		...theme.typography.common,
		width: '100%',
	},
	container: {
		width: '95%',
		height: '170px',
		margin: '5px',
	},
	img: {
		display: 'inline-block',
		verticalAlign: 'top',
		width: '141px',
		height: '158px',
		margin: '5px',
		float: 'left',
	},
	checkbox: {
		float: 'left',
	},
	content: {
		display: 'inline-block',
		verticalAlign: 'top',
		float: 'left',
	},
	title: {
		margin: '0',
		padding: '3px 10px 3px 0',
		fontSize: '17px',
		fontWeight: 'bold',
		textAlign: 'left',
	},
	subtitle: {
		margin: '0',
		padding: '3px  10px 3px 0',
		fontWeight: 'bold',
		color: '#3F3F3F',
		textAlign: 'left',
	},
	box: {
		maxWidth: '310px',
		minWidth: '70px',
		height: '108px',
		textAlign: 'left',
		wordWrap: 'break-word',
	},
}));

const TestimonialsRowView = props => {
	const classes = useStyles();
	const [imageData, setImageData] = useState('');
	const [checked, setChecked] = useState(false);
	const testimonialIdsSet = useSelector(state => state.testimonialData.testimonialsID);
	const dispatch = useDispatch();

	const handleCheckBox = testimonialsID => {
		setChecked(!checked);
		const testimonialIDsetLocal = new Set(testimonialIdsSet);

		if (testimonialIdsSet) {
			if (checked === false) {
				testimonialIDsetLocal.add(testimonialsID);
			} else {
				testimonialIDsetLocal.delete(testimonialsID);
			}
		}
		dispatch(selectedTestimonialIDs(testimonialIDsetLocal));
	};

	const getImage = image => {
		return axios
			.get(`/api/testimonials/image/${image}`)
			.then(res => {
				setImageData(res.data.response);
			})
			.catch(error => {
				console.error(error);
			});
	};

	useEffect(
		() => {
			if (props.image) {
				getImage(props.image);
			}
		},
		[props.image],
	);

	return (
		<div className={classes.container} key={props.testimonialsID}>
			<Checkbox
				className={classes.checkbox}
				onClick={() => handleCheckBox(props.testimonialsID)}
			/>
			<img src={imageData} className={classes.img} alt="" />
			<div className={classes.content}>
				<p className={classes.title}>{props.name}</p>
				<p className={classes.subtitle}>{props.designation}</p>
				<div className={classes.box}>{props.testimonials}</div>
			</div>
		</div>
	);
};

export default TestimonialsRowView;
