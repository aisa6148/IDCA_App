import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { failure, FLAG, IMAGE_TYPE, ROLES } from '../config/constants';
import { checkLength } from '../config/validate';
import { ITestimonials, ITestimonialsUpdate } from '../db/schema/testimonials.schema';
import { createTestimonials } from '../db/services/testimonials.service';
import {
	deleteTestimonialById,
	fetchAllTestimonials,
	fetchAllTestimonialsEnabled,
	fetchTestimonialById,
	updateTestimonialById,
} from '../db/services/testimonials.service';
import ImageService from '../services/ImageService';
import { controllerErrorHandler } from '../utilities/error.utilities';
import { LogError } from '../utilities/log.utilities';

class Testimonials {
	public static async setTestimonialsData(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, designation, testimonials, image, enabled } = req.body;
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
				LogError(error, 'Add testimonails image size error');
				return res.status(400).json({
					status: failure,
				});
			}
			let imgResult;
			try {
				const imageType = IMAGE_TYPE.TESTMONIAL_IMAGE;
				imgResult = await ImageService.addContentImage(ID, image, imageType);
				if (!imgResult) {
					return res.status(400).json({
						status: failure,
						message: 'Failed to upload testimonaial image',
					});
				}
			} catch (error) {
				LogError(error, 'Add testimonial image error');
				return res.status(400).json({
					status: failure,
				});
			}
			const lengthValidate = checkLength(testimonials.length);
			if (lengthValidate) {
				await createTestimonials({
					testimonialsID: ID,
					name,
					designation,
					testimonials,
					image: imgResult,
					enabled,
					createdBy: res.locals.userID,
					updatedBy: res.locals.userID,
					createdOn: Date.now(),
					updatedOn: Date.now(),
				});
				res.json({
					status: 'success',
					message: 'Successfully added testimonials',
					display: true,
				}).status(200);
			} else {
				res.json({
					status: 'failed',
					message:
						'failed  to added testimonials testimonails length should be less than 250 Characters',
					display: false,
				}).status(400);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
	public static async getTestimonialsData(req: Request, res: Response, next: NextFunction) {
		try {
			const adminRoleCheck = res.locals.roles.includes(ROLES.ADMIN);
			if (adminRoleCheck) {
				const testimonials: ITestimonials[] = await fetchAllTestimonials();
				res.json({
					status: 'success',
					testimonials,
					message: 'Successfully testimonials listed for admin',
					display: true,
				}).status(200);
			} else {
				const enabled = FLAG.TESTIMONIALSENABLED;
				const testimonials: ITestimonials[] = await fetchAllTestimonialsEnabled(enabled);
				res.json({
					status: 'success',
					testimonials,
					message: 'Successfully testimonials listed for candidate',
					display: true,
				}).status(200);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getTestimonialsById(req: Request, res: Response, next: NextFunction) {
		try {
			const testimonialsID = req.params.testimonialsID;
			const testimonialById: ITestimonials[] = await fetchTestimonialById(testimonialsID);
			if (testimonialById.length !== 0) {
				res.json({
					status: 'success',
					testimonialById,
					message: 'Successfully testimonials data listed by TestimonialsID',
					display: true,
				}).status(200);
			} else {
				res.json({
					status: 'failure',
					message: 'No data found',
					display: false,
				}).status(404);
			}
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async deleteTestimonials(req: Request, res: Response, next: NextFunction) {
		try {
			const testimonialsID = req.params.testimonialsID;
			const imageType = IMAGE_TYPE.TESTMONIAL_IMAGE;
			const response = await deleteTestimonialById(testimonialsID);
			let responseBlobImageDelete;
			try {
				responseBlobImageDelete = await ImageService.deleteImage(imageType, testimonialsID);
			} catch (error) {
				LogError(error, 'Getting error at time deleting image from blob');
				responseBlobImageDelete = 'error';
			}

			res.json({
				status: 'success',
				message: 'Successfully deleted the testimonial',
				display: true,
				response,
				responseBlobImageDelete,
			}).status(200);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async updateTestimonials(req: Request, res: Response, next: NextFunction) {
		try {
			const testimonialsID = req.params.testimonialsID;
			if (Object.entries(req.body).length === 0) {
				return res.status(400).json({
					status: failure,
					message: 'Nothing for update',
				});
			}
			const calculatedFields: ITestimonialsUpdate = {
				updatedBy: res.locals.userID,
				updatedOn: Date.now(),
				testimonialsID,
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
					LogError(error, 'update testimonails image size error');
					return res.status(400).json({
						status: failure,
					});
				}

				try {
					const imageType = IMAGE_TYPE.TESTMONIAL_IMAGE;
					imgResult = await ImageService.addContentImage(
						testimonialsID,
						req.body.image,
						imageType,
					);
					if (!imgResult) {
						return res.status(400).json({
							status: failure,
							message: 'Failed to upload testimonaial image',
						});
					} else {
						calculatedFields.image = imgResult;
					}
				} catch (error) {
					LogError(error, 'update testimonial image error');
					return res.status(400).json({
						status: failure,
					});
				}
			}

			if (req.body.hasOwnProperty('name')) {
				calculatedFields.name = req.body.name;
			}
			if (req.body.hasOwnProperty('designation')) {
				calculatedFields.designation = req.body.designation;
			}
			if (req.body.hasOwnProperty('testimonials')) {
				calculatedFields.testimonials = req.body.testimonials;
			}
			if (req.body.hasOwnProperty('enabled')) {
				calculatedFields.enabled = req.body.enabled;
			}

			const response = await updateTestimonialById(calculatedFields);
			res.json({
				status: 'success',
				message: 'Successfully updated the testimonial',
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

export default Testimonials;
