import React, { useState, useEffect } from 'react';
import { Button, makeStyles, Divider, IconButton, Grid } from '@material-ui/core';
import { RemoveRedEye as PreviewIcon, PlayCircleOutline, ArrowBackIos } from '@material-ui/icons';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import * as _ from 'lodash';

import LayoutComponent from '../common/Layout.component';
import TaskListContainer from '../../containers/plan/TaskList.container';
import EditTaskContainer from '../../containers/plan/EditTask.container';
import PublishComponent from '../../containers/plan/Publish.container';
import PlanPreview from '../../containers/plan/PlanPreview.container';
import { PLAN_STATUS } from '../../config/planConstants';
import { RESPONSE_STATUS } from '../../config/constants';
import { PLAN_API } from '../../config/apiConstants';

const useStyles = makeStyles(theme => ({
	mainBar: {
		backgroundColor: '#e0e2ea',
		padding: '10px 0',
		height: 91,
		overflowY: 'initial',
	},
	rightButtons: {
		float: 'right',
		marginRight: 28,
	},
	icon: {
		height: '15px',
		width: 'auto',
		margin: '0px 5px',
	},
	menuColumns: {
		display: 'inline-block',
		textAlign: 'center',
		fontFamily: 'Bogle',
		fontSize: '12px',
		fontWeight: 'bold',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
	},
	blocks: {
		padding: 10,
	},
	leftButton: {
		margin: '0px 0px 0px 15px',
		lineHeight: '48px',
	},
	arrow: {
		color: '#041f41',
		width: 20,
		height: 20,
	},
	outlinedBtn: {
		...theme.typography.common,
		fontWeight: 'bold',
		borderRadius: '100px',
		border: 'solid 1.5px #041f41',
		backgroundColor: '#ffffff',
		margin: '0px 15px',
		color: '#041f41',
		'&:hover': {
			backgroundColor: '#ffffff',
		},
	},
	filledBtn: {
		...theme.typography.common,
		fontWeight: 'bold',
		borderRadius: '100px',
		border: 'solid 1.5px #041f41',
		backgroundColor: '#041f41',
		marginLeft: '15px',
		color: '#ffffff',
		'&:hover': {
			backgroundColor: '#041f41',
		},
	},
	container: {
		backgroundColor: 'white',
		display: 'inline-block',
		// width: 350,
		float: 'left',
		height: '100%',
		padding: '5px 30px 0px 30px',
	},
	preview: {
		margin: '0 15px',
		display: 'inline-block',
	},
	heading1: {
		...theme.typography.heading1,
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '19px',
		},
	},
	button: {
		...theme.overrides.MuiButton.containedPrimary,
	},
	menuBox: {
		float: 'right',
		marginRight: '32px',
	},
}));

const EditPlan = props => {
	const classes = useStyles();
	const [render, setRender] = useState(false);
	const [publishDialog, setPublishDialog] = useState(false);
	const [preview, setPreview] = useState('');
	const [request, setRequest] = useState(undefined);
	const [saving, setSaving] = useState(undefined);

	useEffect(() => {
		if (props.planID) {
			props.handleApiCall(
				`${PLAN_API.FETCH_PLAN}/${encodeURIComponent(props.planID)}`,
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
		} else {
			props.initPreboardingPlan();
			setRender(true);
		}
	}, []);

	const saveFile = data => {
		const formData = new FormData();
		formData.append('file', data.media);
		formData.append('planID', data.planID);
		formData.append('taskID', data.taskID);
		formData.append('mediaID', data.mediaID);
		formData.append('fileName', data.fileName);
		formData.append('fileSize', data.fileSize);
		formData.append('fileType', data.fileType);
		return props.handleApiCall(
			PLAN_API.UPLOAD_FILE,
			{
				method: 'POST',

				headers: {
					ContentType: 'multipart/form-data',
				},
				body: formData,
			},

			response => {
				if (response.status === RESPONSE_STATUS.SUCCESS) {
					props.savedMedia(response.data);
					return true;
				}
			},
			error => {
				console.error(error);
			},
		);
	};

	const deleteFile = data => {
		props.handleApiCall(
			`${PLAN_API.DELETE_FILE}/${data.planID}/${data.taskID}/${data.mediaID}/${
				data.fileName
			}`,
			{
				method: 'DELETE',

				headers: {
					ContentType: 'application/json',
				},
			},

			response => {
				if (response.status === RESPONSE_STATUS.SUCCESS) {
					props.deletedMedia(data);
					return true;
				}
			},
			error => {
				console.error(error);
				props.deleteMediaFailed(error.message);
			},
		);
	};

	const savePlan = () => {
		setSaving(0);
		const plan = props.mappedPlanState;
		const { taskList } = plan;
		let url = '';
		if (plan.status === PLAN_STATUS.EDIT_ACTIVE) {
			url = `${PLAN_API.SAVE_EDIT}/${plan.parentPlanID}`;
		} else if (plan.status === PLAN_STATUS.ACTIVE) {
			url = `${PLAN_API.SAVE_EDIT}/${plan.planID}`;
		} else {
			url = PLAN_API.CREATE_PLAN;
		}
		const promise = [];
		taskList.forEach((item, index) => {
			item.mediaList.forEach((media, mediaIndex) => {
				if (!media._id) {
					const data = {
						fileName: media.fileName,
						planID: plan.planID,
						taskID: item.taskID,
						media: media.media,
						fileSize: media.fileSize,
						fileType: media.fileType,
						mediaID: media.mediaID,
					};
					promise.push(saveFile(data));
				} else if (media._id && media.deleted && media.deleted === true) {
					const data = {
						fileName: media.mediaName,
						planID: plan.planID,
						taskID: item.taskID,
						media: media.media,
						fileSize: media.fileSize,
						fileType: media.fileType,
						mediaID: media.mediaID,
					};
					taskList[index].mediaList.splice(mediaIndex, 1);
					promise.push(deleteFile(data));
				}
			});
		});
		Promise.all(promise).then(results => {
			props.handleApiCall(
				url,
				{
					method: 'PUT',
					body: JSON.stringify(plan),
					headers: {
						'Content-Type': 'application/json',
					},
				},
				resp => {
					setSaving(1);
					props.updatePlanID({
						planID: resp.planID,
						parentPlanID: resp.parentPlanID ? resp.parentPlanID : '',
					});
					props.handleApiCall(
						`/api/plans/fetch/${encodeURIComponent(resp.planID)}`,
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
					props.savedPlan({ status: resp.planStatus });
					props.populatePlans();
				},
				error => {
					setSaving(-1);
					console.error(error);
				},
			);
		});
	};
	const togglePublishDialog = () => {
		setPublishDialog(!publishDialog);
	};
	const closePreview = () => {
		setPreview(false);
	};
	const publishPlan = () => {
		setRequest(0);
		const plan = props.mappedPlanState;
		const url =
			plan.status === PLAN_STATUS.EDIT_ACTIVE
				? `${PLAN_API.PUBLISH_EDIT}/${encodeURIComponent(plan.parentPlanID)}`
				: `${PLAN_API.PUBLISH}/${encodeURIComponent(plan.planID)}`;
		props.handleApiCall(
			url,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
			response => {
				setRequest(1);
				props.onPublish(plan.planID);
			},
			error => {
				setRequest(-1);
				console.error(error);
			},
		);
	};

	return (
		<LayoutComponent>
			<PublishComponent
				open={publishDialog}
				handleClose={togglePublishDialog}
				plan={props.mappedPlanState}
				complete={props.onPublish}
				publishPlan={publishPlan}
				request={request}
				setRequest={setRequest}
			/>
			{preview && (
				<PlanPreview
					request={request}
					setRequest={setRequest}
					exists={true}
					planID={props.mappedPlanState.planID}
					close={closePreview}
					complete={props.onPublish}
					publishPlan={publishPlan}
				/>
			)}
			<div>
				<Grid container spacing={1}>
					<Grid item xs={3} sm={3} md={4} lg={6}>
						<span onClick={props.close} className={classes.leftButton}>
							<ArrowBackIos className={classes.arrow} />
							<span className={classes.heading1}>Update Pre-boarding Plan</span>
						</span>
					</Grid>

					<Grid item xs={9} sm={9} md={8} lg={6}>
						<div className={classes.menuBox}>
							<div className={classes.preview} onClick={() => setPreview(true)}>
								<IconButton color="inherit">
									<PlayCircleOutline />
								</IconButton>
								<span>Preview Application</span>
							</div>
							<Button
								variant="outlined"
								disabled={saving === 0 || !props.mappedPlanState.unsavedChanges}
								className={classes.outlinedBtn}
								onClick={savePlan}
							>
								Save as draft
							</Button>
							<Button
								variant="contained"
								color="primary"
								size="small"
								className={classes.button}
								disabled={
									request === 0 ||
									!props.mappedPlanState.planID ||
									props.mappedPlanState.unsavedChanges
								}
								onClick={togglePublishDialog}
							>
								Publish
							</Button>
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<LayoutComponent className={classes.container}>
							<TaskListContainer />
						</LayoutComponent>
					</Grid>

					<Grid item xs={12} sm={12} md={8}>
						<DndProvider backend={HTML5Backend}>
							{render && <EditTaskContainer createField={props.createField} />}
						</DndProvider>
					</Grid>
				</Grid>
			</div>
		</LayoutComponent>
	);
};

export default EditPlan;
