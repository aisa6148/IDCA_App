import React from 'react';
import { makeStyles, Chip, Avatar, FormGroup } from '@material-ui/core';
import { Attachment as Icon } from '@material-ui/icons';
import { useDrag } from 'react-dnd';
import itemTypes from './itemTypes';
import AddMedia from '../../plan/AddMedia.component';
import MediaItemComponent from '../../plan/MediaItem.component';

const useStyles = makeStyles({
	blocks: {
		padding: 10,
		cursor: 'pointer',
		textAlign: 'center',
	},
});

const MediaLibraryIcon = props => {
	const classes = useStyles();
	const [, connectDrag] = useDrag({
		item: { type: itemTypes.Attachment },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className={classes.blocks} ref={connectDrag} {...props}>
			<div>
				<Icon />
			</div>
			<div>Attchment</div>
		</div>
	);
};

const MediaLibraryField = props => {
	const { label, content, editContent, editLabel, fieldID, mediaList = [] } = props;
	const classes = useStyles();
	const selectedMedia =
		(mediaList && content && mediaList.find(m => m.mediaID === content)) || [];
	const addFile = data => {
		editLabel({ label: data.fileName, fieldID });
		props.addFile({ data, fieldID });
	};
	const removeFile = data => {
		editLabel({ label: '', fieldID });
		props.removeFile({ data, fieldID });
	};
	return (
		<>
			<FormGroup>
				{!selectedMedia._id ? (
					<AddMedia
						name=""
						fieldID={fieldID}
						selectedMedia={selectedMedia}
						addFile={addFile}
						removeFile={removeFile}
						planID={props.planID}
					/>
				) : (
					<MediaItemComponent
						mediaName={selectedMedia.mediaName}
						contentSize={selectedMedia.contentSize}
						mediaNumber={1}
						key={selectedMedia.mediaID}
						mediaID={selectedMedia.mediaID}
						selectedMedia={selectedMedia}
						removeFile={removeFile}
					/>
				)}
			</FormGroup>
		</>
	);
};

const MediaLibraryStyles = makeStyles({
	chipSection: {
		marginTop: '1rem',
		marginBottom: '1rem',
	},
});
const MediaLibraryDisplay = props => {
	const { label, content } = props;
	const classes = MediaLibraryStyles();

	return (
		<div className={classes.chipSection} key={content}>
			<Chip
				avatar={
					<Avatar>
						<Icon />
					</Avatar>
				}
				label={label}
				color="primary"
				onClick={props.onDownload}
				variant="outlined"
			/>
		</div>
	);
};
export { MediaLibraryIcon, MediaLibraryField, MediaLibraryDisplay };
