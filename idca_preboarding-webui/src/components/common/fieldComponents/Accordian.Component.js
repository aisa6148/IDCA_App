import React, { useState } from 'react';
import { makeStyles, TextField, FormControl, FormGroup } from '@material-ui/core';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import itemTypes from './itemTypes';
import { PLAN_PLACEHOLDERS } from '../../../config/planConstants';
import AccordianIcon from '../../../containers/icons/AccordianIcon';
import AccordianDisplay from './AccordianDisplay';
import { InputBox } from './Input.component';

const useStyles = makeStyles(theme => ({
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
	charCounter: {
		marginLeft: '95%',
		fontSize: '14px',
	},
	header: {
		fontWeight: '600',
		paddingBottom: '1.5vw',
	},
	contentSmallBold: {
		...theme.custom.contentSmallBold,
	},
}));

const Accordian = props => {
	const classes = useStyles();
	const [, connectDrag] = useDrag({
		item: { type: itemTypes.Accordian },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className={classes.blocks} ref={connectDrag} {...props}>
			<div>
				<AccordianIcon />
			</div>
			<div>Accordian</div>
		</div>
	);
};

const AccordianField = props => {
	const { label, content, editContent, editLabel, fieldID } = props;
	const classes = useStyles();
	const [charLimitTitle, setCharLimitTitle] = useState(120);
	const [charLimitContent, setCharLimitContent] = useState(500);
	return (
		<FormGroup>
			<FormControl fullWidth className={classes.margin} variant="outlined">
				<span className={classes.header}> Accordian </span>
				<InputBox
					id="label"
					placeholder={PLAN_PLACEHOLDERS.ACCORDIAN_TITLE}
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
					inputLabelProps={{
						shrink: true,
					}}
					value={label}
				/>
				<div className={classes.charCounter}>
					{label.length}/{charLimitTitle}
				</div>
			</FormControl>

			<FormControl fullWidth className={classes.margin} variant="outlined">
				<InputBox
					rows={4}
					rowsMax={4}
					multiline
					variant="outlined"
					aria-label="maximum height"
					placeholder={PLAN_PLACEHOLDERS.TEXT_TEXT_PLACEHOLDER}
					defaultValue={content}
					value={content}
					onChange={e => editContent({ content: e.target.value, fieldID })}
					inputProps={{
						maxLength: 500,
					}}
				/>
				<div className={classes.charCounter}>
					{content.length}/{charLimitContent}
				</div>
			</FormControl>
		</FormGroup>
	);
};

const AccordianStyles = makeStyles({
	paragraphIndent: {
		margin: 0,
	},
	label: {
		color: '#041f41',
		paddingTop: 16,
	},
	content: {
		color: '#46474a',
	},
	containerReadOnlyStyle: {
		margin: 0,
		borderWidth: 0,
	},
	contentSmallBold: {
		fontFamily: 'Helvetica',
		fontSize: '14px',
		fontWeight: 'normal',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.43',
		letterSpacing: 'normal',
		color: '#46474a',
	},
});

export { Accordian, AccordianField };
