import { v4 } from 'uuid';
import { EDIT_PAGE_TITLE } from '../actions/constants';
import ACTIONS from '../actions';

const DEFAULT_VALUES = {
	pageName: 'Page Title',
	fields: [],
	change: false,
};

const addOnPageReducer = (currentState = DEFAULT_VALUES, action) => {
	const newState = { ...currentState, deleteMediaError: '' };
	switch (action.type) {
		case EDIT_PAGE_TITLE:
			return { ...currentState, pageName: action.payload };

		case ACTIONS.UPDATE_ADD_ON_PAGE_HEADING:
			return {
				...newState,
				unsavedChanges: true,
				pageName: action.value,
			};

		case ACTIONS.MOVE_FIELD_DOWN_ADD_ON_PAGE: {
			const { fields } = currentState;
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1 && fields.length >= 2 && fieldIndex !== fields.length - 1) {
				const field = fields[fieldIndex];
				fields[fieldIndex] = fields[fieldIndex + 1];
				fields[fieldIndex + 1] = field;
			}
			return {
				...newState,
				unsavedChanges: true,
				fields,
			};
		}
		case ACTIONS.MOVE_FIELD_UP_ADD_ON_PAGE: {
			const { fields } = currentState;
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1 && fields.length >= 2 && fieldIndex !== 0) {
				const field = fields[fieldIndex];
				fields[fieldIndex] = fields[fieldIndex - 1];
				fields[fieldIndex - 1] = field;
			}
			return {
				...newState,
				unsavedChanges: true,
				fields,
			};
		}
		case ACTIONS.CLONE_FIELD_ADD_ON_PAGE: {
			const { fields } = currentState;
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1) {
				const field = {
					...fields[fieldIndex],
					fieldID: v4(),
				};
				fields.push(field);
			}
			return {
				...newState,
				unsavedChanges: true,
				fields,
			};
		}
		case ACTIONS.DELETE_FIELD_ADD_ON_PAGE: {
			const fields = currentState.fields.filter(field => field.fieldID !== action.fieldID);
			return {
				...newState,
				unsavedChanges: true,
				fields,
			};
		}
		case ACTIONS.CREATE_FIELD_ADD_ON_PAGE: {
			let { fields } = currentState;
			if (action.fieldID) {
				const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
				fields = [
					...fields.slice(0, fieldIndex + 1),
					{
						fieldID: v4(),
						fieldType: action.fieldType,
						fieldLabel: '',
						fieldContent: '',
					},
					...fields.slice(fieldIndex + 1),
				];
			} else {
				fields = [
					...fields,
					{
						fieldID: v4(),
						fieldType: action.fieldType,
						fieldLabel: '',
						fieldContent: '',
					},
				];
			}
			return {
				...newState,
				unsavedChanges: true,
				fields,
			};
		}
		case ACTIONS.EDIT_FIELD_CONTENT_ADD_ON_PAGE: {
			const { fields } = currentState;
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1) {
				fields[fieldIndex].fieldContent = action.content;
			}
			return {
				...newState,
				unsavedChanges: true,
				fields,
			};
		}
		case ACTIONS.EDIT_FIELD_LABEL_ADD_ON_PAGE: {
			const { fields } = currentState;
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1) {
				fields[fieldIndex].fieldLabel = action.label;
			}
			return {
				...newState,
				unsavedChanges: true,
				fields,
			};
		}
		case ACTIONS.SELECT_FIELD_ADD_ON_PAGE: {
			return {
				...newState,
				selectedField: action.fieldID,
			};
		}
		case ACTIONS.UPDATE_PAGE_ID: {
			return {
				...newState,
				pageID: action.pageID,
				parentPageID: action.parentPageID,
			};
		}

		case ACTIONS.INIT_PAGE: {
			const { page } = action;
			if (page.pageType === 'PREONBOARDING') {
				return {
					pageID: page.pageID,
					pageVersion: page.pageVersion || 0,
					pageName: page.pageName,
					pageType: page.pageType || 'PREONBOARDING',
					status: page.status,
					parentPageID: page.parentPageID,

					// mediaList: page.mediaList,
					watch: false,
					description: page.description,
					change: false,

					deleteMediaError: '',
				};
			}
			return {
				...action.page,
			};
		}
		case ACTIONS.SAVE_PAGE_CHANGES: {
			return {
				...newState,
				unsavedChanges: false,
			};
		}
		default:
			return currentState;
	}
};

export default addOnPageReducer;
