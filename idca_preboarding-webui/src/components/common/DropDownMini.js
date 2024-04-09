import React from 'react';
import { FormControl, Select, MenuItem, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	selectDropDown: {
		borderBottom: 'none',
		fontSize: '14px',
		fontWeight: 'normal',
		color: '#9497ac',
		top: -3,
		'&::before': {
			borderBottom: 'none',
			'&:hover': {
				borderBottom: 'none',
				'&:before': {
					borderBottom: 'none',
				},
			},
		},
		'&::after': {
			borderBottom: 'none',
		},
	},
	dropDownIcon: {
		color: '#041f41',
	},
	contentSmallDropdown: {
		margin: '0 34px 0 0',
		fontFamily: 'Bogle',
		fontSize: '16px',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.5',
		letterSpacing: 'normal',
		color: '#2e2f32',
	},
}));

const DropDownMini = props => {
	const classes = useStyles();
	return (
		<FormControl className={clsx(classes.contentSmallDropdown, props.className)}>
			<Select
				id={props.id || 'training-selector'}
				value={props.value}
				onChange={event => {
					props.onChange(event.target.value);
				}}
				className={clsx(classes.selectDropDown, props.dropdownClassName)}
				classes={{
					icon: classes.dropDownIcon,
				}}
				placeholder={props.placeholder}
			>
				{props.options.map(option => (
					<MenuItem value={option} key={option}>
						<span className={clsx(props.fontDetails, classes.contentSmallDropdown)}>
							{option}
						</span>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default DropDownMini;
