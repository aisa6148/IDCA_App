import { EDIT_PAGE_TITLE } from './constants';
import ACTIONS from './index';

// export const editPageTitleSuccess = title => ({
// 	type: EDIT_PAGE_TITLE,
// 	payload: title,
// });
export const updateHeading = args => {
	return {
		type: ACTIONS.UPDATE_ADD_ON_PAGE_HEADING,
		value: args,
	};
};
export const updatePageID = args => {
	return {
		type: ACTIONS.UPDATE_PAGE_ID,
		...args,
	};
};
export const moveFieldUp = args => {
	return {
		type: ACTIONS.MOVE_FIELD_UP_ADD_ON_PAGE,
		...args,
	};
};
export const moveFieldDown = args => {
	return {
		type: ACTIONS.MOVE_FIELD_DOWN_ADD_ON_PAGE,
		...args,
	};
};
export const deleteField = args => {
	return {
		type: ACTIONS.DELETE_FIELD_ADD_ON_PAGE,
		...args,
	};
};
export const cloneField = args => {
	return {
		type: ACTIONS.CLONE_FIELD_ADD_ON_PAGE,
		...args,
	};
};
export const editLabel = args => {
	return {
		type: ACTIONS.EDIT_FIELD_LABEL_ADD_ON_PAGE,
		...args,
	};
};
export const editContent = args => {
	return {
		type: ACTIONS.EDIT_FIELD_CONTENT_ADD_ON_PAGE,
		...args,
	};
};
export const createField = args => {
	return {
		type: ACTIONS.CREATE_FIELD_ADD_ON_PAGE,
		...args,
	};
};
export const selectField = args => {
	return {
		type: ACTIONS.SELECT_FIELD_ADD_ON_PAGE,
		...args,
	};
};
export const initPage = args => {
	return {
		type: ACTIONS.INIT_PAGE,
		...args,
	};
};
export const savedPage = args => {
	return {
		type: ACTIONS.SAVE_PAGE_CHANGES,
		...args,
	};
};
export const initPreboardingPage = args => {
	return {
		type: ACTIONS.INIT_EMPTY_PREBOARDING_PAGE,
		...args,
	};
};

// export default editPageTitleSuccess;
