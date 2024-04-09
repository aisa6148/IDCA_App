import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core';

import store from './store/index';
import { routes, FormRoutes } from './routes';
import theme from './theme';
import ErrorBoundary from './components/common/ErrorBoundary';

const history = createBrowserHistory();

const App = () => {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<div>
						<ErrorBoundary>
							<Router history={history}>
								{routes.map(route => (
									<FormRoutes {...route} key={route.path} />
								))}
							</Router>
						</ErrorBoundary>
					</div>
				</Provider>
			</ThemeProvider>
		</div>
	);
};
App.propTypes = {
	store: PropTypes.object,
	history: PropTypes.object,
};

export default App;
