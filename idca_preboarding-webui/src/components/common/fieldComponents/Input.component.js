import React, { useRef } from 'react';
import { makeStyles, TextField, FormControl, InputAdornment, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from 'clsx';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles({
	paragraphIndent: {
		margin: 0,
	},
	contentSmallBold: {
		color: '#000000',
	},
	charCounter: {
		marginLeft: '93%',
		fontSize: '14px',
		color: '#74767c',
	},
	formControl: {
		'&.MuiFormControl-root .MuiTextField-root': {
			borderRadius: '4px',
			border: 'solid 1px #909196',
		},
		'&.MuiFormControl-root .MuiFormLabel-filled': {
			backgroundColor: '#ffffff',
			color: '#000000',
			lineHeight: '.8',
			fontSize: '16px',
		},
		'&.MuiFormControl-root .Mui-focused': {
			backgroundColor: '#ffffff',
			color: '#74767c',
			lineHeight: '.8',
			fontSize: '16px',
		},
	},
});

const InputBox = props => {
	const {
		id,
		placeholder,
		label,
		value,
		onChange,
		maxLength,
		className,
		rows,
		rowsMax,
		multiline,
		autoFocus,
	} = props;
	const classes = useStyles();

	const textInput = useRef(null);
	const onFocus = () => {
		textInput.current.style.visibility = 'visible';
	};
	const onChangeValue = e => {
		e.target.value = '';
		onChange(e);
	};
	const handleClickAway = () => {
		textInput.current.style.visibility = 'hidden';
	};
	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<FormControl
				fullWidth
				variant="outlined"
				className={clsx(className, classes.formControl)}
			>
				<TextField
					autoFocus={autoFocus}
					rows={rows}
					rowsMax={rowsMax}
					multiline={multiline}
					id={id}
					placeholder={placeholder}
					variant="outlined"
					label={label}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					inputProps={{
						className: clsx(classes.contentSmallBold, classes.paragraphIndent),
						maxLength: maxLength,
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment
								ref={textInput}
								style={{ visibility: 'hidden' }}
								position="end"
							>
								<IconButton onClick={e => onChangeValue(e)}>
									<CancelIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{maxLength ? (
					<div className={classes.charCounter}>
						{value ? value.length : 0}/{maxLength}
					</div>
				) : (
					''
				)}
			</FormControl>
		</ClickAwayListener>
	);
};

export { InputBox };
