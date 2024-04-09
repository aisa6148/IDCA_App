import React, { useState } from 'react';
import { makeStyles, TextField, FormControl, FormGroup } from '@material-ui/core';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import { Title as Icon } from '@material-ui/icons';
import itemTypes from './itemTypes';
import { PLAN_PLACEHOLDERS } from '../../../config/planConstants';
import { InputBox } from './Input.component';

const useStyles = makeStyles({
	blocks: {
		padding: 10,
		cursor: 'pointer',
		textAlign: 'center',
	},
	paragraphIndent: {
		margin: 0,
	},
	label: {
		color: '#041f41',
		paddingTop: 16,
	},

	contentSmallBold: {
		color: '#000000',
	},
	charCounter: {
		marginLeft: '95%',
		fontSize: '14px',
	},
});

const TitleIcon = props => {
	const classes = useStyles();
	const [, connectDrag] = useDrag({
		item: { type: itemTypes.Title },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className={classes.blocks} ref={connectDrag} {...props}>
			<div>
				<Icon />
			</div>
			<div>Title</div>
		</div>
	);
};

const TitleField = props => {
	const { label, editLabel, fieldID } = props;
	const classes = useStyles();
	const [charLimit, setCharLimit] = useState(120);
	return (
		<FormGroup>
			<FormControl fullWidth className={classes.margin} variant="outlined">
				<InputBox
					id="label"
					label={PLAN_PLACEHOLDERS.TITLE_TEXT_PLACEHOLDER}
					placeholder={PLAN_PLACEHOLDERS.TITLE_TEXT_PLACEHOLDER}
					variant="outlined"
					color="secondary"
					onChange={e => editLabel({ label: e.target.value, fieldID })}
					inputProps={{
						className: clsx(
							classes.contentSmallBold,
							classes.paragraphIndent,
							classes.label,
						),
						maxLength: 120,
					}}
					value={label}
				/>
				<div className={classes.charCounter}>
					{label.length}/{charLimit}
				</div>
			</FormControl>
		</FormGroup>
	);
};

export { TitleIcon, TitleField };
