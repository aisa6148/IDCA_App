import { MenuItem, withStyles } from '@material-ui/core';

export default withStyles(theme => ({
	root: {
		...theme.typography.common,
		'&:focus': {
			backgroundColor: '#9497ac',
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
			'& div': {
				color: theme.palette.common.white,
			},
		},
		fontSize: 14,
		color: '#9497ac',
		padding: '10px',
		borderRadius: 5,
		minWidth: 200,
		margin: 0,
	},
}))(MenuItem);
