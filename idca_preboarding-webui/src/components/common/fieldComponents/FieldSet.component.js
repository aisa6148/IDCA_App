import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
	FileCopy as CloneIcon,
	ArrowUpward as UpArrowIcon,
	ArrowDownward as DownArrowIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { useDrop } from 'react-dnd';
import itemTypes from './itemTypes';
import { TitleField } from './Title.component';
import { TextField } from './Text.component';
import { URLField } from './URL.component';
import { MediaLibraryField } from './MediaLibrary.component';
import { DividerField } from './Divider.component';
import { AccordianField } from './Accordian.Component';

const useStyles = makeStyles({
	container: {
		padding: '20px',
		margin: '0px 0px 25px 0px',
		background: 'white',
		boxShadow: '0 2px 10px 0 rgba(205, 209, 226, 0.3)',
		borderRadius: 6,
		'&:focus': {
			border: 'solid 1px #041f41;',
		},
		width: 'calc(100% - 67px)',
		minHeight: 150,
		display: 'inline-grid',
	},
	selectContainer: {
		border: 'solid 2px #041f41;',
		borderTopRightRadius: '0',
	},
	containerOptions: {
		width: '67px',
		background: '#041f41',
		color: '#b9bbc5',
		borderRadius: '0px 5px 5px 0px',
		padding: 8,
		float: 'right',
		marginTop: 0,
	},
	icons: {
		height: 18,
		width: 'auto',
	},
	iconBox: {
		borderRadius: '50%',
		alignItems: 'center',
		float: 'right',
		justifyContent: 'center',
		height: 24,
		width: 24,
		'&:hover': {
			background: 'rgba(13, 21, 60, 0.2)',
			cursor: 'pointer',
		},
	},
	belowDivActive: {
		height: 20,
		backgroundColor: 'rgba(6, 150, 248, 0.15)',
	},
});
const FieldSet = props => {
	const classes = useStyles();
	const {
		id,
		editLabel,
		editContent,
		selectField,
		highlightContainer,
		fieldID,
		fieldType,
		fieldLabel,
		fieldContent,
		mediaList,
	} = props;

	if (id !== fieldID) {
		throw new Error('mismatch in ID');
	}
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
		drop: item => props.createField({ fieldType: item.type, fieldID: id }),
		collect: monitor => ({
			isOver: monitor.isOver({ shallow: true }),
			canDrop: monitor.canDrop(),
		}),
	});
	let child;
	switch (fieldType) {
		case itemTypes.Title:
			child = (
				<TitleField
					label={fieldLabel}
					content={fieldContent}
					key={fieldID}
					editLabel={editLabel}
					editContent={editContent}
					fieldID={fieldID}
				/>
			);
			break;
		case itemTypes.Divider:
			child = (
				<DividerField
					label={fieldLabel}
					content={fieldContent}
					key={fieldID}
					editLabel={editLabel}
					editContent={editContent}
					fieldID={fieldID}
				/>
			);
			break;
		case itemTypes.ShortText:
			child = (
				<TextField
					label={fieldLabel}
					content={fieldContent}
					key={fieldID}
					editLabel={editLabel}
					editContent={editContent}
					fieldID={fieldID}
				/>
			);
			break;
		case itemTypes.URL:
			child = (
				<URLField
					label={fieldLabel}
					content={fieldContent}
					key={fieldID}
					editLabel={editLabel}
					editContent={editContent}
					fieldID={fieldID}
				/>
			);
			break;
		case itemTypes.Attachment:
			child = (
				<MediaLibraryField
					label={fieldLabel}
					content={fieldContent}
					key={fieldID}
					editLabel={editLabel}
					editContent={editContent}
					fieldID={fieldID}
					mediaList={mediaList}
					addFile={props.addMedia}
					removeFile={props.removeMedia}
					planID={props.planID}
				/>
			);
			break;
		case itemTypes.Accordian:
			child = (
				<AccordianField
					label={fieldLabel}
					content={fieldContent}
					key={fieldID}
					editLabel={editLabel}
					editContent={editContent}
					fieldID={fieldID}
				/>
			);
			break;
		default:
			break;
	}
	const active = isOver && canDrop;
	return (
		<div ref={connectDrop}>
			<div
				className={clsx(classes.container, {
					[classes.selectContainer]: highlightContainer,
				})}
				onClick={() => selectField({ fieldID: id })}
			>
				{child}
			</div>
			{highlightContainer && (
				<div className={classes.containerOptions}>
					<div
						className={classes.iconBox}
						onClick={() => props.moveFieldDown({ fieldID: id })}
					>
						<DownArrowIcon className={classes.icons} />
					</div>
					<div
						className={classes.iconBox}
						onClick={() => props.moveFieldUp({ fieldID: id })}
					>
						<UpArrowIcon className={classes.icons} />
					</div>
					<div
						className={classes.iconBox}
						onClick={() => props.deleteField({ fieldID: id })}
					>
						<DeleteIcon className={classes.icons} />
					</div>
					<div
						className={classes.iconBox}
						onClick={() => props.cloneField({ fieldID: id })}
					>
						<CloneIcon className={classes.icons} />
					</div>
				</div>
			)}
			<div className={clsx({ [classes.belowDivActive]: active })} />
		</div>
	);
};

export default FieldSet;
