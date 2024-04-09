import React, { useState } from 'react';
import { makeStyles, TextField, FormControl, FormGroup } from '@material-ui/core';
import { Http as Icon } from '@material-ui/icons';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import { InputBox } from './Input.component';
import itemTypes from './itemTypes';
import { PLAN_PLACEHOLDERS } from '../../../config/planConstants';

const useStyles = makeStyles({
	blocks: {
		padding: 10,
		cursor: 'pointer',
		textAlign: 'center',
	},

	contentSmallBold: {
		color: '#000000',
	},
	charCounter: {
		marginLeft: '95%',
		fontSize: '14px',
	},
	link: {
		fontWeight: '600',
		paddingBottom: '1.5vw',
	},
});

const URLIcon = props => {
	const classes = useStyles();
	const [, connectDrag] = useDrag({
		item: { type: itemTypes.URL },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className={classes.blocks} ref={connectDrag} {...props}>
			<div>
				<Icon />
			</div>
			<div>Website URL</div>
		</div>
	);
};

const URLField = props => {
	const { label, content, editContent, editLabel, fieldID } = props;
	const classes = useStyles();

	return (
		<FormGroup>
			<InputBox
				id="label"
				className={classes.margin}
				placeholder={PLAN_PLACEHOLDERS.LABEL_TEXT_PLACEHOLDER}
				label={PLAN_PLACEHOLDERS.LABEL_TEXT_PLACEHOLDER}
				value={label}
				maxLength={30}
				onChange={e => editLabel({ label: e.target.value, fieldID })}
			/>
			<InputBox
				id="url"
				className={classes.margin}
				placeholder={PLAN_PLACEHOLDERS.URL_PLACEHOLDER}
				label={PLAN_PLACEHOLDERS.URL_PLACEHOLDER}
				value={content}
				defaultValue={content}
				onChange={e => editContent({ content: e.target.value, fieldID })}
			/>
		</FormGroup>
	);
};
const URLStyles = makeStyles({
	linkStyle: {
		color: '#041f41',
		textDecoration: 'none',
		width: 'fit-content',
		paddingTop: 16,
		display: 'inline-block',
	},
	contentSmallLink: {
		fontFamily: 'Helvetica',
		fontSize: '14px',
		fontWeight: 'normal',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.43',
		letterSpacing: 'normal',
		color: '#041f41',
	},
});
const URLDisplay = props => {
	const { label, content } = props;
	const classes = URLStyles();
	return (
		<>
			<a
				className={clsx(classes.contentSmallLink, classes.linkStyle, props.className)}
				href={content}
				target="_blank"
				rel="noopener noreferrer"
			>
				{label}
			</a>
		</>
	);
};

export { URLIcon, URLField, URLDisplay };
