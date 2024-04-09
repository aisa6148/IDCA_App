import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PreBoardingHomeLayout from '../components/preboardingHome/PreBoardingHomeLayout';

const useStyles = makeStyles(theme => ({
	pages: {
		...theme.typography.pages,
	},
	PreboardingHome: {
		display: 'flex',
		fontSize: '1rem',
	},
}));

export const PreboardingHome = () => {
	const classes = useStyles();
	return (
		<div className={classes.PreboardingHome}>
			<PreBoardingHomeLayout />
		</div>
	);
};

export const WalmartBenefits = () => {
	const classes = useStyles();
	return (
		<div className={classes.pages}>
			<h3>Walmart Benefits</h3>
		</div>
	);
};

export const MyDayOne = () => {
	const classes = useStyles();
	return (
		<div className={classes.pages}>
			<h3>My Day One</h3>
		</div>
	);
};

export const KnowAboutWalmart = () => {
	const classes = useStyles();
	return (
		<div className={classes.pages}>
			<h3>Know About Walmart</h3>
		</div>
	);
};
