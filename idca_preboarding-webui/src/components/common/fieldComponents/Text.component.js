import React from 'react';
import { makeStyles, FormGroup } from '@material-ui/core';
import { ShortText as Icon } from '@material-ui/icons';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
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
});

const TextIcon = props => {
	const classes = useStyles();
	const [, connectDrag] = useDrag({
		item: { type: itemTypes.ShortText },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className={classes.blocks} ref={connectDrag} {...props}>
			<div>
				<Icon />
			</div>
			<div>Text</div>
		</div>
	);
};

const TextField = props => {
	const { label, content, editLabel, editContent, fieldID } = props;
	const classes = useStyles();
	return (
		<FormGroup>
			<InputBox
				id="label"
				className={classes.margin}
				placeholder={PLAN_PLACEHOLDERS.TITLE_TEXT_PLACEHOLDER}
				label={PLAN_PLACEHOLDERS.TITLE_TEXT_PLACEHOLDER}
				value={label}
				maxLength={120}
				onChange={e => editLabel({ label: e.target.value, fieldID })}
			/>
			<InputBox
				rows={4}
				rowsMax={4}
				multiline
				id="content"
				className={classes.margin}
				placeholder={PLAN_PLACEHOLDERS.TEXT_TEXT_PLACEHOLDER}
				label={PLAN_PLACEHOLDERS.TEXT_TEXT_PLACEHOLDER}
				value={content}
				defaultValue={content}
				maxLength={350}
				onChange={e => editContent({ content: e.target.value, fieldID })}
			/>
		</FormGroup>
	);
};

const textStyles = makeStyles({
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

const TextDisplay = props => {
	const { content, label } = props;
	const classes = textStyles();
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

export { TextIcon, TextField, TextDisplay };
