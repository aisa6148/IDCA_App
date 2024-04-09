import React, { createRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import WAppBar from './appMain/AppBar.component';
import SideBar from './drawerMain/SideBar.component';
import ProgressBar from '../containers/common/ProgressBar.container';
import Notification from '../containers/common/Notifications.container';

const useStyles = makeStyles(theme => ({
	root: () => ({
		display: 'flex',
	}),
	content: {
		flexGrow: 1,
		marginTop: 60,
		height: 'calc(100vh - 60px)',
		overflow: 'hidden',
	},
}));

export default function Main(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const screenRef = createRef();
	const [dropdown, setDropdown] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(o => !o);
	};

	const handleDropDown = () => {
		setDropdown(!dropdown);
	};

	return (
		<>
			<>
				<div className={classes.root} id="root-screenshot" ref={screenRef}>
					<ProgressBar />
					<Notification />
					<CssBaseline />
					<WAppBar handleDrawerOpen={handleDrawerOpen} />
					<SideBar
						open={open}
						dropdown={dropdown}
						location={props.location}
						handleDropDown={handleDropDown}
					/>
					{/* {associateID && ( */}
					<main className={classes.content} key={'main'}>
						{props.children}
					</main>
					{/* )} */}
				</div>
			</>
			)
		</>
	);
}
