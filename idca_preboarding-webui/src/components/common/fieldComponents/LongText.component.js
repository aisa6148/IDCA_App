import React from 'react';
import { makeStyles, TextField, FormControl, FormGroup } from '@material-ui/core';
import { Notes as Icon } from '@material-ui/icons';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import itemTypes from './itemTypes';
import { PLAN_PLACEHOLDERS } from '../../../config/planConstants';

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
	margin: {
		margin: 10,
	},
	contentSmallBold: {
		...theme.custom.contentSmallBold,
	},
}));

const LongTextIcon = props => {
	const classes = useStyles();
	const [, connectDrag] = useDrag({
		item: { type: itemTypes.LongText },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className={classes.blocks} ref={connectDrag} {...props}>
			<div>
				<Icon />
			</div>
			<div>Long Text</div>
		</div>
	);
};

const LongTextField = props => {
	const { label, content, editContent, editLabel, fieldID } = props;
	const classes = useStyles();

	return (
		<FormGroup>
			<FormControl fullWidth className={classes.margin} variant="outlined">
				<TextField
					id="label"
					placeholder={PLAN_PLACEHOLDERS.LONG_TEXT_TITLE_PLACEHOLDER}
					variant="outlined"
					color="secondary"
					onChange={e => editLabel({ label: e.target.value, fieldID })}
					InputProps={{
						className: clsx(
							classes.contentSmallBold,
							classes.paragraphIndent,
							classes.label,
						),
					}}
					InputLabelProps={{
						shrink: true,
					}}
					value={label}
				/>
			</FormControl>
			<FormControl fullWidth className={classes.margin} variant="outlined">
				<TextField
					rows={4}
					rowsMax={4}
					multiline
					variant="outlined"
					aria-label="maximum height"
					placeholder={PLAN_PLACEHOLDERS.TEXT_TEXT_PLACEHOLDER}
					defaultValue={content}
					value={content}
					onChange={e => editContent({ content: e.target.value, fieldID })}
				/>
			</FormControl>
		</FormGroup>
	);
};

const longTextStyles = makeStyles({
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

const LongTextDisplay = props => {
	const { content, label } = props;
	const classes = longTextStyles();
	return (
		<div>
			<p className={clsx(classes.contentSmallBold, classes.paragraphIndent, classes.label)}>
				{label}
			</p>
			<p className={clsx(classes.contentSmallBold, classes.paragraphIndent, classes.content)}>
				{content}
			</p>
		</div>
	);
};

export { LongTextIcon, LongTextField, LongTextDisplay };
