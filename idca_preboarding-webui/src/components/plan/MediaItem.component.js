import React, { memo } from 'react';
import { makeStyles, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

import clsx from 'clsx';

import { DeleteOutlined as DeleteIcon } from '@material-ui/icons';
import { formatBytes } from '../../utilities/function.utilities';

const useStyles = makeStyles(theme => ({
	listItem: {
		...theme.typography.common,
		cursor: 'pointer',
		// backgroundColor: '#fcfcfc',
		// opacity: '0.6',
		'&:hover': {
			opacity: '1',
			backgroundColor: '#f0f2f8',
		},
		marginTop: '10px',
	},
	listItemSelected: {
		opacity: '1',
		backgroundColor: '#f0f2f8',
	},
	deleteIcon: {
		position: 'absolute',
		right: '0px',
		top: '0px',
		margin: '16px',
		color: '#adb0cb',
		'&:hover': {
			color: 'red',
		},
	},
	contentSmallBold: {
		...theme.custom.contentSmallBold,
		color: '#000000',
		padding: '0',
		fontSize: '1rem',
		fontFamily: 'Bogle',
		fontWeight: '400',
		lineHeight: '1',
	},
}));

const MediaItem = ({
	mediaName = 'Enter Media Name',
	mediaID,
	contentSize,
	selected,
	selectedMedia,
	removeFile,
	selectMedia,
}) => {
	const classes = useStyles();
	const removeSelectedFile = () => {
		removeFile(selectedMedia);
	};
	return (
		<ListItem
			className={clsx(classes.listItem, {
				[classes.listItemSelected]: selected,
			})}
		>
			<ListItemText
				className={classes.contentSmallBold}
				primary={mediaName}
				secondary={formatBytes(contentSize, 1)}
			/>
			<DeleteIcon className={classes.deleteIcon} onClick={removeSelectedFile} />
		</ListItem>
	);
};

export default memo(MediaItem);
