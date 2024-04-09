import React, { useState, forwardRef } from 'react';
import { makeStyles, Slide } from '@material-ui/core';
import { Backup, DeleteOutlined as DeleteIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { formatBytes } from '../../utilities/function.utilities';
import { InputBox } from '../common/fieldComponents/Input.component';

const useStyles = makeStyles(theme => ({
	dropZone: {
		maxWidth: '674px',
		maxHeight: '344px',
		borderRadius: '30px',
		margin: 'auto',
		textAlign: 'center',
		minHeight: '120px',
		minWidth: '180px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingBottom: '30px',
		cursor: 'pointer',
	},
	dropZoneSelectedFile80: {
		height: '80%',
	},
	dropZoneSelectedFile50: {
		height: '50%',
	},
	dropZoneHighlightsolid: {
		border: 'solid 2px #041f41',
	},
	dropZoneHighlightdashed: {
		border: 'dashed 2px #041f41',
	},
	backupicon: {
		width: '48px',
		height: ' auto',
		color: '#041f41',
		paddingTop: '30px',
		paddingBottom: '5px',
		margin: '0px auto',
	},
	uploadText: {
		fontFamily: 'Bogle',
		fontSize: '16px',
		fontWeight: 'bold',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		textAlign: 'center',
		color: '#1e2c77',
		cursor: 'pointer',
		'& span': {
			color: '#041f41',
		},
	},
	uploadedFile: {
		maxWidth: '408px',
		height: '55px',
		boxShadow: '0 2px 10px 0 rgba(205, 209, 226, 0.3)',
		margin: '10px auto',
		borderRadius: '25px',
		position: 'relative',
		background: '#041f41',
	},
	uploadedFileIsNotSuccess: {
		backgroundColor: 'rgba(237, 59, 41, 0.1)',
		border: 'solid 1px #ed3b29',
	},
	uploadedFileIsSuccess: {
		backgroundColor: '#041f41',
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
	fileText: {
		position: 'absolute',
		top: '10px',
		fontFamily: 'Bogle',
		fontSize: '14px',
		fontWeight: 'bold',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		color: '#ffffff',
		maxWidth: 'calc(100% - 90px)',
		marginLeft: '25px',
	},
	fileTextError: {
		color: '#000000',
	},
	errorFileDownloaded: {
		paddingRight: '10px',
		color: '#ed3b29',
	},
	fileSize: {
		color: '#9497ac',
		fontWeight: 'normal',
	},
	noWrap: {
		...theme.custom.noWrap,
	},
	FileInput: {
		...theme.custom.FileInput,
	},
	contentSmall: {
		...theme.custom.contentSmall,
	},
	margin: {
		margin: '20px 0px',
	},
	labelInput: {
		color: '#74767c !important',
		'&.MuiFormLabel-root.Mui-focused': {
			color: '#74767c !important',
		},
	},
}));

const AddMedia = props => {
	const classes = useStyles();
	const [highlight, setHighlight] = useState(false);
	const [isSuccess, setIsSuccess] = useState(undefined);
	const [isUploading, setIsUploading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { selectedMedia } = props;
	const fileInputRef = React.createRef();
	const onDragOver = event => {
		event.preventDefault();
		if (props.disabled) {
			return;
		}
		setHighlight(true);
	};

	const onDrop = event => {
		event.preventDefault();
		if (isUploading) {
			return;
		}
		const files = event.dataTransfer.files[0];
		uploadHandler(files);
	};
	const uploadHandler = files => {
		if (files.size > 5242880) {
			setIsSuccess(false);
			setIsUploading(false);
			setHighlight(false);
			setErrorMsg(' [File Size exceeded, max size: 5mb]');
			return;
		}
		setErrorMsg('');
		setIsSuccess(true);
		setIsUploading(false);
		setHighlight(false);
		const data = {
			...selectedMedia,
			fileName: files.name,
			planID: props.planID,
			media: files,
			fileSize: files.size,
			fileType: files.type,
		};
		props.addFile(data);
	};
	const changeName = name => {
		const data = {
			...selectedMedia,
			fileName: name,
		};
		props.addFile(data);
	};
	const openFileDialog = event => {
		event.stopPropagation();
		fileInputRef.current.click();
	};
	const onDragLeave = () => {
		setHighlight(false);
	};
	const onFilesAdded = event => {
		if (isUploading) {
			return;
		}
		if (event.target.files.length > 0) {
			const files = event.target.files[0];
			uploadHandler(files);
		}
	};
	const removeFile = () => {
		const fileInput = fileInputRef;
		fileInput.current.value = '';
		setErrorMsg('');
		setIsSuccess(undefined);
		setIsUploading(false);
		props.removeFile(selectedMedia);
	};
	return props.fieldID !== '' ? (
		<div>
			<div
				className={clsx(
					classes.dropZone,
					{ [classes.dropZoneSelectedFile80]: !selectedMedia },
					{ [classes.dropZoneSelectedFile50]: selectedMedia },
					{ [classes.dropZoneHighlightsolid]: highlight },
					{ [classes.dropZoneHighlightdashed]: !highlight },
				)}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
				onClick={openFileDialog}
			>
				<Backup className={classes.backupicon} />
				<div className={classes.uploadText}>Drag & Drop or Browse</div>
			</div>
			<input
				ref={fileInputRef}
				id="FileInput"
				className={classes.FileInput}
				type="file"
				// multiple
				// accept=".xls,.xlsx,.csv"
				onChange={onFilesAdded}
				hidden
			/>
			{selectedMedia && selectedMedia.fileSize && (
				<div
					className={clsx(
						classes.uploadedFile,
						{ [classes.uploadedFileIsNotSuccess]: isSuccess === false },
						{
							[classes.uploadedFileIsSuccess]: isSuccess || isSuccess === undefined,
						},
					)}
				>
					<span
						className={clsx(classes.fileText, {
							[classes.fileTextError]: isSuccess === false,
						})}
					>
						<div className={classes.noWrap}>{selectedMedia.fileName}</div>
						<div>
							<span className={classes.fileSize}>
								{formatBytes(selectedMedia.fileSize, 1)}
							</span>
							{isSuccess === false ? (
								<span className={classes.errorFileDownloaded}>{errorMsg}</span>
							) : (
								''
							)}
						</div>
					</span>
					<DeleteIcon className={classes.deleteIcon} onClick={removeFile} />
				</div>
			)}

			<InputBox
				id="label"
				className={classes.margin}
				placeholder={'Media File Name'}
				label={'Media File Name'}
				value={selectedMedia.fileName ? selectedMedia.fileName : ''}
				error={selectedMedia.fileName && selectedMedia.fileName.length >= 40}
				onChange={e => changeName(e.target.value)}
			/>
		</div>
	) : (
		''
	);
};

export default AddMedia;
