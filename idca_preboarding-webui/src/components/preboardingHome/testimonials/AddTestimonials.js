import React, { useState } from 'react';
import { makeStyles, TextField, IconButton, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import AddMedia from '../../common/ImageUpload.component';
import ImageTile from '../../common/ImageTile.component';
import { postTestimonialsData } from '../../../actions/testimonials.action';

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
	formbox: {
		marginRight: '30%',
	},
	content: {
		display: 'inline-block',
		verticalAlign: 'top',
		float: 'left',
	},
	nameClass: {
		width: '90%',
		margin: '31px 0 22px',
		backgroundColor: '#ffffff',
	},
	addTestimonialClass: {
		fontSize: '20px',
		marginRight: '30%',
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: 30,
		paddingBottom: 15,
	},
	descriptionField: {
		width: '90%',
		height: '128px',
		margin: '31px 0 22px',
		backgroundColor: '#ffffff',
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
	holder: {
		display: 'flex',
		flexWrap: 'wrap',
		marginRight: '30%',
		width: '90%',
	},
	box: {
		width: '100%',
		height: '108px',
	},
	charCounter: {
		marginLeft: '65%',
	},
}));

const AddTestmonials = props => {
	const classes = useStyles();
	const [charLimit, setCharLimit] = useState(250);
	const [image, setImages] = useState(null);
	const [name, setName] = useState('');
	const [designation, setDesignation] = useState('');
	const [testimonials, setTestimonials] = useState('');
	const [enabled, setEnabled] = useState(false);
	const result = useSelector(state => state.testimonialData.result);

	const dispatch = useDispatch();
	const addImage = img => {
		setImages(img);
	};

	const removeImage = () => {
		setImages(null);
	};

	const handleClick = () => {
		props.action();
	};

	const handleSaveClick = e => {
		e.preventDefault();
		const data = JSON.stringify({
			image,
			name,
			designation,
			testimonials,
			enabled,
		});
		dispatch(postTestimonialsData(data));
		setImages(null);
		setName('');
		setDesignation('');
		setTestimonials('');
	};

	return (
		<div className={classes.formbox}>
			<div className={classes.addTestimonialClass} onClick={handleClick}>
				<IconButton
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					color="inherit"
				>
					<ArrowBackIosIcon />
				</IconButton>
				<span>Add testimonial to the library</span>
			</div>
			<form onSubmit={handleSaveClick}>
				<div className={classes.holder}>
					{image ? (
						<ImageTile data={image} removeImage={() => removeImage()} />
					) : (
						<AddMedia uploadImage={addImage} value={image} />
					)}
				</div>
				<TextField
					required
					value={name || 'Name'}
					variant="outlined"
					className={classes.nameClass}
					onChange={e => setName(e.target.value)}
				/>
				<TextField
					label="Designation"
					defaultValue="Select"
					value={designation || 'Select'}
					variant="outlined"
					className={classes.nameClass}
					onChange={e => setDesignation(e.target.value)}
				/>
				<TextField
					required
					defaultValue="Testimonials"
					value={testimonials || 'Testimonials'}
					multiline
					rows={5}
					variant="outlined"
					inputProps={{
						maxLength: 250,
					}}
					className={classes.descriptionField}
					onChange={e => setTestimonials(e.target.value)}
				/>
				<div className={classes.charCounter}>
					{testimonials.length}/{charLimit} Char. remaining
				</div>
				<div className={classes.buttonContainer}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={!name || name.length >= 40}
					>
						SAVE
					</Button>
					<Button onClick={handleClick} variant="outlined" color="primary">
						CANCEL
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddTestmonials;
