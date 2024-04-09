import React, { useState, useEffect } from 'react';
import { makeStyles, List, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import {
	AddCircleOutline as AddIcon,
	FileCopy as CloneIcon,
	ArrowUpward as UpArrowIcon,
	ArrowDownward as DownArrowIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TaskItem from './TaskItem.component';
import { InputBox } from '../common/fieldComponents/Input.component';
import { PLAN_PLACEHOLDERS } from '../../config/planConstants';

const useStyles = makeStyles(theme => ({
	editIcons: {
		color: '#041f41',
		margin: '2px 10px',
		float: 'right',
		fontSize: '1.2rem',
		'&:hover': {
			cursor: 'pointer',
			color: '#adb0cb',
		},
		[theme.breakpoints.down('md')]: {
			margin: '2px 5px',
			fontSize: '1.1rem',
		},
	},
	editIconsDelete: {
		'&:hover': {
			color: '#ed3b29',
		},
	},
	heading: {
		margin: '20px 0px',
	},
	listContainer: {
		overflow: 'auto',
		height: 'calc(100vh - 450px)',
		[theme.breakpoints.down('md')]: {
			overflow: 'initial',
		},
	},
	taskList: {
		width: '100%',
		padding: '0px 5px',
		border: 'none',
		backgroundColor: '#ffffff',
	},
	noRecords: {
		...theme.typography.common,
		fontSize: '14px',
		fontWeight: 'normal',
		color: '#605e63',
		padding: '18px 18px 120px 18px',
	},
	margin: {
		margin: '20px 0px',
	},
	heading2: {
		...theme.custom.heading2,
	},
	labelInput: {
		color: '#74767c !important',
		'&.MuiFormLabel-root.Mui-focused': {
			color: '#74767c !important',
		},
	},
}));

const TaskList = props => {
	const classes = useStyles();
	const [shouldRender, setShouldRender] = useState(false); // To avoid unnecessary render
	const { taskList, planName, selectedTask } = props.mappedPlanState;
	let pendingUpdateFn;
	let requestedFrame;

	const drawFrame = () => {
		const from = pendingUpdateFn.cardIndex;
		const to = pendingUpdateFn.afterIndex;
		props.moveTaskList({ from, to });
		pendingUpdateFn = undefined;
		requestedFrame = undefined;
	};
	const moveCard = (id, afterID) => {
		const cardIndex = taskList.findIndex(val => {
			if (val.taskID === id) {
				return true;
			}
			return false;
		});
		const afterIndex = taskList.findIndex(val => {
			if (val.taskID === afterID) {
				return true;
			}
			return false;
		});
		pendingUpdateFn = {
			cardIndex,
			afterIndex,
		};
		if (!requestedFrame) {
			requestedFrame = requestAnimationFrame(drawFrame);
		}
	};
	useEffect(() => {
		setShouldRender(true);
		return () => {
			if (requestedFrame !== undefined) {
				cancelAnimationFrame(requestedFrame);
			}
		};
	}, []);
	return (
		<div>
			<InputBox
				className={classes.margin}
				// autoFocus
				placeholder="Plan Name"
				label="Plan Name"
				value={planName}
				maxLength={20}
				onChange={e => props.updatePlanHeading(e.target.value)}
			/>
			<Divider />
			<div className={classes.heading}>
				<span className={classes.heading2}>Tasks</span>
				<span>
					<DeleteIcon
						className={clsx(classes.editIcons, classes.editIconsDelete)}
						onClick={() => {
							props.deleteTask({ taskID: selectedTask });
						}}
					/>
					<DownArrowIcon
						className={classes.editIcons}
						onClick={() => {
							props.moveTaskDown({ taskID: selectedTask });
						}}
					/>
					<UpArrowIcon
						className={classes.editIcons}
						onClick={() => {
							props.moveTaskUp({ taskID: selectedTask });
						}}
					/>
					<CloneIcon
						className={classes.editIcons}
						onClick={() => {
							props.cloneTask({ taskID: selectedTask });
						}}
					/>
					<AddIcon
						className={classes.editIcons}
						onClick={() => {
							props.addTask({ taskID: selectedTask });
						}}
					/>
				</span>
			</div>

			<div className={classes.listContainer}>
				<DndProvider backend={HTML5Backend}>
					<List className={classes.taskList}>
						{taskList.length === 0 && (
							<Typography className={classes.noRecords}>No task available</Typography>
						)}
						{shouldRender &&
							taskList.length > 0 &&
							taskList.map((task, i) => (
								<TaskItem
									taskName={
										task.taskName
											? task.taskName
											: PLAN_PLACEHOLDERS.TASK_NAME_PLACEHOLDER
									}
									key={task.taskID}
									taskID={task.taskID}
									moveCard={moveCard}
									select={props.select}
									selected={selectedTask === task.taskID}
								/>
							))}
					</List>
				</DndProvider>
			</div>
		</div>
	);
};

export default TaskList;
