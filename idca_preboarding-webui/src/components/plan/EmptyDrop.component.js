import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import clsx from 'clsx';

import itemTypes from '../common/fieldComponents/itemTypes';

const useStyles = makeStyles({
	divNotActive: {
		height: 10,
	},
	divActive: {
		height: 20,
		backgroundColor: 'rgba(6, 150, 248, 0.15)',
	},
	fullScreen: {
		height: 'calc(100vh - 400px)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'Bogle',
		fontSize: '18px',
		fontWeight: 'normal',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: '1.56',
		letterSpacing: 'normal',
		textAlign: 'center',
		color: '#9497ac',
	},
	spanCustomMessage: {
		width: '30%',
		height: '40px',
		margin: '0px auto',
		fontSize: '14px',
		fontWeight: 'normal',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.43',
		color: '#2e2f32',
	},
});
const EmptyDrop = props => {
	const classes = useStyles();
	const [{ isOver, canDrop }, connectDrop] = useDrop({
		accept: [
			itemTypes.Dates,
			itemTypes.DropDown,
			itemTypes.Image,
			itemTypes.LongText,
			itemTypes.ShortText,
			itemTypes.TaskLibrary,
			itemTypes.URL,
			itemTypes.Upload,
			itemTypes.Video,
		],
		drop: item => props.createField({ fieldType: item.type, fieldID: -1 }),
		collect: monitor => ({
			isOver: monitor.isOver({ shallow: true }),
			canDrop: monitor.canDrop(),
		}),
	});
	const isActive = isOver && canDrop;
	return props.empty ? (
		<div
			ref={connectDrop}
			className={clsx(
				classes.divNotActive,
				{ [classes.divActive]: isActive },
				{ [classes.fullScreen]: props.empty },
			)}
		>
			{props.empty ? (
				<span className={classes.spanCustomMessage}>
					Drag and Drop or click Components to build the task details
				</span>
			) : (
				undefined
			)}
		</div>
	) : (
		''
	);
};

export default EmptyDrop;
