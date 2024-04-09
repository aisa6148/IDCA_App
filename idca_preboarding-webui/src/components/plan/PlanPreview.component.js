import React, { forwardRef, useState, useEffect } from 'react';
import { ArrowBackIos } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import {
	Slide,
	Typography,
	makeStyles,
	CircularProgress,
	DialogActions,
	Button,
	IconButton,
} from '@material-ui/core';
import saveAs from 'file-saver';

import Dialog from '../materialui/Dialog';
import FieldTypes from '../common/fieldComponents/itemTypes';
import { TextDisplay } from '../common/fieldComponents/Text.component';
import { URLDisplay } from '../common/fieldComponents/URL.component';
import { MediaLibraryDisplay } from '../common/fieldComponents/MediaLibrary.component';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	description: {
		fontFamily: 'Bogle',
		fontSize: '14px',
		fontWeight: 'normal',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		color: '#000000',
	},
	number: {
		borderRadius: '50%',
		backgroundColor: '#041f41',
		color: 'white',
		padding: '8px',
		width: '30px',
		height: '30px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 17,
		fontSize: 16,
	},
	tasksContainer: {
		overflowY: 'scroll',
	},
	taskContainer: {
		display: 'flex',
		margin: '30px 0px',
		padding: '5px 5px 5px 34px;',
	},
	dialogContainer: {
		padding: 30,
		height: 710,
		borderRadius: '8px !important',
		boxShadow: '0 5px 10px 3px rgba(0, 0, 0, 0.15)',
		backgroundColor: '#ffffff',
		margin: '2.2px 11px 92px 176.3px',
	},
	arrow: {
		color: '#041f41',
		marginRight: 10,
	},
	backContainer: {
		alignItems: 'center',
		display: 'flex',
		cursor: 'pointer',
		marginBottom: 12,
		'&:hover': {},
	},
	contentBig: {
		...theme.custom.contentBig,
	},
	contentSmallBold: {
		...theme.custom.contentSmallBold,
	},
	subtitle1: {
		fontSize: '24px',
		fontWeight: 'bold',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.5',
		letterSpacing: 'normal',
		color: '#2e2f32',
	},
	subtitle2: {
		fontSize: '18px',
		fontWeight: 'bold',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.33',
		letterSpacing: 'normal',
		color: '#2e2f32',
	},
	buttons: {
		margin: '0 auto',
	},
	buttonClass: {
		width: 80,
	},
	closeButton: {
		position: 'absolute',
		right: '1px',
		top: '1px',
		margin: '25px 0',
		color: '#2e2f32',
	},
}));

const PlanPreview = props => {
	const [render, setRender] = useState(!!props.exists);
	const classes = useStyles();
	const { mappedPlanState: plan } = props;
	useEffect(() => {
		if (!props.exists) {
			props.handleApiCall(
				`/api/plans/fetch/${encodeURIComponent(props.planID)}`,
				{ method: 'GET' },
				response => {
					props.initPlan({ plan: response.plan });
					setRender(true);
				},
				error => {
					console.error(error);
					setRender(false);
				},
			);
		}
	}, []);
	const onDownload = (content, label) => {
		props.handleApiCallBlob(
			`/api/plans/fetch-media/${props.planID}/${label}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'json',
			},
			blob => {
				saveAs(blob, label);
			},
			error => console.error(error),
		);
	};
	return (
		<Dialog
			TransitionComponent={Transition}
			fullWidth={true}
			maxWidth={'xs'}
			open={true}
			onClose={props.close}
			classes={{ paper: classes.dialogContainer }}
		>
			<div onClick={props.close} className={classes.backContainer}>
				<ArrowBackIos className={classes.arrow} />
				<Typography className={classes.subtitle1} variant="subtitle1">
					{plan.planName}
				</Typography>
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={props.close}
				>
					<CloseIcon />
				</IconButton>
			</div>
			{render ? (
				<div className={classes.tasksContainer}>
					{plan.taskList.map((task, i) => (
						<div className={classes.taskContainer} key={i}>
							<TaskPreview {...task} onDownload={onDownload} />
						</div>
					))}
				</div>
			) : (
				<CircularProgress />
			)}
			<DialogActions className={classes.buttons}>
				<Button
					variant="outlined"
					color="primary"
					onClick={props.close}
					className={classes.buttonClass}
				>
					Close
				</Button>
				<Button
					className={classes.buttonClass}
					onClick={props.publishPlan}
					variant="contained"
					color="primary"
					disabled={
						props.request === 0 ||
						!props.mappedPlanState.planID ||
						props.mappedPlanState.unsavedChanges
					}
				>
					Publish
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const taskStyles = makeStyles({
	container: {},
	subtitle2: {
		fontSize: '18px',
		fontWeight: 'bold',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.33',
		letterSpacing: 'normal',
		color: '#2e2f32',
	},
});
const TaskPreview = props => {
	const classes = taskStyles();
	const { taskName, fields } = props;

	const formField = field => {
		const { fieldContent, fieldLabel, fieldID, fieldType } = field;
		switch (fieldType) {
			case FieldTypes.ShortText:
				return <TextDisplay content={fieldContent} label={fieldLabel} key={fieldID} />;
			case FieldTypes.URL:
				return <URLDisplay content={fieldContent} label={fieldLabel} key={fieldID} />;
			case FieldTypes.Attachment:
				return (
					<MediaLibraryDisplay
						content={fieldContent}
						label={fieldLabel}
						key={fieldID}
						onDownload={() => props.onDownload(fieldContent, fieldLabel)}
					/>
				);
			default:
				return <div />;
		}
	};
	return (
		<div className={classes.container}>
			<Typography className={classes.subtitle2}>{taskName}</Typography>
			{fields.map(field => formField(field))}
		</div>
	);
};

export default PlanPreview;
