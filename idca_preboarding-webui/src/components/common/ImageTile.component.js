import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Tile from './Tile.component';

const useStyles = makeStyles(theme => ({
	element: {
		padding: 0,
		overflow: 'hidden',
		margin: '20px 90px',
		position: 'relative',
		border: '1px solid #9da0bb',
	},
	image: {
		height: 134,
		width: 243,
	},
	closeIcon: {
		position: 'absolute',
		top: 0,
		right: 0,
		background: 'white',
		borderRadius: '0px 0px 0px 8px',
		color: '#041f41',
	},
	centerText: {
		...theme.custom.centerText,
	},
}));

const ImageTile = props => {
	const classes = useStyles();
	return (
		<Tile className={clsx(classes.centerText, classes.element)}>
			<img alt="IssueImage" src={props.data} className={classes.image} />
			<Close className={classes.closeIcon} onClick={props.removeImage} />
		</Tile>
	);
};

export default ImageTile;
