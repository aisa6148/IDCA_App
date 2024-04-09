import React from 'react';
import { Route } from 'react-router';
import Dashboard from '../pages/Dashboard';
import PreboardingPlans from '../pages/PreboardingPlans';
import AddOnPage from '../pages/AddOnPage';
import FAQ from '../pages/FAQ';
import CovidProtocol from '../pages/CovidProtocol';
import { WalmartBenefits, PreboardingHome, MyDayOne, KnowAboutWalmart } from '../pages/UpdateApp';
import Main from '../components/Main';
import { paths } from './paths';
import Quiz from '../pages/Quiz';
import Broadcast from '../pages/Broadcast';

export const FormRoutes = ({
	component: Component,
	index,
	path,
	defaultPath,
	exact,
	...routeParams
}) => {
	return (
		<>
			<Route
				path={path}
				exact={!!exact}
				{...routeParams}
				render={props => (
					// pass the sub-routes down to keep nesting
					<Component
						{...props}
						key={exact ? `${path}exact1` : `${path}1`}
						{...routeParams}
					>
						{routeParams.routes &&
							routeParams.routes.map(r => (
								<FormRoutes
									{...r}
									key={r.exact ? `${r.path}exact` : `${r.path}notexact`}
								/>
							))}
					</Component>
				)}
			/>
		</>
	);
};

export const routes = [
	{
		path: '/',
		component: Main,
		routes: [
			{
				path: paths.dashboard.link,
				component: Dashboard,
				exact: true,
			},
			{
				path: paths.preboardingHome.link,
				component: PreboardingHome,
				exact: true,
			},
			{
				path: paths.myDayOne.link,
				component: MyDayOne,
				exact: true,
			},
			{
				path: paths.knowAboutWalmart.link,
				component: KnowAboutWalmart,
				exact: true,
			},
			{
				path: paths.walmartBenefits.link,
				component: WalmartBenefits,
				exact: true,
			},
			{
				path: paths.preboardingPlans.link,
				component: PreboardingPlans,
				exact: true,
			},
			{
				path: paths.addOnPage.link,
				component: AddOnPage,
				exact: true,
			},
			{
				path: paths.covidProtocol.link,
				component: CovidProtocol,
				exact: true,
			},
			{
				path: paths.FAQ.link,
				component: FAQ,
				exact: true,
			},
			{
				path: paths.Quiz.link,
				component: Quiz,
				exact: true,
			},
			{
				path: paths.Broadcast.link,
				component: Broadcast,
				exact: true,
			},
		],
	},
];
