import React, { useState, useRef } from 'react';
import {
	Button,
	makeStyles,
	Checkbox,
	FormControl,
	FormGroup,
	TextField,
	FormControlLabel,
} from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { TextIcon } from '../common/fieldComponents/Text.component';
import { URLIcon } from '../common/fieldComponents/URL.component';
import { MediaLibraryIcon } from '../common/fieldComponents/MediaLibrary.component';
import itemTypes from '../common/fieldComponents/itemTypes';
import CustomMenu from '../materialui/CustomMenu';
import FieldComponent from '../../containers/plan/Field.container';
import EmptyDropComponent from '../../containers/plan/EmptyDrop.container';
import { InputBox } from '../common/fieldComponents/Input.component';
import { PLAN_PLACEHOLDERS } from '../../config/planConstants';

const stringMaxLength = 100;
const useStyles = makeStyles(theme => ({
	container: {
		padding: '10px 30px 0px 30px',
		height: 'calc(100vh - 120px)',
	},
	addContentsButton: {
		...theme.typography.common,
		height: 20,
		color: '#041f41',
	},
	addContentsMenuGridContainer: {
		...theme.typography.common,
		fontSize: 12,
		fontWeight: 'normal',
		display: 'inline-grid',
		gridTemplateColumns: 'auto auto',
	},
	inlineHeading: {
		display: 'inline-flex',
		margin: '0px 30px 0px 0px',
		verticalAlign: 'middle',
	},
	miniInput: {
		width: 100,
		display: 'inline-flex',
		marginLeft: '20px',
	},
	formContainer: {
		padding: '20px',
		margin: '5px 0px',
		background: '#ffffff',
		boxShadow: '0 2px 10px 0 rgba(205, 209, 226, 0.3)',
		borderRadius: 5,
		'&:focus': {
			border: 'solid 1px #041f41;',
		},
		width: '60%',
		// width: 'calc(100% - 500px)',
		display: 'inline-grid',
	},
	formContainer1: {
		padding: '20px',
		margin: '5px 0px',
		background: '#ffffff',
		boxShadow: '0 2px 10px 0 rgba(205, 209, 226, 0.3)',
		borderRadius: 5,
		'&:focus': {
			border: 'solid 1px #041f41;',
		},
		// width: 'calc(100% - 66px)',
		minHeight: 150,
		display: 'inline-grid',
	},
	margin: {
		margin: 10,
	},
	rightButtons: {
		width: '50%',
		// float: 'right',
		marginRight: 28,
		alignItems: 'center',
		display: 'flex',
		// width: 'calc(100% - 48px)',
		// minHeight: 150,
		flexDirection: 'row-reverse',
	},
	divContainer: {
		display: 'flex',
		width: '100%',
		marginBottom: '20px',
	},
	formControlLabel: {
		fontSize: '14px',
		fontWeight: 'normal',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.43',
		letterSpacing: 'normal',
		color: '#46474a',
	},
	labelInput: {
		'&.MuiFormLabel-root.Mui-focused': {
			color: '#74767c !important',
		},
	},
}));

const EditTask = props => {
	const classes = useStyles();
	const { taskList, selectedTask } = props.mappedPlanState;
	const [contentsMenu, setContentsMenu] = useState(false);
	const [contentRef, setContentsRef] = useState(undefined);

	const selectedTaskIndex = taskList.findIndex(val => val.taskID === selectedTask);

	function handleContentsMenuClose() {
		setContentsMenu(false);
	}

	const updateTaskHeading = heading => {
		props.updateTask({
			taskID: props.mappedPlanState.selectedTask,
			properties: {
				taskName: heading,
			},
		});
	};
	const updateDuration = duration => {
		props.updateTask({
			taskID: props.mappedPlanState.selectedTask,
			properties: duration,
		});
	};
	const updateForceCompleteOnEdit = forceCompleteOnEdit => {
		props.updateTask({
			taskID: props.mappedPlanState.selectedTask,
			properties: {
				forceCompleteOnEdit:
					taskList[selectedTaskIndex].mandatory &&
					forceCompleteOnEdit.forceCompleteOnEdit,
			},
		});
	};
	const updateMandatory = mandatory => {
		props.updateTask({
			taskID: props.mappedPlanState.selectedTask,
			properties: mandatory,
		});
		if (mandatory && !mandatory.mandatory) {
			// param mandatory => { mandatory: boolean }
			updateForceCompleteOnEdit({ forceCompleteOnEdit: false });
		}
	};

	const truncateString = (str, num) => {
		const res = str.slice(0, num); // slice string up to num
		let finalRes = res;
		// If 'num' (max-length) is <=3 then, append '...'
		if (num <= 3) {
			finalRes = `${res}...`;
		} else if (str.length <= num) {
			// If 'str' length is less than 'num' then, return 'str' as it is
			finalRes = str;
		} else if (str.length > num) {
			// If 'str' length is greater than 'num' then slice the string upto max-length and 3 more characters to accomodate '...'
			finalRes = `${res.slice(0, res.length - 3)}...`;
		}
		return finalRes;
	};

	return (
		<div className={classes.container}>
			<div className={classes.divContainer}>
				<FormGroup className={classes.formContainer}>
					<InputBox
						placeholder={PLAN_PLACEHOLDERS.TASK_NAME_PLACEHOLDER}
						label={PLAN_PLACEHOLDERS.TASK_NAME_PLACEHOLDER}
						value={truncateString(
							taskList[selectedTaskIndex].taskName,
							stringMaxLength,
						)}
						onChange={e => updateTaskHeading(e.target.value)}
					/>
				</FormGroup>
				<div className={classes.rightButtons}>
					<Button
						onClick={() => setContentsMenu(true)}
						ref={f => setContentsRef(f)}
						variant="text"
						className={classes.addContentsButton}
					>
						+ Add Component
					</Button>
				</div>
				<DndProvider backend={HTML5Backend}>
					<CustomMenu
						id="contents-menu"
						anchorEl={contentRef}
						open={contentsMenu}
						onClose={handleContentsMenuClose}
					>
						<div className={classes.addContentsMenuGridContainer}>
							<TextIcon
								onClick={() =>
									props.createField({ fieldType: itemTypes.ShortText })
								}
							/>
							<URLIcon
								onClick={() => props.createField({ fieldType: itemTypes.URL })}
							/>
							<MediaLibraryIcon
								onClick={() =>
									props.createField({ fieldType: itemTypes.Attachment })
								}
							/>
						</div>
					</CustomMenu>
				</DndProvider>
			</div>
			<EmptyDropComponent empty={taskList[selectedTaskIndex].fields.length === 0} />
			{taskList[selectedTaskIndex].fields.map((field, i) => {
				return (
					<FieldComponent
						key={field.fieldID}
						index={i}
						id={field.fieldID}
						selectedTaskIndex={selectedTaskIndex}
					/>
				);
			})}
			{taskList[selectedTaskIndex].fields.length > 0 && (
				<FormGroup className={classes.formContainer1}>
					<FormControl fullWidth className={classes.margin} variant="outlined">
						<FormControlLabel
							control={
								<Checkbox
									checked={!!taskList[selectedTaskIndex].mandatory}
									onChange={event =>
										updateMandatory({ mandatory: event.target.checked })
									}
									inputProps={{
										'aria-label': `${
											!taskList[selectedTaskIndex].mandatory ? 'Not ' : ''
										}Mandatory to be Completed`,
									}}
								/>
							}
							label={
								<span className={classes.formControlLabel}>
									Mandatory to be completed
								</span>
							}
						/>
					</FormControl>
					<FormControl fullWidth className={classes.margin} variant="outlined">
						<span className={classes.inlineHeading}>
							<span>Duration</span>
							<TextField
								value={taskList[selectedTaskIndex].duration}
								className={classes.miniInput}
								id="outlined-secondary"
								variant="outlined"
								color="secondary"
								onChange={event => updateDuration({ duration: event.target.value })}
								inputProps={{
									step: 1,
									min: 1,
									max: 365,
									type: 'number',
									// 'aria-labelledby': 'input-slider',
								}}
							/>
						</span>
					</FormControl>
				</FormGroup>
			)}
		</div>
	);
};

export default EditTask;
