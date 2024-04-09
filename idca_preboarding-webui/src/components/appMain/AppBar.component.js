import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import {
	Menu as MenuIcon,
	AccountCircle,
	NotificationsNone,
	HelpOutline,
} from '@material-ui/icons';
import GlobalTechGreenSpark from '../icons/GlobalTechGreenSpark';
import Menu from '../materialui/Menu';

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#041f41',
		boxShadow: 'none',
	},
	topBar: {
		padding: '0px',
		minHeight: 60,
	},
	w2w: {
		...theme.typography.common,
		margin: '0px 18px',
		fontSize: '18px',
		fontWeight: 900,
		letterSpacing: '0.58px',
		color: '#ffffff',
	},
	Preboarding: {
		'& h6': {
			...theme.typography.common,
			fontSize: '14px',
			lineHeight: '1.29',
			color: '#9497ac',
		},
		margin: '0px 18px',
	},
	noUnderline: {
		textDecoration: 'none',
	},
	userData: {
		position: 'absolute',
		right: 10,
		cursor: 'pointer',
	},
	userName: {
		...theme.typography.common,
		fontSize: 16,
		fontWeight: 'bold',
		lineHeight: 4,
		color: '#adb0cb',
		position: 'absolute',
		right: 10,
	},
	menuButton: {
		height: '24px',
		width: 'auto',
		margin: '18px',
		borderRadius: '100px',
		'&:hover': {
			height: '42px',
			width: 'auto',
			padding: '9px',
			margin: '9px',
			backgroundColor: 'rgba(175, 176, 202, 0.15)',
		},
		'&:active': {
			backgroundColor: 'rgba(175, 176, 202, 0.5)',
		},
	},
	linkBtn: {
		...theme.typography.common,
		fontWeight: 'bold',
		color: '#ffffff',
	},
	menuContainer: {
		maxWidth: 300,
	},
}));

const WAppBar = props => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const closeMenu = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.topBar}>
				{!props.hideMenuIcon && (
					<MenuIcon
						onClick={props.handleDrawerOpen}
						aria-label="open drawer"
						color="inherit"
						edge="start"
						className={classes.menuButton}
					/>
				)}
				<Typography variant="h6" noWrap className={classes.w2w}>
					W2W
				</Typography>
				<span>
					<GlobalTechGreenSpark size={30} />
				</span>
				<Typography variant="h6" noWrap className={classes.w2w}>
					Pre-Boarding Tool
				</Typography>
				<div className={classes.userName}>
					<span>Administrator</span>
					<IconButton
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
						<NotificationsNone />
					</IconButton>
					<IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
						<HelpOutline />
					</IconButton>
				</div>
				<Menu
					id="customized-menu2"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					keepMounted
					onClose={closeMenu}
					classes={{
						paper: classes.menuContainer,
					}}
				/>
			</Toolbar>
		</AppBar>
	);
};

export default WAppBar;
