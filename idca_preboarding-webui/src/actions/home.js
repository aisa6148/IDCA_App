/* eslint-disable import/prefer-default-export */
import { GET_ALL_LIBRARIES, GET_ALL_LIBRARIES_SUCCESS } from './constants';

const config = require('../config');

export const getAllLibraries = () => dispatch => {
	dispatch({
		type: GET_ALL_LIBRARIES,
	});
	console.log('config:-- ', config);
	setTimeout(() => {
		dispatch({
			type: GET_ALL_LIBRARIES_SUCCESS,
			payload: [
				{
					name: 'React Router',
					value: 'react-router',
				},
				{
					name: 'Redux',
					value: 'redux',
				},
				{
					name: 'Storybook',
					value: 'story-book',
				},
			],
		});
	}, 1000);
};
