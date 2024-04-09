import ACTIONS from './index';

export const updatePlanHeading = args => {
	return {
		type: ACTIONS.UPDATE_PLAN_HEADING,
		value: args,
	};
};
export const updatePlanDescription = args => {
	return {
		type: ACTIONS.UPDATE_PLAN_DESCRIPTION,
		value: args,
	};
};
export const updatePlanID = args => {
	return {
		type: ACTIONS.UPDATE_PLAN_ID,
		...args,
	};
};
export const move = args => {
	return {
		type: ACTIONS.MOVE_TASK_LIST,
		...args,
	};
};
export const select = args => {
	return {
		type: ACTIONS.SELECT_TASK_IN_LIST,
		...args,
	};
};
export const selectMedia = args => {
	return {
		type: ACTIONS.SELECT_MEDIA_IN_LIST,
		...args,
	};
};
export const updateTask = args => {
	return {
		type: ACTIONS.UPDATE_TASK_PROPERTIES,
		...args,
	};
};

export const addTask = args => {
	return {
		type: ACTIONS.ADD_TASK_TO_PLAN,
		...args,
	};
};
export const deleteTask = args => {
	return {
		type: ACTIONS.DELETE_TASK_IN_PLAN,
		...args,
	};
};
export const moveTaskUp = args => {
	return {
		type: ACTIONS.MOVE_TASK_UP_PLAN,
		...args,
	};
};
export const moveTaskDown = args => {
	return {
		type: ACTIONS.MOVE_TASK_DOWN_PLAN,
		...args,
	};
};
export const cloneTask = args => {
	return {
		type: ACTIONS.CLONE_TASK_TO_PLAN,
		...args,
	};
};
export const moveFieldUp = args => {
	return {
		type: ACTIONS.MOVE_FIELD_UP_PLAN,
		...args,
	};
};
export const moveFieldDown = args => {
	return {
		type: ACTIONS.MOVE_FIELD_DOWN_PLAN,
		...args,
	};
};
export const deleteField = args => {
	return {
		type: ACTIONS.DELETE_FIELD_PLAN,
		...args,
	};
};
export const cloneField = args => {
	return {
		type: ACTIONS.CLONE_FIELD_PLAN,
		...args,
	};
};
export const editLabel = args => {
	return {
		type: ACTIONS.EDIT_FIELD_LABEL_PLAN,
		...args,
	};
};
export const editContent = args => {
	return {
		type: ACTIONS.EDIT_FIELD_CONTENT_PLAN,
		...args,
	};
};
export const createField = args => {
	return {
		type: ACTIONS.CREATE_FIELD_PLAN,
		...args,
	};
};
export const selectField = args => {
	return {
		type: ACTIONS.SELECT_FIELD_PLAN,
		...args,
	};
};
export const initPreboardingPlan = args => {
	return {
		type: ACTIONS.INIT_EMPTY_PREBOARDING_PLAN,
		...args,
	};
};
export const initPlan = args => {
	return {
		type: ACTIONS.INIT_PLAN,
		...args,
	};
};
export const savedPlan = args => {
	return {
		type: ACTIONS.SAVE_PLAN_CHANGES,
		...args,
	};
};
export const addMedia = args => {
	return {
		type: ACTIONS.ADD_MEDIA,
		...args,
	};
};
export const removeMedia = args => {
	return {
		type: ACTIONS.REMOVE_MEDIA,
		...args,
	};
};
export const savedMedia = args => {
	return {
		type: ACTIONS.SAVED_MEDIA,
		args,
	};
};
export const deletedMedia = args => {
	return {
		type: ACTIONS.DELETED_MEDIA,
		args,
	};
};
export const deleteMediaFailed = message => {
	return {
		type: ACTIONS.DELETE_MEDIA_FAILED,
		message,
	};
};
