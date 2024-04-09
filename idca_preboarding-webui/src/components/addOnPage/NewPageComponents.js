import React from 'react';
import { makeStyles } from '@material-ui/core';
import { leftItems, rightItems } from './IconData';
import LeftRowComponents from './LeftRowComponents';
import RightRowComponents from './RightRowComponents';

const useStyles = makeStyles(theme => ({
	container: {
		...theme.typography.fontFamily,
		backgroundColor: '#ffffff',
		padding: '20px 15px 0 15px',
		width: '230px',
		height: '780px',
		borderRadius: '6px',
		textAlign: 'center',
	},
	iconRow: {
		width: '100%',
		paddingTop: '10px',
		display: 'flex',
		flexDirection: 'column',
	},
	iconColumn: {
		display: 'flex',
		flexDirection: 'row',
	},
	componentList: {
		marginLeft: '-5vw',
		fontWeight: '600',
	},
}));
export default function NewPageComponents(props) {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<span className={classes.componentList}>Components</span>
			<div className={classes.iconColumn}>
				<span className={classes.iconRow}>
					{leftItems.map(leftitem => (
						<LeftRowComponents
							createField={props.createField}
							key={leftitem.id}
							{...leftitem}
						/>
					))}
				</span>
				<span className={classes.iconRow}>
					{rightItems.map(rightItem => (
						<RightRowComponents
							createField={props.createField}
							key={rightItem.id}
							{...rightItem}
						/>
					))}
				</span>
			</div>
		</div>
	);
}
