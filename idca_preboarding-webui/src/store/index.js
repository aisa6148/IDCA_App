import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const middlewares = [ReduxThunk];
// add logger if itse running in localhost
if (window.location.host.includes('localhost:')) {
	middlewares.push(logger);
}
/* eslint no-underscore-dangle: 0 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	/* preloadedState, */ composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
