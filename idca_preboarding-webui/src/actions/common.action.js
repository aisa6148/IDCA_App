import { v4 } from 'uuid';

import ACTIONS from './index';
import { MESSAGES } from '../config/constants';

export const setLoading = args => {
	return {
		type: ACTIONS.SET_APP_LOADING,
		...args,
	};
};
export const unsetLoading = args => {
	return {
		type: ACTIONS.UNSET_APP_LOADING,
		...args,
	};
};
export const appendErrorMessage = (message, correlationID) => {
	return {
		type: ACTIONS.APPEND_ERROR_MESSAGE,
		message,
		correlationID,
	};
};
export const removeErrorMessage = id => {
	return {
		type: ACTIONS.REMOVE_ERROR_MESSAGE,
		id,
	};
};
export const appendSuccessMessage = message => {
	return {
		type: ACTIONS.APPEND_SUCCESS_MESSAGE,
		message,
	};
};
export const removeSuccessMessage = id => {
	return {
		type: ACTIONS.REMOVE_SUCCESS_MESSAGE,
		id,
	};
};
export const appendNotificationMessage = message => {
	return {
		type: ACTIONS.APPEND_NOTIFICATION_MESSAGE,
		message,
	};
};
export const removeNotificationMessage = id => {
	return {
		type: ACTIONS.REMOVE_NOTIFICATION_MESSAGE,
		id,
	};
};

export const apiCall = (url, options = {}) => {
	return fetch(url, {
		credentials: 'same-origin',
		method: 'get',
		...options,
		headers: {
			Accept: 'application/json, text/plain, */*',
			'x-corelation-id': v4(),
			...options.headers,
		},
	});
};

export const handleApiCall = (dispatch, url, options, successCallback, failureCallback) => {
	dispatch(setLoading(url));
	return apiCall(url, options)
		.then(response => {
			if (response.status === 403) {
				dispatch(appendErrorMessage('Forbidden', response.correlationID));
			}
			return response.json();
		})
		.then(response => {
			if (response.status === 'success') {
				if (response.message && response.display !== false) {
					dispatch(appendSuccessMessage(response.message));
				}
				successCallback(response);
			} else {
				if (response.message && response.display !== false) {
					dispatch(appendErrorMessage(response.message, response.correlationID));
				}
				failureCallback(response);
			}
		})
		.catch(error => {
			dispatch(appendErrorMessage(MESSAGES.SOMETHING_WENT_WRONG));
			console.error(error);
			failureCallback(error);
		})
		.finally(() => {
			dispatch(unsetLoading(url));
		});
};
export const handleApiCallBlob = (dispatch, url, options, successCallback, failureCallback) => {
	dispatch(setLoading(url));
	apiCall(url, { ...options, responseType: 'blob' })
		.then(response => {
			return response.blob();
		})
		.then(response => {
			successCallback(response);
		})
		.catch(error => {
			dispatch(appendErrorMessage(MESSAGES.SOMETHING_WENT_WRONG));
			failureCallback(error);
		})
		.finally(() => {
			dispatch(unsetLoading(url));
		});
};

export const checkStatus = async response => {
	if (response.status === 'success') {
		return Promise.resolve(response);
	}
	return Promise.reject(response);
};

export const fetchData = async (url, options = {}) => {
	let response = await apiCall(url, options);
	response = await response.json();
	return checkStatus(response);
};

export const handleMultipleApiCall = async (dispatch, apis) => {
	dispatch(setLoading(apis));
	try {
		return await Promise.all(
			apis.map(api => {
				return fetchData(api.url, api.options);
			}),
		);
	} catch (error) {
		dispatch(appendErrorMessage(MESSAGES.SOMETHING_WENT_WRONG));
		throw error;
	} finally {
		dispatch(unsetLoading(apis));
	}
};
