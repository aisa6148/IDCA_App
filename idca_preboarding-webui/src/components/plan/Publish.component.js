import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import {
	Dialog,
	DialogTitle,
	DialogActions,
	Button,
	Typography,
	IconButton,
	makeStyles,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
	heading: {
		textAlign: 'center',
	},
	dialog: {
		padding: '30px 80px',
		minHeight: 150,
	},
	buttons: {
		margin: '0 auto',
	},
	closeButton: {
		position: 'absolute',
		right: '1px',
		top: '1px',
		margin: '17px',
		color: '#adb0cb',
	},
}));

const PublishComponent = props => {
	const classes = useStyle();

	const cancelAction = () => {
		props.handleClose();
	};

	return (
		<Dialog
			open={props.open}
			onClose={cancelAction}
			aria-labelledby="form-dialog-title"
			classes={{ paperScrollPaper: classes.dialog }}
		>
			<div className={classes.heading}>
				<DialogTitle id="form-dialog-title">
					<Typography variant="subtitle1">Publish Plan</Typography>
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={props.handleClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
			</div>
			<DialogActions className={classes.buttons}>
				<Button
					onClick={props.publishPlan}
					variant="contained"
					color="primary"
					disabled={props.request === 0}
				>
					Publish
				</Button>
				<Button onClick={cancelAction} variant="outlined" color="primary">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PublishComponent;
