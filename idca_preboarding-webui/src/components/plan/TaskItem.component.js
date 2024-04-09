import React, { useRef, memo, useMemo, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { makeStyles, ListItem, ListItemText } from '@material-ui/core';

import { Apps as FocusIcon, ArrowRightAlt as SelectedIcon } from '@material-ui/icons';
import clsx from 'clsx';

import itemTypes from '../common/fieldComponents/itemTypes';

const useStyles = makeStyles(theme => ({
	taskNameBucket: {
		display: 'flex',
		alignItems: 'center',
		borderRadius: 5,
		padding: '3px 10px',
		'&:hover': {
			cursor: 'grab',
		},
		'&:focus': {
			cursor: 'grabbing',
		},
		clear: 'right',
	},
	opacity0: {
		boxShadow: '0 2px 20px 0 rgba(205, 209, 226, 0.8)',
		opacity: 1,
	},
	icon: {
		color: '#adb0cb',
	},
	focusIcon: {
		color: 'white',
	},
	selectedIcon: {
		color: '#041f41',
		marginLeft: 10,
	},
	previewIcon: {
		display: 'flex',
		width: 1,
		height: 1,
	},
	listItem: {
		...theme.typography.common,
		cursor: 'pointer',
		backgroundColor: '#ffffff',
		opacity: '0.6',
		borderRadius: '8px',
		boxShadow: '0 1px 2px 1px rgba(0, 0, 0, 0.15)',
		marginBottom: '16px',
		height: '56px',
		'&:hover': {
			opacity: '1',
			backgroundColor: '#f0f2f8',
		},
	},
	listItemSelected: {
		opacity: '1',
		backgroundColor: '#041f41',
		borderRadius: '8px',
		boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.15)',
		color: '#ffffff',
	},
}));

const TaskItem = ({ taskName = 'Enter Task Name', moveCard, taskID, selected, select }) => {
	const ref = useRef(null);
	const classes = useStyles();
	const [{ isDragging }, connectDrag, preview] = useDrag({
		item: { id: taskID, type: itemTypes.TaskName },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	const [, connectDrop] = useDrop({
		accept: itemTypes.TaskName,
		hover({ id: draggedId }) {
			if (draggedId !== taskID) {
				moveCard(draggedId, taskID);
			}
		},
	});
	connectDrop(ref);
	connectDrag(ref);
	const classToUse = clsx(classes.taskNameBucket, { [classes.opacity0]: isDragging });
	const className = useMemo(() => classToUse, [isDragging]);
	const observed = useRef(true);
	const executeScroll = scrollParam => {
		// scrollParam.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
	};
	useEffect(
		() => {
			if (selected && observed.current) {
				executeScroll(observed.current);
			}
		},
		[selected],
	);
	return (
		<ListItem
			ref={observed}
			className={clsx(classes.listItem, {
				[classes.listItemSelected]: selected,
			})}
			onClick={() => select({ taskID })}
		>
			<div className={className} ref={ref}>
				<ListItemText
					primary={taskName}
					// secondary="July 20, 2014"
				/>
			</div>
			<div ref={preview} className={classes.previewIcon} />
		</ListItem>
	);
};

export default memo(TaskItem);
