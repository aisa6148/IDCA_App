import axios from 'axios';
import {
	CLEAR_TESTIMONIALS_LIST,
	GET_TESTIMONIALS_LIST_SUCCESS,
	ADD_NEW_TESTIMONIAL,
	SELECTED_TESTIMONIALSID,
	REMOVE_SELECTED_DATA,
	ADD_TO_APPLICATION,
} from './constants';

export const getTestimonialsSuccess = (testimonials, enabledCount) => ({
	type: GET_TESTIMONIALS_LIST_SUCCESS,
	payload: {
		testimonials,
		enabledCount,
	},
});

export const addNewTestimonials = result => ({
	type: ADD_NEW_TESTIMONIAL,
	payload: result,
});

export const addToApplicationSelectedTestimonial = addResult => ({
	type: ADD_TO_APPLICATION,
	payload: addResult,
});

export const selectedTestimonialIDs = testimonialsID => ({
	type: SELECTED_TESTIMONIALSID,
	payload: testimonialsID,
});

export const removeSelectedTestimonial = deleteResult => ({
	type: REMOVE_SELECTED_DATA,
	payload: deleteResult,
});

export const clearTestimonials = () => ({ type: CLEAR_TESTIMONIALS_LIST });

export const getTestimonialsData = () => async dispatch => {
	await axios
		.get(`/api/testimonials/list`)
		.then(response => {
			dispatch(getTestimonialsSuccess(response.data.testimonials));
		})
		.catch(error => {
			console.error(error);
			dispatch(clearTestimonials());
		});
};

export const postTestimonialsData = data => async dispatch => {
	const url = '/api/testimonials/add';
	const myJson = JSON.parse(data);
	return axios
		.post(url, myJson, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			dispatch(addNewTestimonials('success'));
		})
		.catch(error => {
			console.error(error);
			dispatch(addNewTestimonials('failure'));
		});
};

export const removeTestimonialsID = testimonialIDs => async dispatch => {
	const testIds = testimonialIDs.values();
	const first = testIds.next();
	const { value } = first;
	const url = `/api/testimonials/delete-testimonials/${value}`;
	await axios
		.delete(url, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			dispatch(removeSelectedTestimonial('Success'));
			dispatch(selectedTestimonialIDs(new Set()));
			dispatch(getTestimonialsData());
		})
		.catch(error => {
			console.error(error);
			dispatch(removeSelectedTestimonial('failure'));
		});
};

export const addToApplicationTestimonialID = (testimonialIDs, flag) => async dispatch => {
	const testIds = testimonialIDs.values();
	const first = testIds.next();
	const { value } = first;
	const url = `/api/testimonials/update-testimonials/${value}`;

	await axios
		.put(
			url,
			{ enabled: flag },
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
		)
		.then(response => {
			dispatch(addToApplicationSelectedTestimonial('success'));
			dispatch(selectedTestimonialIDs(new Set()));
			dispatch(getTestimonialsData());
		})
		.catch(error => {
			console.error(error);
			dispatch(addToApplicationSelectedTestimonial('failure'));
		});
};
