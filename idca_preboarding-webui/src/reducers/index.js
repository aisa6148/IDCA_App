import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import testimonialsReducer from './testimonials.reducer';
import appStateReducer from './appState.reducer';
import addOnPageReducer from './addOnPage.reducer';
import planReducer from './plan.reducer';

export default combineReducers({
	homeReducer,
	testimonialData: testimonialsReducer,
	addOnPage: addOnPageReducer,
	appState: appStateReducer,
	routing,
	plan: planReducer,
});
