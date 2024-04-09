import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { failure, FLAG, IMAGE_TYPE, ROLES } from '../config/constants';
import { INewsFeed, INewsFeedUpdate } from '../db/schema/newsFeed.schema';
import { createNewsFeed } from '../db/services/newsFeed.services';
import {
	deleteNewsById,
	fetchAllNewsFeed,
	fetchAllNewsFeedEnabled,
	fetchNewsFeedById,
	updateNewsById,
} from '../db/services/newsFeed.services';
import ImageService from '../services/ImageService';
import { controllerErrorHandler } from '../utilities/error.utilities';
import { LogError } from '../utilities/log.utilities';

class NewsFeed {
	public static async setNewsFeedData(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, content, image, url, enabled } = req.body;
			const ID = v4();
			try {
				const stats = await ImageService.checkImageSizeMB(image);
				if (!stats) {
					return res.status(400).json({
						status: failure,
						message: 'Image size should be less than 5MB',
					});
				}
			} catch (error) {
				LogError(error, 'Add newsfeed image size error');
				return res.status(400).json({
					status: failure,
				});
			}
			let imgResult;
			try {
				const imageType = IMAGE_TYPE.NEWSFEED_IMAGE;
				imgResult = await ImageService.addContentImage(ID, image, imageType);
				if (!imgResult) {
					return res.status(400).json({
						status: failure,
						message: 'Failed to upload newsfeed Image',
					});
				}
			} catch (error) {
				LogError(error, 'Add newsfeed image');
				return res.status(400).json({
					status: failure,
				});
			}
			await createNewsFeed({
				newsID: ID,
				title,
				content,
				image: imgResult,
				url,
				enabled,
				createdBy: res.locals.userID,
				updatedBy: res.locals.userID,
				createdOn: Date.now(),
				updatedOn: Date.now(),
			});
			res.json({
				status: 'success',
				message: 'Successfully news feed data added in Database',
				display: true,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getNewsFeedData(req: Request, res: Response, next: NextFunction) {
		try {
			const adminRoleCheck = res.locals.roles.includes(ROLES.ADMIN);
			if (adminRoleCheck) {
				const allNewsFeed: INewsFeed[] = await fetchAllNewsFeed();
				res.json({
					status: 'success',
					allNewsFeed,
					message: 'Successfully news feed data listed for admin',
					display: true,
				}).status(200);
			} else {
				const enabled = FLAG.NEWSFEEDENABLED;
				const allNewsFeedEnabled: INewsFeed[] = await fetchAllNewsFeedEnabled(enabled);
				res.json({
					status: 'success',
					allNewsFeedEnabled,
					message: 'Successfully news feed data listed for candidate',
					display: true,
				}).status(200);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getNewsFeedDataById(req: Request, res: Response, next: NextFunction) {
		try {
			const newsID = req.params.newsID;
			const newsFeedById: INewsFeed[] = await fetchNewsFeedById(newsID);
			if (newsFeedById.length !== 0) {
				res.json({
					status: 'success',
					newsFeedById,
					message: 'Successfully news feed data listed NewsID',
					display: true,
				}).status(200);
			} else {
				res.json({
					status: 'failure',
					message: 'No data found',
					display: true,
				}).status(404);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async deleteNewsFeed(req: Request, res: Response, next: NextFunction) {
		try {
			const newsID = req.params.newsID;
			const imageType = IMAGE_TYPE.NEWSFEED_IMAGE;
			const response = await deleteNewsById(newsID);
			let responseBlobImageDelete;
			try {
				responseBlobImageDelete = await ImageService.deleteImage(imageType, newsID);
			} catch (error) {
				LogError(error, 'Getting error at time deleting image from blob');
				responseBlobImageDelete = 'error';
			}

			res.json({
				status: 'success',
				message: 'Successfully deleted the newsfeed',
				display: true,
				response,
				responseBlobImageDelete,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async updateNewsFeed(req: Request, res: Response, next: NextFunction) {
		try {
			const newsID = req.params.newsID;
			if (Object.entries(req.body).length === 0) {
				return res.status(400).json({
					status: failure,
					message: 'Nothing for update',
				});
			}
			const calculatedFields: INewsFeedUpdate = {
				updatedBy: res.locals.userID,
				updatedOn: Date.now(),
				newsID,
			};
			let imgResult;
			if (req.body.image) {
				try {
					const stats = await ImageService.checkImageSizeMB(req.body.image);
					if (!stats) {
						return res.status(400).json({
							status: failure,
							message: 'Image size should be less than 5MB',
						});
					}
				} catch (error) {
					LogError(error, 'update newsfeed image size error');
					return res.status(400).json({
						status: failure,
					});
				}

				try {
					const imageType = IMAGE_TYPE.NEWSFEED_IMAGE;
					imgResult = await ImageService.addContentImage(
						newsID,
						req.body.image,
						imageType,
					);
					if (!imgResult) {
						return res.status(400).json({
							status: failure,
							message: 'Failed to upload newsfeed Image',
						});
					} else {
						calculatedFields.image = imgResult;
					}
				} catch (error) {
					LogError(error, 'update newsfeed image');
					return res.status(400).json({
						status: failure,
					});
				}
			}

			if (req.body.hasOwnProperty('title')) {
				calculatedFields.title = req.body.title;
			}
			if (req.body.hasOwnProperty('content')) {
				calculatedFields.content = req.body.content;
			}
			if (req.body.hasOwnProperty('url')) {
				calculatedFields.url = req.body.url;
			}
			if (req.body.hasOwnProperty('enabled')) {
				calculatedFields.enabled = req.body.enabled;
			}

			const response = await updateNewsById(calculatedFields);
			res.json({
				status: 'success',
				message: 'Successfully updated the newsfeed',
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
}

export default NewsFeed;
