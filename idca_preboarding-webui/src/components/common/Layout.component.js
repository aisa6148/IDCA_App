import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
	element: {
		backgroundColor: '#f5f7fb',
		height: 'calc(100vh - 60px)',
		borderRadius: '10px',
		padding: 5,
		overflowY: 'auto',
		width: '100%',
		margin: 15,
	},
}));

const Layout = props => {
	const classes = useStyles();
	return (
		<div className={clsx(classes.element, props.className)} onClick={props.onClick}>
			{props.children}
		</div>
	);
};
export default Layout;
