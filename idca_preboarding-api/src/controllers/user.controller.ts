import { NextFunction, Request, Response } from 'express';
import { failure, IMAGE_TYPE } from '../config/constants';
import { IUserUpdate } from '../db/model/user.model';
import { IUserModel } from '../db/schema/user.schema';
import {
	createUser,
	deleteUserDataById,
	fetchAllUserData,
	fetchUserDataById,
	updateUserDataById,
} from '../db/services/user.service';
import { deltaSyncTalentMart } from '../services/CandidateServices/sync.service';
import ImageService from '../services/ImageService';
import { controllerErrorHandler } from '../utilities/error.utilities';
import { LogError } from '../utilities/log.utilities';

class User {
	public static async setUserData(req: Request, res: Response, next: NextFunction) {
		try {
			const {
				title,
				firstName,
				lastName,
				middleName,
				emailId,
				userType,
				contact,
				applyId,
				HMEmail,
				preferredName,
				department,
				startDate,
				recruiterEmail,
				recruiterName,
				locationOfOffice,
				offerAcceptanceStatus,
				profilePic,
			} = req.body;
			try {
				const stats = await ImageService.checkImageSizeMB(profilePic);
				if (!stats) {
					return res.status(400).json({
						status: failure,
						message: 'Image size should be less than 5MB',
					});
				}
			} catch (error) {
				LogError(error, 'Add profile image size error');
				return res.status(400).json({
					status: failure,
				});
			}
			let imgResult;
			try {
				const imageType = IMAGE_TYPE.PROFILE_IMAGE;
				imgResult = await ImageService.addContentImage(emailId, profilePic, imageType);
				if (!imgResult) {
					return res.status(400).json({
						status: failure,
						message: 'Failed to upload user image',
					});
				}
			} catch (error) {
				LogError(error, 'Add user image error');
				return res.status(400).json({
					status: failure,
				});
			}
			try {
				await createUser({
					title,
					firstName,
					lastName,
					middleName,
					emailId,
					userType,
					contact,
					applyId,
					HMEmail,
					preferredName,
					department,
					startDate,
					recruiterEmail,
					recruiterName,
					locationOfOffice,
					offerAcceptanceStatus,
					profilePic: imgResult,
				});

				res.json({
					status: 'success',
					message: 'created user succesfully',
					display: true,
				}).status(200);
			} catch (error) {
				LogError(error, 'Add user data error');
				res.json({
					status: 'failed',
					message: 'failed  to add user data',
					display: false,
				}).status(400);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getUserData(req: Request, res: Response, next: NextFunction) {
		try {
			const userList: IUserModel[] = await fetchAllUserData();
			res.json({
				status: 'success',
				userList,
				message: 'Successfully listed user data',
				display: true,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getUserDataByID(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.params.id;
			const userById = await fetchUserDataById(userID);
			if (userById) {
				res.json({
					status: 'success',
					user: userById,
					message: 'Successfully user data listed by userID',
					display: true,
				}).status(200);
			} else {
				res.json({
					status: 'success',
					message: 'No data found',
					display: true,
				}).status(200);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async deleteUserDataByID(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.params.id;
			const imageType = IMAGE_TYPE.PROFILE_IMAGE;
			const userById = await fetchUserDataById(userID);
			const response = await deleteUserDataById(userID);
			let responseBlobImageDelete;
			try {
				responseBlobImageDelete = await ImageService.deleteImage(
					imageType,
					userById.dataValues.emailId,
				);
			} catch (error) {
				LogError(error, 'Getting error at time deleting image from blob');
				responseBlobImageDelete = 'error';
			}
			if (response) {
				res.json({
					status: 'success',
					response,
					responseBlobImageDelete,
					message: 'Successfully delete user data by ID',
					display: true,
				}).status(200);
			} else {
				res.json({
					status: 'success',
					message: 'No record found',
					display: true,
				}).status(200);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async updateUserDataByID(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.params.id;
			if (Object.entries(req.body).length === 0) {
				return res.status(400).json({
					status: failure,
					message: 'Nothing for update',
				});
			}
			const calculatedFields: IUserUpdate = {
				userID,
			};
			let imgResult;
			// if only profile pick get change
			if (req.body.profilePic && !req.body.emailId) {
				const userById = await fetchUserDataById(userID);
				const emailId = userById.dataValues.emailId;
				try {
					const stats = await ImageService.checkImageSizeMB(req.body.profilePic);
					if (!stats) {
						return res.status(400).json({
							status: failure,
							message: 'Image size should be less than 5MB',
						});
					}
				} catch (error) {
					LogError(error, 'update user profile image size error');
					return res.status(400).json({
						status: failure,
					});
				}

				try {
					const imageType = IMAGE_TYPE.PROFILE_IMAGE;
					imgResult = await ImageService.addContentImage(
						emailId,
						req.body.profilePic,
						imageType,
					);
					if (!imgResult) {
						return res.status(400).json({
							status: failure,
							message: 'Failed to upload user image',
						});
					} else {
						calculatedFields.profilePic = imgResult;
					}
				} catch (error) {
					LogError(error, 'update user image error');
					return res.status(400).json({
						status: failure,
					});
				}
			}
			// if profile pick and email id both change
			if (req.body.profilePic && req.body.emailId) {
				const emailId = req.body.emailId;
				try {
					const stats = await ImageService.checkImageSizeMB(req.body.profilePic);
					if (!stats) {
						return res.status(400).json({
							status: failure,
							message: 'Image size should be less than 5MB',
						});
					}
				} catch (error) {
					LogError(error, 'update user profile image size error');
					return res.status(400).json({
						status: failure,
					});
				}

				try {
					const imageType = IMAGE_TYPE.PROFILE_IMAGE;
					imgResult = await ImageService.addContentImage(
						emailId,
						req.body.profilePic,
						imageType,
					);
					if (!imgResult) {
						return res.status(400).json({
							status: failure,
							message: 'Failed to upload user image',
						});
					} else {
						calculatedFields.profilePic = imgResult;
					}
				} catch (error) {
					LogError(error, 'update user image error');
					return res.status(400).json({
						status: failure,
					});
				}
			}
			// if email id only get changed
			if (!req.body.profilePic && req.body.emailId) {
				const userById = await fetchUserDataById(userID);
				const image = userById.dataValues.profilePic;
				const imageBlob = await ImageService.fetchImage(image);
				const emailId = req.body.emailId;
				try {
					const stats = await ImageService.checkImageSizeMB(imageBlob);
					if (!stats) {
						return res.status(400).json({
							status: failure,
							message: 'Image size should be less than 5MB',
						});
					}
				} catch (error) {
					LogError(error, 'update user profile image size error');
					return res.status(400).json({
						status: failure,
					});
				}

				try {
					const imageType = IMAGE_TYPE.PROFILE_IMAGE;
					imgResult = await ImageService.addContentImage(emailId, imageBlob, imageType);
					if (!imgResult) {
						return res.status(400).json({
							status: failure,
							message: 'Failed to upload user image',
						});
					} else {
						calculatedFields.profilePic = imgResult;
					}
				} catch (error) {
					LogError(error, 'update user image error');
					return res.status(400).json({
						status: failure,
					});
				}
			}

			if (req.body.hasOwnProperty('title')) {
				calculatedFields.title = req.body.title;
			}
			if (req.body.hasOwnProperty('firstName')) {
				calculatedFields.firstName = req.body.firstName;
			}
			if (req.body.hasOwnProperty('lastName')) {
				calculatedFields.lastName = req.body.lastName;
			}
			if (req.body.hasOwnProperty('middleName')) {
				calculatedFields.middleName = req.body.middleName;
			}
			if (req.body.hasOwnProperty('emailId')) {
				calculatedFields.emailId = req.body.emailId;
			}
			if (req.body.hasOwnProperty('userType')) {
				calculatedFields.userType = req.body.userType;
			}
			if (req.body.hasOwnProperty('contact')) {
				calculatedFields.contact = req.body.contact;
			}
			if (req.body.hasOwnProperty('applyId')) {
				calculatedFields.applyId = req.body.applyId;
			}
			if (req.body.hasOwnProperty('HMEmail')) {
				calculatedFields.HMEmail = req.body.HMEmail;
			}
			if (req.body.hasOwnProperty('preferredName')) {
				calculatedFields.preferredName = req.body.preferredName;
			}
			if (req.body.hasOwnProperty('department')) {
				calculatedFields.department = req.body.department;
			}
			if (req.body.hasOwnProperty('startDate')) {
				calculatedFields.startDate = req.body.startDate;
			}
			if (req.body.hasOwnProperty('recruiterEmail')) {
				calculatedFields.recruiterEmail = req.body.recruiterEmail;
			}
			if (req.body.hasOwnProperty('recruiterName')) {
				calculatedFields.recruiterName = req.body.recruiterName;
			}
			if (req.body.hasOwnProperty('locationOfOffice')) {
				calculatedFields.locationOfOffice = req.body.locationOfOffice;
			}
			if (req.body.hasOwnProperty('offerAcceptanceStatus')) {
				calculatedFields.offerAcceptanceStatus = req.body.offerAcceptanceStatus;
			}
			const response = await updateUserDataById(calculatedFields);
			res.json({
				status: 'success',
				message: 'Successfully updated the user data by ID',
				display: true,
				response,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getImageBlobName(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await ImageService.fetchImage(req.params.blobName);
			res.json({
				status: 'success',
				message: 'Successfully render the image data',
				display: true,
				response,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	// Talent Mart Code Start Here.

	public static async talentMartCall() {
		try {
			const data = await deltaSyncTalentMart();
			/* tslint:disable */
			console.log('Insert and update data successfully', data);
			/* tslint:enable */
			return data;
		} catch (error) {
			LogError(error, 'Talent mart data update');
		}
	}
}
export default User;
