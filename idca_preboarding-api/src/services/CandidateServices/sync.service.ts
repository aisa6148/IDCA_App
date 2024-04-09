import { count } from 'console';
import * as _ from 'lodash';
import { compact } from 'lodash';
import { IMAGE_TYPE } from '../../config/constants';
import { IUserUpdate } from '../../db/model/user.model';
import { IUserAttributes } from '../../db/schema/user.schema';
import { createLog } from '../../db/services/log.service';
import {
	createUser,
	deleteCandidatewithStatusFalse,
	fetchAllCandidate,
	fetchUserDataById,
	updateCandidateById,
} from '../../db/services/user.service';
import ImageService from '../../services/ImageService';
import { LogError } from '../../utilities/log.utilities';
import TalentMartService from '../talentMartService';
export const getCandidateFromTalentMartDB = async () => {
	const userDataFromTalentMart = await TalentMartService.getUserData();
	const parsedAssociates = userDataFromTalentMart.map((candidate) => ({
		title: candidate.title,
		firstName: candidate.firstName,
		lastName: candidate.lastName,
		middleName: candidate.middleName,
		emailId: candidate.emailId,
		userType: candidate.userType,
		contact: candidate.contact,
		applyId: candidate.applyId,
		HMEmail: candidate.HMEmail,
		preferredName: candidate.preferredName,
		department: candidate.department,
		startDate: candidate.startDate,
		recruiterEmail: candidate.recruiterEmail,
		recruiterName: candidate.recruiterName,
		locationOfOffice: candidate.locationOfOffice,
		offerAcceptanceStatus: candidate.offerAcceptanceStatus,
		profilePic: candidate.profilePic,
		active: candidate.active,
		locked: candidate.locked,
	}));
	return parsedAssociates;
};

export const getAllCandidateFromPreboardingDB = async () => {
	const allCandidate = await fetchAllCandidate();
	const parsedCandidate = allCandidate.map((candidate) => ({
		id: candidate.id,
		title: candidate.title,
		firstName: candidate.firstName,
		lastName: candidate.lastName,
		middleName: candidate.middleName,
		emailId: candidate.emailId,
		userType: candidate.userType,
		contact: candidate.contact,
		applyId: candidate.applyId,
		HMEmail: candidate.HMEmail,
		preferredName: candidate.preferredName,
		department: candidate.department,
		startDate: candidate.startDate,
		recruiterEmail: candidate.recruiterEmail,
		recruiterName: candidate.recruiterName,
		locationOfOffice: candidate.locationOfOffice,
		offerAcceptanceStatus: candidate.offerAcceptanceStatus,
		profilePic: candidate.profilePic,
		active: candidate.active,
		locked: candidate.locked,
		createdAt: candidate.createdAt,
		updatedAt: candidate.updatedAt,
	}));
	const candidateMap: { [x: string]: IUserAttributes } = {};
	parsedCandidate.forEach((candidate) => {
		if (candidate.applyId) {
			candidateMap[candidate.applyId] = candidate;
		}
	});
	return {
		candidateMap,
	};
};

export const deltaSyncTalentMart = async () => {
	const ts = Date.now();
	const logPrefix = `DeltaSyncTalentMart-${ts}`;
	const LogDataStore = {
		logName: logPrefix,
		logEvent: 'START',
		logMessage: 'Sync Started',
	};
	const resLog = await createLog(LogDataStore);
	let talentMartCandidateMap;

	let preboardingDBCandidateRes;

	try {
		talentMartCandidateMap = await getCandidateFromTalentMartDB();
	} catch (error) {
		const LogDataStoreError = {
			logName: logPrefix,
			logEvent: 'ERROR',
			logMessage: 'Error in getting value from the talentmart DB',
		};
		await createLog(LogDataStoreError);
		LogError(error, 'Error in getting value from the talent mart');
		throw error;
	}
	try {
		preboardingDBCandidateRes = await getAllCandidateFromPreboardingDB();
	} catch (e) {
		const LogDataStorePreDB = {
			logName: logPrefix,
			logEvent: 'ERROR',
			logMessage: 'Error in getting value from the Preboarding SQL DB',
		};
		await createLog(LogDataStorePreDB);
		LogError(e, 'Error in getting value from the DB');
		throw e;
	}
	try {
		const data = await insertAndUpdateProcessWithTalentMartData(
			logPrefix,
			talentMartCandidateMap,
			preboardingDBCandidateRes,
		);
		return data;
	} catch (e) {
		const LogDataStorePreDB = {
			logName: logPrefix,
			logEvent: 'ERROR',
			logMessage: 'Error in process',
		};
		await createLog(LogDataStorePreDB);
		LogError(e, 'Error in process');
		throw e;
	}
};
async function insertAndUpdateProcessWithTalentMartData(
	logPrefix,
	talentMartCandidateMap,
	preboardingDBCandidateRes,
) {
	const preboardingDBCandidateIdMap = preboardingDBCandidateRes.candidateMap;
	const applyId = [];
	const candidateToAdd = {};
	const candidateUpdate = [];

	for (const candidate of talentMartCandidateMap) {
		applyId.push(candidate.applyId);
		const id = candidate.applyId;
		if (!preboardingDBCandidateIdMap[id]) {
			const toCreateAssociate = {
				title: candidate.title,
				firstName: candidate.firstName,
				lastName: candidate.lastName,
				middleName: candidate.middleName,
				emailId: candidate.emailId,
				userType: candidate.userType,
				contact: candidate.contact,
				applyId: candidate.applyId,
				HMEmail: candidate.HMEmail,
				preferredName: candidate.preferredName,
				department: candidate.department,
				startDate: candidate.startDate,
				recruiterEmail: candidate.recruiterEmail,
				recruiterName: candidate.recruiterName,
				locationOfOffice: candidate.locationOfOffice,
				offerAcceptanceStatus: candidate.offerAcceptanceStatus,
				active: true,
				locked: false,
				profilePic: candidate.profilePic,
			};
			candidateToAdd[id] = toCreateAssociate;
		} else if (preboardingDBCandidateIdMap[id].locked) {
			const LogDataStoreLock = {
				logName: logPrefix,
				logEvent: 'ACCOUNT_LOCK_ENABLED',
				logMessage:
					'This Account has been locked and User ID is -' +
					preboardingDBCandidateIdMap[id].applyId,
			};
			await createLog(LogDataStoreLock);
		} else {
			try {
				const candidateUpdateValue = await updateUserDataFormateTalentMart(
					candidate,
					preboardingDBCandidateIdMap,
					id,
				);
				candidateUpdate.push(candidateUpdateValue);
			} catch (e) {
				const LogDataStoreStruct = {
					logName: logPrefix,
					logEvent: 'ERROR',
					logMessage: 'Error in formating value for the update process',
				};
				await createLog(LogDataStoreStruct);
				LogError(e, 'Error in formating value for the update process');
				throw e;
			}
		}
	}
	const valuesForUpdateCandidate = Object.assign({}, ...candidateUpdate);
	const keysFromDBCandidate = [];
	for (const k in preboardingDBCandidateIdMap) {
		keysFromDBCandidate.push(k);
	}
	const candidateNotExsist = keysFromDBCandidate.filter((x) => applyId.indexOf(x) === -1);
	const status = await valuesForTalentmartProcess(
		logPrefix,
		candidateToAdd,
		valuesForUpdateCandidate,
		candidateNotExsist,
	);
	return status;
}

async function updateUserDataFormateTalentMart(candidate, preboardingDBCandidateIdMap, id) {
	const candidateToUpdate = {};
	const prebData = preboardingDBCandidateIdMap[id];
	const updateValues: IUserUpdate = {};
	const blobName = IMAGE_TYPE.PROFILE_IMAGE + '-' + id;
	const responseImageFrom = await ImageService.fetchImage(blobName);
	if (prebData.title !== candidate.title) {
		updateValues.title = candidate.title;
	}
	if (prebData.firstName !== candidate.firstName) {
		updateValues.firstName = candidate.firstName;
	}
	if (prebData.lastName !== candidate.lastName) {
		updateValues.lastName = candidate.lastName;
	}
	if (prebData.middleName !== candidate.middleName) {
		updateValues.middleName = candidate.middleName;
	}
	if (prebData.emailId !== candidate.emailId) {
		updateValues.emailId = candidate.emailId;
	}
	if (prebData.userType !== candidate.userType) {
		updateValues.userType = candidate.userType;
	}
	if (prebData.contact !== candidate.contact) {
		updateValues.contact = candidate.contact;
	}
	if (prebData.applyId !== candidate.applyId) {
		updateValues.applyId = candidate.applyId;
	}
	if (prebData.HMEmail !== candidate.HMEmail) {
		updateValues.HMEmail = candidate.HMEmail;
	}
	if (prebData.preferredName !== candidate.preferredName) {
		updateValues.preferredName = candidate.preferredName;
	}
	if (prebData.department !== candidate.department) {
		updateValues.department = candidate.department;
	}
	if (prebData.startDate.getTime() !== new Date(candidate.startDate).getTime()) {
		updateValues.startDate = candidate.startDate;
	}
	if (prebData.recruiterEmail !== candidate.recruiterEmail) {
		updateValues.recruiterEmail = candidate.recruiterEmail;
	}
	if (prebData.recruiterName !== candidate.recruiterName) {
		updateValues.recruiterName = candidate.recruiterName;
	}
	if (prebData.locationOfOffice !== candidate.locationOfOffice) {
		updateValues.locationOfOffice = candidate.locationOfOffice;
	}
	if (prebData.offerAcceptanceStatus !== candidate.offerAcceptanceStatus) {
		updateValues.offerAcceptanceStatus = candidate.offerAcceptanceStatus;
	}
	if (responseImageFrom !== candidate.profilePic) {
		updateValues.profilePic = candidate.profilePic;
	}
	// active and locked handle by default values
	if (_.size(updateValues)) {
		candidateToUpdate[prebData.id] = updateValues;
	}
	return candidateToUpdate;
}

async function valuesForTalentmartProcess(
	logPrefix,
	candidateToAdd,
	candidateToUpdate,
	candidateNotExsist,
) {
	try {
		const res = await updataInsertInTalentmart(
			logPrefix,
			candidateToAdd,
			candidateToUpdate,
			candidateNotExsist,
		);
		const stat = {
			addSuccess: res.addSuccess,
			addFail: res.addFail,
			updateSuccess: res.updateSuccess,
			updateFail: res.updateFail,
			deletesucess: res.deletesucess,
			deleteFailed: res.deleteFailed,
		};
		const LogDataStoreStatus = {
			logName: logPrefix,
			logEvent: 'STAT',
			logMessage:
				'Added success:' +
				_.size(res.addSuccess) +
				'Add Failed:' +
				_.size(res.addFail) +
				'Update Success:' +
				_.size(res.updateSuccess) +
				'Update Failed:' +
				_.size(res.updateFail) +
				'delete Success:' +
				_.size(res.deletesucess) +
				'delete Failed:' +
				_.size(res.deleteFailed),
		};
		try {
			await createLog(LogDataStoreStatus);
		} catch (e) {
			LogError(e, 'Error in add log values');
			throw e;
		}
		const LogDataStoreDataSetError = {
			logName: logPrefix,
			logEvent: 'END',
			logMessage: 'End  of the Data mart Sync values',
		};
		await createLog(LogDataStoreDataSetError);
		return stat;
	} catch (error) {
		const LogDataStoreDataSetError = {
			logName: logPrefix,
			logEvent: 'ERROR',
			logMessage: 'Error in add and update values',
		};

		await createLog(LogDataStoreDataSetError);
		LogError(error, 'Error in add and update values');
		throw error;
	}
}

async function updataInsertInTalentmart(
	logPrefix: string,
	candidateToAdd: { [x: string]: IUserAttributes },
	candidateToUpdate: { [x: string]: IUserUpdate },
	candidateNotExsist,
) {
	const addSuccess = [];
	const addFail = {};
	const updateSuccess = [];
	const updateFail = {};
	const deletesucess = [];
	const deleteFailed = {};
	// add associates
	for (const id in candidateToAdd) {
		try {
			let imgResult;
			const imageType = IMAGE_TYPE.PROFILE_IMAGE;
			imgResult = await ImageService.addContentImage(
				id,
				candidateToAdd[id].profilePic,
				imageType,
			);
			candidateToAdd[id].profilePic = imgResult;
			const res = await createUser(candidateToAdd[id]);
			addSuccess.push(candidateToAdd[id].applyId);
		} catch (e) {
			addFail[id] = e;
			const LogDataStoreCreateUser = {
				logName: logPrefix,
				logEvent: 'ERROR',
				logMessage: 'Error in add values at time of insert' + addFail[id],
			};

			await createLog(LogDataStoreCreateUser);
			LogError(e, 'Error in add values');
			throw e;
		}
	}

	// update associates
	for (const id in candidateToUpdate) {
		try {
			let imgResult;
			const imageType = IMAGE_TYPE.PROFILE_IMAGE;
			if (candidateToUpdate[id].profilePic) {
				const dataResponceForapplyID = await fetchUserDataById(id);
				imgResult = await ImageService.addContentImage(
					dataResponceForapplyID.applyId,
					candidateToUpdate[id].profilePic,
					imageType,
				);
				candidateToUpdate[id].profilePic = imgResult;
			}

			const res = await updateCandidateById(id, candidateToUpdate[id]);
			updateSuccess.push(candidateToUpdate[id]);
		} catch (e) {
			updateFail[id] = e;
			const LogDataStoreUpdateUser = {
				logName: logPrefix,
				logEvent: 'ERROR',
				logMessage: 'Error in update' + updateFail[id],
			};
			await createLog(LogDataStoreUpdateUser);
			LogError(e, 'Error in update values');
			throw e;
		}
	}
	// TODO: handle inactive users.
	for (let id in candidateNotExsist) {
		try {
			id = candidateNotExsist[id].toString();
			const imageType = IMAGE_TYPE.PROFILE_IMAGE;
			await ImageService.deleteImage(imageType, id);
			const res = await deleteCandidatewithStatusFalse(id);
			if (res === 1) {
				deletesucess.push(id);
			}
		} catch (error) {
			deleteFailed[id] = error;
			const LogDataStoreDeleteUser = {
				logName: logPrefix,
				logEvent: 'ERROR',
				logMessage: 'Error in delete' + deleteFailed[id],
			};
			await createLog(LogDataStoreDeleteUser);
			LogError(error, 'Error in status update values');
			throw error;
		}
	}
	return {
		addSuccess,
		addFail,
		updateSuccess,
		updateFail,
		deletesucess,
		deleteFailed,
	};
}
