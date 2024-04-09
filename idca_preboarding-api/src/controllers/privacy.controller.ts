import { NextFunction, Request, Response } from 'express';
import config from '../config/index';
import { controllerErrorHandler } from '../utilities/error.utilities';
class Privacy {
	public static async getTermsOfUse(req: Request, res: Response, next: NextFunction) {
		try {
			const TERMSOFUSE = config.TERMSOFUSE;
			res.set('plain/text').status(200).send(TERMSOFUSE);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}

	public static async getPrivacyPolicy(req: Request, res: Response, next: NextFunction) {
		try {
			const PRIVACYPOLICY = config.PRIVACYPOLICY;
			res.set('plain/text').status(200).send(PRIVACYPOLICY);
		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
}
export default Privacy;
