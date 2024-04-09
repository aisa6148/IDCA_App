import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import {
	GroupAddOutlined as GroupAddOutlinedIcon,
	PostAddOutlined as PostAddOutlinedIcon,
} from '@material-ui/icons';
import Drawer from '../materialui/Drawer';
import { paths } from '../../routes/paths';
import { Keys } from './keysConstants';

const drawerWidth = '200px';
const useStyles = makeStyles(theme => ({
	root: () => ({
		display: 'flex',
	}),
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		marginTop: 60,
		whiteSpace: 'nowrap',
		backgroundColor: '#041f41',
		height: '100vh - 60px',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: '60px',
	},
	dropdown: {
		...theme.typography.common,
		padding: 0,
		fontsize: '14px',
		color: '#ffffff',
		paddingLeft: theme.spacing(8),
		'&:hover': {
			color: '#06f27b',
			marginRight: 0,
		},
	},
	menus: {
		...theme.typography.common,
		fontsize: '14px',
		color: '#ffffff',
		borderRadius: '0px 100px 100px 0px',
		'&:hover': {
			backgroundColor: '#041f41',
			color: '#06f27b',
			marginLeft: 0,
		},
	},
	menus1: {
		...theme.typography.common,
		fontsize: '14px',
		padding: 1,
		color: '#ffffff',
		borderRadius: '0px 100px 100px 0px',
		'&:hover': {
			backgroundColor: '#041f41',
			color: '#06f27b',
			marginLeft: 0,
		},
	},
	listIcon: {
		minWidth: 44,
		color: 'inherit',
	},
	list: {
		marginRight: 10,
		fontWeight: 'normal',
	},
	selected: {
		color: '#06f27b',
	},
	listItemText: {
		'& .MuiListItemText-primary': {
			fontWeight: 'normal',
		},
	},
	noUnderline: {
		textDecoration: 'none',
	},
}));

const SideBar = props => {
	const classes = useStyles();
	const location = props.location.pathname;
	const { open, handleDropDown } = props;

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}
		>
			<List className={classes.list}>
				<Link className={classes.noUnderline} to={paths.preboardingHome.link}>
					<ListItem
						button
						disableRipple
						key={Keys.PREBOARDINGHOME}
						className={clsx(classes.menus, {
							[classes.selected]: location.startsWith(paths.preboardingHome.link),
						})}
					>
						<ListItemIcon className={classes.listIcon}>
							<PostAddOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary={'Update App.'} className={classes.listItemText} />
					</ListItem>
				</Link>
				<Link className={classes.noUnderline} to={paths.preboardingPlans.link}>
					<ListItem
						button
						disableRipple
						key={Keys.PLAN}
						className={clsx(classes.menus, {
							[classes.selected]: location.startsWith(paths.preboardingPlans.link),
						})}
					>
						<ListItemIcon className={classes.listIcon}>
							<PostAddOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary={'Plan'} className={classes.listItemText} />
					</ListItem>
				</Link>

				<ListItem
					button
					disableRipple
					key={'Pages'}
					className={clsx(classes.menus, {
						[classes.selected]: location.startsWith('/pages'),
					})}
					onClick={handleDropDown}
				>
					<ListItemIcon className={classes.listIcon}>
						<PostAddOutlinedIcon />
					</ListItemIcon>
					<ListItemText primary={Keys.PAGES} className={classes.listItemText} />
				</ListItem>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List className={classes.dropdown}>
						<Link className={classes.noUnderline} to={paths.addOnPage.link}>
							<ListItem
								button
								disableRipple
								key={Keys.ALLPAGES}
								className={clsx(classes.menus1, {
									[classes.selected]: location.startsWith(paths.addOnPage.link),
								})}
							>
								<ListItemText
									primary={'All Pages'}
									className={classes.listItemText}
								/>
							</ListItem>
						</Link>

						<Link className={classes.noUnderline} to={paths.myDayOne.link}>
							<ListItem
								button
								disableRipple
								key={Keys.POSITIONING}
								className={clsx(classes.menus1, {
									[classes.selected]: location.startsWith(paths.myDayOne.link),
								})}
							>
								<ListItemText
									primary={'Positioning'}
									className={classes.listItemText}
								/>
							</ListItem>
						</Link>
					</List>
				</Collapse>
				{/* these are the quiz and broadcast page  */}
				<Link className={classes.noUnderline} to={paths.Quiz.link}>
					<ListItem
						button
						disableRipple
						key={Keys.QUIZ}
						className={clsx(classes.menus, {
							[classes.selected]: location.startsWith(paths.Quiz.link),
						})}
					>
						<ListItemIcon className={classes.listIcon}>
							<GroupAddOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary={'Quiz'} className={classes.listItemText} />
					</ListItem>
				</Link>

				<Link className={classes.noUnderline} to={paths.Broadcast.link}>
					<ListItem
						button
						disableRipple
						key={Keys.BROADCAST}
						className={clsx(classes.menus, {
							[classes.selected]: location.startsWith(paths.Broadcast.link),
						})}
					>
						<ListItemIcon className={classes.listIcon}>
							<PostAddOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary={'Broadcast'} className={classes.listItemText} />
					</ListItem>
				</Link>
			</List>
		</Drawer>
	);
};

export default SideBar;
