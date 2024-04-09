import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
	element: {
		height: 134,
		width: 243,
		borderRadius: 10,
		boxShadow: ' 0 2px 10px 0 rgba(205, 209, 226, 0.3)',
		backgroundColor: 'white',
		padding: 20,
		'&:hover': {
			transform: 'scale(1.04)',
		},
	},
}));

const Tile = props => {
	const classes = useStyles();
	return (
		<div
			className={clsx(classes.element, props.className)}
			onClick={props.onClick}
			onContextMenu={props.onContextMenu}
		>
			{props.children}
		</div>
	);
};

export default Tile;
