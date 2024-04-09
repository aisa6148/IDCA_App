import React, { createRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Tile from './Tile.component';

const useStyles = makeStyles(theme => ({
	dropZone: {
		maxWidth: '500px',
		maxHeight: '444px',
		borderRadius: '10px',
		marginTop: '30px',
		marginLeft: '5%',
		margin: 'auto',
		textAlign: 'center',
		minHeight: '200px',
		minWidth: '400px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingBottom: '30px',
		cursor: 'pointer',
		border: 'dashed 1px #041f41',
	},
	placeholdericon: {
		width: '48px',
		height: ' auto',
		color: '#041f41',
		paddingTop: '30px',
		paddingBottom: '5px',
		margin: '0px auto',
	},
	heading2: {
		...theme.custom.heading2,
	},
	noWrap: {
		...theme.custom.noWrap,
	},
	centerText: {
		...theme.custom.centerText,
	},
}));

const AddMedia = props => {
	const classes = useStyles();
	const fileInputRef = createRef();
	const openFileDialog = event => {
		event.stopPropagation();
		fileInputRef.current.click();
	};
	const getBase64 = (file, cb) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function() {
			cb(reader.result);
		};
		reader.onerror = function(error) {
			console.error('Error: ', error);
		};
	};
	const onFilesAdded = event => {
		event.stopPropagation();
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			getBase64(file, result => {
				props.uploadImage(result);
			});
		}
	};

	return (
		<Tile className={clsx(classes.centerText, classes.dropZone)} onClick={openFileDialog}>
			<input
				ref={fileInputRef}
				id="FileInput"
				className="FileInput"
				type="file"
				accept=".png,.jpg,.jpeg"
				onChange={onFilesAdded}
				hidden
			/>
			<img src={'/placeholder.png'} className={classes.placeholdericon} alt="" />
			<div className={clsx(classes.heading2, classes.noWrap)}>Upload Image</div>
		</Tile>
	);
};

export default AddMedia;
