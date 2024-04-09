import React from 'react';
import { Popper, Paper, ClickAwayListener, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	paper: {
		boxShadow: '0 2px 20px 0 rgba(205, 209, 226, 0.8)',
		borderRadius: 5,
		color: '#2e2f32',
		padding: '20px',
		margin: '10px -20px',
		position: 'relative',
		background: '#fff',
		'&::before': {
			position: 'absolute',
			content: 'close-quote',
			position: 'absolute',
			right: '40px',
			top: '-10px',
			borderTop: 'none',
			borderRight: '15px solid transparent',
			borderLeft: '15px solid transparent',
			borderBottom: '15px solid #fff',
		},
	},
});

const CustomMenu = props => {
	const classes = useStyles();
	return (
		<Popper transition {...props}>
			<Paper id="menu-list-grow" className={classes.paper}>
				<ClickAwayListener onClickAway={() => props.onClose()}>
					{props.children}
				</ClickAwayListener>
			</Paper>
		</Popper>
	);
};

export default CustomMenu;
