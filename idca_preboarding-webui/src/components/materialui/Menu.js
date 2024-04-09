import React from 'react';
import { Menu, withStyles } from '@material-ui/core';

export default withStyles({
	paper: {
		boxShadow: '0 2px 20px 0 rgba(205, 209, 226, 0.8)',
		border: 'none',
		borderRadius: 5,
		color: '#9497ac',
		padding: '0px 20px',
	},
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));
