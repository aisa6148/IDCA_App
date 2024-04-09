import { v4 } from 'uuid';
import ACTIONS from '../actions';

const INITIAL_STATE = {
	authFailed: false,
	loading: 0,
	errorMessages: [],
	successMessages: [],
	notifications: [],
};

const fileReducer = (currentState = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case ACTIONS.SET_AUTH_FAILED:
			return {
				...currentState,
				authFailed: true,
			};
		case ACTIONS.SET_USER_DATA:
			return {
				...currentState,
				authFailed: false,
			};
		case ACTIONS.SET_APP_LOADING:
			return {
				...currentState,
				loading: currentState.loading + 1,
			};
		case ACTIONS.UNSET_APP_LOADING:
			return {
				...currentState,
				loading: currentState.loading > 1 ? currentState.loading - 1 : 0,
			};
		case ACTIONS.APPEND_ERROR_MESSAGE:
			return {
				...currentState,
				errorMessages: [
					...currentState.errorMessages,
					{
						id: v4(),
						message: action.message,
						correlationID: action.correlationID,
					},
				],
			};
		case ACTIONS.REMOVE_ERROR_MESSAGE:
			return {
				...currentState,
				errorMessages: currentState.errorMessages.filter(
					message => message.id !== action.id,
				),
			};
		case ACTIONS.APPEND_SUCCESS_MESSAGE:
			return {
				...currentState,
				successMessages: [
					...currentState.successMessages,
					{
						id: v4(),
						message: action.message,
					},
				],
			};
		case ACTIONS.REMOVE_SUCCESS_MESSAGE:
			return {
				...currentState,
				successMessages: currentState.successMessages.filter(
					message => message.id !== action.id,
				),
			};
		case ACTIONS.APPEND_NOTIFICATION_MESSAGE:
			return {
				...currentState,
				notifications: [
					...currentState.notifications,
					{
						id: v4(),
						message: action.message,
					},
				],
			};
		case ACTIONS.REMOVE_NOTIFICATION_MESSAGE:
			return {
				...currentState,
				notifications: currentState.notifications.filter(
					message => message.id !== action.id,
				),
			};
		default:
			return currentState;
	}
};
export default fileReducer;
