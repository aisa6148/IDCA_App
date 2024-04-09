import { v4 } from 'uuid';
import ACTIONS from '../actions';
import { PLAN_MESSAGES } from '../config/planConstants';
import { arraymove } from '../utilities/function.utilities';

const INITIAL_STATE = {
	planName: '',
	planType: 'PREONBOARDING',
	taskList: [],
	mediaList: [],
	watch: false,
	description: '',
	change: false,
	selectedTask: '',
	selectedMedia: '',
	deleteMediaError: '',
};

const planReducer = (currentState = INITIAL_STATE, action = {}) => {
	const newState = { ...currentState, deleteMediaError: '' };
	switch (action.type) {
		case ACTIONS.UPDATE_PLAN_HEADING:
			return {
				...newState,
				unsavedChanges: true,
				planName: action.value,
			};
		case ACTIONS.UPDATE_PLAN_DESCRIPTION:
			return {
				...newState,
				unsavedChanges: true,
				description: action.value,
			};
		case ACTIONS.TOGGLE_PLAN_WATCH:
			return {
				...newState,
				unsavedChanges: true,
				watch: !currentState.watch,
			};
		case ACTIONS.MOVE_TASK_LIST:
			return {
				...newState,
				unsavedChanges: true,
				taskList: arraymove(currentState.taskList, action.from, action.to),
			};
		case ACTIONS.SELECT_TASK_IN_LIST:
			return {
				...newState,
				unsavedChanges: true,
				selectedTask: action.taskID,
			};
		case ACTIONS.SELECT_MEDIA_IN_LIST:
			return {
				...newState,
				selectedMedia: action.mediaID,
			};
		case ACTIONS.ADD_TASK_TO_PLAN:
			let newTask;
			if (currentState.planType === 'PREONBOARDING') {
				newTask = {
					taskID: v4(),
					taskVersion: 0,
					taskName: '',
					fields: [],
					duration: 1,
					mandatory: false,
					forceCompleteOnEdit: false,
					mediaList: [],
				};
			} else {
				newTask = {};
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList: [...newState.taskList, newTask],
				selectedTask: newTask.taskID,
			};
		case ACTIONS.UPDATE_TASK_PROPERTIES: {
			const { taskList } = currentState;
			const index = taskList.findIndex(val => val.taskID === action.taskID);
			taskList[index] = {
				...taskList[index],
				...action.properties,
			};
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.CLONE_TASK_TO_PLAN: {
			const { taskList } = currentState;
			const taskToClone = JSON.parse(
				JSON.stringify(taskList.find(val => val.taskID === action.taskID)),
			);
			if (currentState.planType === 'PREONBOARDING') {
				taskToClone.fields = taskToClone.fields.map(field => {
					return {
						...field,
						fieldID: v4(),
					};
				});
			}
			taskToClone.taskID = v4();
			taskToClone.taskName = taskToClone.taskName ? `Copy Of ${taskToClone.taskName}` : '';
			taskList.push(taskToClone);
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.DELETE_TASK_IN_PLAN: {
			let { taskList } = currentState;
			let index = taskList.findIndex(val => val.taskID === action.taskID);
			taskList = taskList.filter(task => task.taskID !== action.taskID);

			if (taskList.length === 0) {
				if (currentState.planType === 'PREONBOARDING') {
					taskList = [
						{
							taskID: v4(),
							taskVersion: 0,
							taskName: '',
							fields: [],
							duration: 1,
							mandatory: false,
							forceCompleteOnEdit: false,
							mediaList: [],
						},
					];
				}
			}
			if (index >= taskList.length) {
				index = taskList.length - 1;
			}
			return {
				...newState,
				taskList,
				unsavedChanges: true,
				selectedTask: taskList[index].taskID,
			};
		}
		case ACTIONS.MOVE_TASK_UP_PLAN: {
			const { taskList } = currentState;
			const index = taskList.findIndex(val => val.taskID === action.taskID);
			if (index !== 0) {
				const task = taskList[index];
				taskList[index] = taskList[index - 1];
				taskList[index - 1] = task;
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.MOVE_TASK_DOWN_PLAN: {
			const { taskList } = currentState;
			const index = taskList.findIndex(val => val.taskID === action.taskID);
			if (index !== taskList.length - 1) {
				const task = taskList[index];
				taskList[index] = taskList[index + 1];
				taskList[index + 1] = task;
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.MOVE_FIELD_DOWN_PLAN: {
			const { taskList } = currentState;
			const taskIndex = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { fields } = taskList[taskIndex];
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1 && fields.length >= 2 && fieldIndex !== fields.length - 1) {
				const field = fields[fieldIndex];
				fields[fieldIndex] = fields[fieldIndex + 1];
				fields[fieldIndex + 1] = field;
				taskList[taskIndex].fields = fields;
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.MOVE_FIELD_UP_PLAN: {
			const { taskList } = currentState;
			const taskIndex = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { fields } = taskList[taskIndex];
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1 && fields.length >= 2 && fieldIndex !== 0) {
				const field = fields[fieldIndex];
				fields[fieldIndex] = fields[fieldIndex - 1];
				fields[fieldIndex - 1] = field;
				taskList[taskIndex].fields = fields;
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.CLONE_FIELD_PLAN: {
			const { taskList } = currentState;
			const taskIndex = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { fields } = taskList[taskIndex];
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
				taskList,
			};
		}
		case ACTIONS.DELETE_FIELD_PLAN: {
			const { taskList } = currentState;
			const taskIndex = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			taskList[taskIndex].fields = taskList[taskIndex].fields.filter(
				field => field.fieldID !== action.fieldID,
			);
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.CREATE_FIELD_PLAN: {
			const { taskList } = currentState;
			const taskIndex = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			let { fields } = taskList[taskIndex];
			if (action.fieldID) {
				const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
				fields = [
					...fields.slice(0, fieldIndex + 1),
					{
						fieldID: v4(),
						fieldType: action.fieldType,
						fieldLabel: '',
						fieldContent: undefined,
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
						fieldContent: undefined,
					},
				];
			}
			taskList[taskIndex].fields = fields;
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.EDIT_FIELD_CONTENT_PLAN: {
			const { taskList } = currentState;
			const taskIndex = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { fields } = taskList[taskIndex];
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1) {
				fields[fieldIndex].fieldContent = action.content;
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.EDIT_FIELD_LABEL_PLAN: {
			const { taskList } = currentState;
			const taskIndex = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { fields } = taskList[taskIndex];
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);
			if (fieldIndex !== -1) {
				fields[fieldIndex].fieldLabel = action.label;
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.SELECT_FIELD_PLAN: {
			return {
				...newState,
				selectedField: action.fieldID,
			};
		}
		case ACTIONS.UPDATE_PLAN_ID: {
			return {
				...newState,
				planID: action.planID,
				parentPlanID: action.parentPlanID,
			};
		}
		case ACTIONS.INIT_EMPTY_PREBOARDING_PLAN: {
			const taskID = v4();
			return {
				planName: '',
				planType: 'PREONBOARDING',
				taskList: [
					{
						taskID,
						taskName: '',
						fields: [],
						duration: 1,
						mandatory: false,
						forceCompleteOnEdit: false,
						mediaList: [],
					},
				],
				mediaList: [],
				selectedMedia: '',
				watch: false,
				description: '',
				change: false,
				selectedTask: taskID,
				unsavedChanges: true,
				deleteMediaError: '',
			};
		}
		case ACTIONS.INIT_PLAN: {
			const { plan } = action;
			if (plan.planType === 'PREONBOARDING') {
				return {
					planID: plan.planID,
					planVersion: plan.planVersion || 0,
					planName: plan.planName,
					planType: plan.planType || 'PREONBOARDING',
					status: plan.status,
					parentPlanID: plan.parentPlanID,
					taskList: plan.taskList.map(task => ({
						taskID: task.taskID,
						taskVersion: task.taskVersion || 0,
						taskName: task.taskName,
						parentTaskID: task.parentTaskID,
						fields: task.fields.map(field => ({
							fieldID: field.fieldID,
							fieldType: field.fieldType,
							fieldLabel: field.fieldLabel,
							fieldContent: field.fieldContent,
						})),
						duration: task.duration || 1,
						mandatory: !!task.mandatory,
						forceCompleteOnEdit: !!task.forceCompleteOnEdit,
						mediaList: task.mediaList,
					})),
					mediaList: plan.mediaList,
					watch: false,
					description: plan.description,
					change: false,
					selectedTask: plan.taskList[0].taskID,
					deleteMediaError: '',
				};
			}
			return {
				...action.plan,
			};
		}
		case ACTIONS.SAVE_PLAN_CHANGES: {
			return {
				...newState,
				unsavedChanges: false,
			};
		}
		case ACTIONS.ADD_MEDIA: {
			const { taskList } = currentState;
			const index = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { mediaList, fields } = taskList[index];
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);

			if (action.data.mediaID) {
				const mediaIndex = mediaList.findIndex(val => val.mediaID === action.data.mediaID);
				if (mediaIndex !== -1) {
					mediaList[mediaIndex] = action.data;
				}
				if (fieldIndex !== -1) {
					fields[fieldIndex].fieldContent = action.data.mediaID;
				}
			} else {
				const media = { ...action.data, mediaID: v4() };
				taskList[index].mediaList.push(media);
				if (fieldIndex !== -1) {
					fields[fieldIndex].fieldContent = media.mediaID;
				}
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.REMOVE_MEDIA: {
			const { taskList } = currentState;
			const index = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { mediaList, fields } = taskList[index];
			const fieldIndex = fields.findIndex(val => val.fieldID === action.fieldID);

			if (action.data.mediaID) {
				const mediaIndex = mediaList.findIndex(val => val.mediaID === action.data.mediaID);
				if (mediaIndex !== -1) {
					// mediaList.splice(mediaIndex, 1);
					mediaList[mediaIndex].deleted = true;
				}
				if (fieldIndex !== -1) {
					fields[fieldIndex].fieldContent = '';
					fields[fieldIndex].fieldLabel = '';
				}
			}
			return {
				...newState,
				unsavedChanges: true,
				taskList,
			};
		}
		case ACTIONS.SAVED_MEDIA: {
			const media = action.args;
			const { taskList } = currentState;
			const index = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { mediaList } = taskList[index];
			if (media.mediaID) {
				const mediaIndex = mediaList.findIndex(val => val.mediaID === media.mediaID);
				if (mediaIndex === -1) {
					mediaList.push(media);
				} else {
					mediaList[mediaIndex] = media;
				}
			}
			return {
				...newState,
				selectedMedia: media.mediaID,
			};
		}
		case ACTIONS.DELETED_MEDIA: {
			const media = action.args;
			const { taskList } = currentState;
			const index = taskList.findIndex(val => val.taskID === currentState.selectedTask);
			const { mediaList } = taskList[index];
			if (media.mediaID) {
				const mediaIndex = mediaList.findIndex(val => val.mediaID === media.mediaID);
				if (mediaIndex !== -1) {
					mediaList.splice(mediaIndex, 1);
				}
			}
			return {
				...newState,
				selectedMedia: '',
			};
		}
		case ACTIONS.DELETE_MEDIA_FAILED: {
			let { message = PLAN_MESSAGES.MEDIA_CANNOT_DELETE } = action;
			if (newState.unsavedChanges) {
				message = `${message} ${PLAN_MESSAGES.MEDIA_CONSIDER_SAVING_UNSAVED}`;
			}
			return {
				...newState,
				deleteMediaError: message,
			};
		}
		default:
			return currentState;
	}
};
export default planReducer;
