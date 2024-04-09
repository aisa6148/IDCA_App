import { MongoErrorCode } from './mongo-error-code';

export const MODEL_ERRORS = {
	// Application

	UNAUTHORISED: {
		CODE: 401,
		MESSAGE: 'Unauthorised',
		HTTPCODE: 401,
	},
	USERAUTH_FAILED_USERRECORD: {
		CODE: 9000,
		NAME: 'Auth Error',
		MESSAGE: 'Authentication failed for user record',
		HTTPCODE: 500,
	},

	// MongoDB Errors
	MONGO_DUPLICATE_ERROR: {
		CODE: MongoErrorCode.DUPLICATE_KEY,
		MESSAGE: 'Duplicate candidate found, revalidate uploaded file',
	},
	FETCH_PLAN_FAILURE: {
		CODE: 9401,
		MESSAGE: 'Failed to fetch plan',
	},
	PLAN_ID_MISSING: {
		CODE: 9009,
		MESSAGE: 'Missing Plan ID',
	},
	INVALID_PLAN_VERSION: {
		CODE: 9020,
		MESSAGE: 'Plan version is invalid',
	},
	FETCH_PREONBOARDING_PLAN_FAILURE: {
		CODE: 9306,
		MESSAGE: 'Failed to fetch plan',
	},
	TASKS_STATUS_CHANGE_FAILED: {
		CODE: 9008,
		MESSAGE: 'Failed to publish plan',
	},
	PLAN_DELETION_FAILED: {
		CODE: 9010,
		MESSAGE: 'Plan deletion failed',
	},
	PLAN_UPDATE_FAILED: {
		CODE: 9016,
		MESSAGE: 'Plan could not be updated',
	},
	INVALID_PLAN_TYPE: {
		CODE: 9014,
		MESSAGE: 'Invalid Plan Type',
	},
	PLAN_ALREADY_ACTIVE: {
		CODE: 9005,
		MESSAGE: 'Plan already active',
	},
	PLAN_EMPTY: {
		CODE: 9006,
		MESSAGE: 'Please add tasks to the plan',
	},
	PLAN_NOT_IN_DRAFT: {
		CODE: 9019,
		MESSAGE: 'Plan is is not in draft',
	},
	PLAN_NOT_IN_EDIT: {
		CODE: 9903,
		MESSAGE: 'Plan not in edit state.',
	},
	PLAN_AND_EDIT_VERSION_SAME: {
		CODE: 9904,
		MESSAGE: 'Plan and edit version is same.',
	},
	PLAN_DESCRIPTION_NOT_PRESENT: {
		CODE: 9002,
		MESSAGE: 'Please fill plan description',
	},
	PLAN_NAME_NOT_PRESENT: {
		CODE: 9001,
		MESSAGE: 'Please fill plan name',
	},
	PLAN_CREATION_FAILED: {
		CODE: 9003,
		MESSAGE: 'Failed to save plan',
	},
	PLAN_NOT_PUBLISHED: {
		CODE: 9017,
		MESSAGE: 'Plan is not Published',
	},
	PLAN_FETCH_BY_PARENTID_FAILED: {
		CODE: 9021,
		MESSAGE: 'Plan with the parent ID not found',
	},
	PLAN_ID_NOTVALID: {
		CODE: 9018,
		MESSAGE: 'Plan id is not valid',
	},
	TASK_LIST_FAILURE: {
		CODE: 9101,
		MESSAGE: 'Failed to fetch task. ',
	},
	TASK_DELETION_FAILED: {
		CODE: 9010,
		MESSAGE: 'Plan tasks deletion failed',
	},
	TASKS_EMPTY: {
		CODE: 9007,
		MESSAGE: 'Please add contents to all tasks',
	},
	CREATE_PLAN_VERSIONHISTORY: {
		CODE: 9911,
		MESSAGE: 'Failed to create Plan Version History',
	},
	FETCH_PLAN_VERSIONHISTORY_FAILURE: {
		CODE: 9912,
		MESSAGE: 'Failed to fetce Plan Version History',
	},
	// BLOB FILE UPLOAD
	BLOB_FILEUPLOAD_FAILURE: {
		CODE: 10201,
		MESSAGE: 'Failed to update the plan document with media list',
	},
	BLOB_FILE_DELETION_FAILED: {
		CODE: 10202,
		MESSAGE: 'Failed to delete media',
	},
	DELETE_MEDIA_FAILED: {
		CODE: 10203,
		MESSAGE: 'Cannot delete Media. Media is currently assigned to a task.',
	},
	FETCH_PAGE_FAILURE: {
		CODE: 9401,
		MESSAGE: 'Failed to fetch page',
	},
	FETCH_USER_TASK_STATUS_FAILURE: {
		CODE: 9402,
		MESSAGE: 'Failed to fetch user\'s task status.',
	},
	TASK_ID_MISSING: {
		CODE: 9403,
		MESSAGE: 'Task ID missing',
	},
	STATUS_INVALID: {
		CODE: 9404,
		MESSAGE: 'Task status invalid',
	},
	INVALID_PAGE_TYPE: {
		CODE: 9014,
		MESSAGE: 'Invalid Page Type',
	},
	PAGE_NAME_NOT_PRESENT: {
		CODE: 9001,
		MESSAGE: 'Please fill page name',
	},
	PAGE_UPDATE_FAILED: {
		CODE: 9016,
		MESSAGE: 'Page could not be updated',
	},
	INVALID_PAGE_VERSION: {
		CODE: 9020,
		MESSAGE: 'Page version is invalid',
	},
	PAGE_CREATION_FAILED: {
		CODE: 9003,
		MESSAGE: 'Failed to save plan',
	},
	PAGE_ID_MISSING: {
		CODE: 9009,
		MESSAGE: 'Missing Page ID',
	},
	PAGE_DELETION_FAILED: {
		CODE: 9010,
		MESSAGE: 'Page deletion failed',
	},
	PAGE_EMPTY: {
		CODE: 9006,
		MESSAGE: 'Please add page to the component',
	},
	PAGE_DESCRIPTION_NOT_PRESENT: {
		CODE: 9002,
		MESSAGE: 'Please fill page description',
	},
	PAGE_NOT_PUBLISHED: {
		CODE: 9017,
		MESSAGE: 'Page is not Published',
	},
	PAGE_FETCH_BY_PARENTID_FAILED: {
		CODE: 9021,
		MESSAGE: 'Page with the parent ID not found',
	},
	COMPONENT_DELETION_FAILED: {
		CODE: 9010,
		MESSAGE: 'Page component deletion failed',
	},
	PAGE_ID_NOTVALID: {
		CODE: 9018,
		MESSAGE: 'Page id is not valid',
	},
	COMPONENT_LIST_FAILURE: {
		CODE: 9101,
		MESSAGE: 'Failed to fetch component. ',
	},
	PAGE_ALREADY_ACTIVE: {
		CODE: 9022,
		MESSAGE: 'Page already active',
	},
	PAGE_NOT_IN_DRAFT: {
		CODE: 9023,
		MESSAGE: 'Page is is not in draft',
	},
	PAGE_NOT_IN_EDIT: {
		CODE: 9024,
		MESSAGE: 'Page not in edit state.',
	},
	PAGE_AND_EDIT_VERSION_SAME: {
		CODE: 9904,
		MESSAGE: 'Page and edit version is same.',
	},
	PAGE_POSITIONING_UPSERT_FAILED: {
		CODE: 9003,
		MESSAGE: 'Failed to upsert positioning',
	},
};
