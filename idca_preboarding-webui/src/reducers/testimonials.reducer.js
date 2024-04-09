import {
	CLEAR_TESTIMONIALS_LIST,
	GET_TESTIMONIALS_LIST_SUCCESS,
	ADD_NEW_TESTIMONIAL,
	SELECTED_TESTIMONIALSID,
	REMOVE_SELECTED_DATA,
	ADD_TO_APPLICATION,
} from '../actions/constants';

const DEFAULT_VALUE = {
	isLoading: false,
	testimonials: [],
	enabledCount: 0,
	testimonialsID: new Set(),
};

const testimonialsReducer = (state = DEFAULT_VALUE, action) => {
	switch (action.type) {
		case GET_TESTIMONIALS_LIST_SUCCESS:
			return {
				...state,
				testimonials: action.payload.testimonials,
				enabledCount: action.payload.enabledCount,
			};
		case CLEAR_TESTIMONIALS_LIST:
			return { ...state, testimonials: [] };
		case ADD_NEW_TESTIMONIAL:
			return { ...state, result: action.payload };
		case SELECTED_TESTIMONIALSID:
			return { ...state, testimonialsID: action.payload };
		case REMOVE_SELECTED_DATA:
			return { ...state, deleteResult: action.payload };
		case ADD_TO_APPLICATION:
			return { ...state, addResult: action.payload };
		default:
			return state;
	}
};

export default testimonialsReducer;
