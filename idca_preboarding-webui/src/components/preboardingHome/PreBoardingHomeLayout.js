import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, IconButton, Grid, Button } from '@material-ui/core';
import { PlayCircleOutline } from '@material-ui/icons';
import Communication from './Communication';
import Testimonials from './testimonials/Testimonials';
import WhatsNew from './WhatsNew';
import Quiz from './Quiz';
import Layout from '../common/Layout.component';

const useStyles = makeStyles(theme => ({
	tabs: {
		flexGrow: 1,
		width: '50%',
		margin: '5px',
		backgroundColor: '#ffffff',
	},
	preview: {
		marginLeft: '25px',
	},
	heading1: {
		...theme.typography.heading1,
	},
	button: {
		...theme.overrides.MuiButton.containedPrimary,
	},
}));

export default function PreBoardingHomeLayout() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Layout>
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={9}>
						<p className={classes.heading1}>Update Pre-boarding App</p>
					</Grid>
					<Grid item xs={12} sm={2}>
						<div className={classes.preview}>
							<IconButton color="inherit">
								<PlayCircleOutline />
							</IconButton>
							<span>Preview Application</span>
						</div>
					</Grid>
					<Grid item xs={12} sm={1}>
						<Button
							variant="contained"
							color="primary"
							size="small"
							className={classes.button}
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</div>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				className={classes.tabs}
			>
				<Tab label="Communication" />
				<Tab label="Testimonials" />
				<Tab label="What's New" />
				<Tab label="Quiz" />
			</Tabs>
			{/* {Todo list} */}
			{value === 0 && <Communication />}
			{value === 1 && <Testimonials />}
			{value === 2 && <WhatsNew />}
			{value === 3 && <Quiz />}
		</Layout>
	);
}
