import React, { useState } from 'react';
import {
	Grid,
	IconButton,
	makeStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
	Tooltip,
} from '@material-ui/core';
import { DeleteOutline, ContactsOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import TestimonialsListView from './TestimonialsListView';
import AddTestmonials from './AddTestimonials';
import {
	removeTestimonialsID,
	addToApplicationTestimonialID,
} from '../../../actions/testimonials.action';

const useStyles = makeStyles(theme => ({
	root: {
		fontFamily: 'Bogle',
		width: '100%',
		height: '45px',
	},
	itemSet: {
		fontWeight: 'bold',
		paddingTop: '10px',
		textTransform: 'none',
	},
	addTestimonialButton: {
		marginTop: '10px',
		marginLeft: '54px',
		height: '30px',
		width: 'auto',
		textTransform: 'none',
		textAlign: 'left',
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
		texxColor: '#002d58',
	},
	button: {
		...theme.overrides.MuiButton.outlinedPrimary,
	},
	dialogPaper: {
		height: '250px',
	},
	removeButton: {
		marginTop: '10px',
		marginRight: '30px',
		height: '30px',
		width: 'auto',
		textTransform: 'none',
		textAlign: 'left',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: theme.spacing(2),
		paddingTop: '35px',
		paddingLeft: '10px',
		minWidth: 120,
	},
	DialogContentText: {
		fontSize: 15,
		textAlign: 'center',
	},
	DialogAction: {
		paddingRight: '130px',
	},
}));

export default function TestimonialLeftSideList() {
	const classes = useStyles();
	const [value, setValue] = useState(false);
	const [open, setOpen] = useState(false);
	const testimonialIdsSet = useSelector(state => state.testimonialData.testimonialsID);
	const enabledCount = useSelector(state => state.testimonialData.enabledCount);
	const disabled = testimonialIdsSet && testimonialIdsSet.size === 0;
	const disabledAddToTestimonial = enabledCount >= 5 || disabled;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const dispatch = useDispatch();
	const handleClick = () => {
		setValue(!value);
	};
	const handleRemoveTestimonials = () => {
		if (testimonialIdsSet) {
			dispatch(removeTestimonialsID(testimonialIdsSet));
			setOpen(false);
		}
		setOpen(false);
	};

	const handleAddToApplication = () => {
		if (testimonialIdsSet) {
			dispatch(addToApplicationTestimonialID(testimonialIdsSet, true));
		}
	};

	return (
		<div>
			<Grid container spacing={2} className={classes.itemButton}>
				<Grid item xs={6} sm={3} className={classes.root}>
					<div className={classes.itemSet}>Testimonials</div>
				</Grid>
				<Grid item xs={6} sm={4} className={classes.root}>
					<Button onClick={handleClick} className={classes.addTestimonialButton}>
						<IconButton color="inherit">
							<ContactsOutlined />
						</IconButton>
						<span>Add Testimonials</span>
					</Button>
				</Grid>
				<Grid item xs={6} sm={2} className={classes.root}>
					<Tooltip title={disabled ? 'Select and delete' : ''}>
						<span>
							<Button
								onClick={handleClickOpen}
								className={classes.removeButton}
								disabled={disabled}
							>
								<IconButton color="inherit">
									<DeleteOutline />
								</IconButton>
								<span>Remove</span>
							</Button>
							<Dialog
								open={open}
								onClose={handleClose}
								fullWidth={true}
								maxWidth={'xs'}
								classes={{ paper: classes.dialogPaper }}
							>
								<div className={classes.content}>
									<DialogContent>
										<DialogContentText className={classes.DialogContentText}>
											Do you like to remove selected testmonials?
										</DialogContentText>
									</DialogContent>
									<DialogActions className={classes.DialogAction}>
										<Button
											onClick={handleClose}
											variant="outlined"
											color="primary"
											className={classes.button}
										>
											NO
										</Button>
										<Button
											onClick={() => handleRemoveTestimonials()}
											variant="contained"
											color="primary"
											autoFocus
										>
											YES
										</Button>
									</DialogActions>
								</div>
							</Dialog>
						</span>
					</Tooltip>
				</Grid>
				<Grid item xs={6} sm={3} className={classes.root}>
					<Tooltip title={disabledAddToTestimonial ? 'Max 5 testimonials' : ''}>
						<span>
							<Button
								className={classes.itemSet}
								onClick={handleAddToApplication}
								disabled={disabledAddToTestimonial}
							>
								+ Add to Application
							</Button>
						</span>
					</Tooltip>
				</Grid>
			</Grid>
			<div value={value} className={classes.itemBox}>
				{value === true ? (
					<AddTestmonials action={handleClick} />
				) : (
					<TestimonialsListView />
				)}
			</div>
		</div>
	);
}
