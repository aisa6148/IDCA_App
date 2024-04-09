import React from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import { useDrag } from 'react-dnd';

import { RemoveIcon as Icon } from '@material-ui/icons/Remove';
import itemTypes from './itemTypes';

const useStyles = makeStyles({
	blocks: {
		padding: 10,
		cursor: 'pointer',
	},
	paragraphIndent: {
		margin: 0,
	},
	Divider: {
		marginTop: '25px',
	},
});

const DividerIcon = props => {
	const classes = useStyles();
	const [, connectDrag] = useDrag({
		item: { type: itemTypes.Divider },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className={classes.blocks} ref={connectDrag} {...props}>
			<div>
				<Icon />
			</div>
			<div>Divider</div>
		</div>
	);
};

const DividerField = () => {
	const classes = useStyles();
	return (
		<div>
			<span>Divider</span>
			<Divider className={classes.Divider} />
		</div>
	);
};

export { DividerIcon, DividerField };
