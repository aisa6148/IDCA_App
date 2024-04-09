import { GET_ALL_LIBRARIES, GET_ALL_LIBRARIES_SUCCESS } from '../actions/constants';
import { INITIAL_VALUE } from '../store/constants';

export default (state = INITIAL_VALUE, action) => {
	switch (action.type) {
		case GET_ALL_LIBRARIES:
			return { ...state, isLoading: action.payload };
		case GET_ALL_LIBRARIES_SUCCESS:
			return { ...state, isLoading: false, libraries: action.payload };
		default:
			return state;
	}
};
