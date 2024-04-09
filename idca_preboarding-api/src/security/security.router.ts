import express, { Request, Response } from 'express';
import PrivacyController from '../controllers/privacy.controller';
import PassportController from './passport.controller';
import SecurityController from './security.controller';

const unauthorizedRouter = express.Router();

unauthorizedRouter.get('/unauthping', (req: Request, res: Response) =>
	res.json({
		uptime: process.uptime(),
		auth: 'unauth',
	}),
);
unauthorizedRouter.get('/privacypolicy', PrivacyController.getPrivacyPolicy);
unauthorizedRouter.get('/termsofuse', PrivacyController.getTermsOfUse);
unauthorizedRouter.get('/login', SecurityController.login);
unauthorizedRouter.get('/logout', SecurityController.logout);
unauthorizedRouter.get('/login-error', SecurityController.loginError);
unauthorizedRouter.post('/login/iam', SecurityController.CheckIfCandidateActive , SecurityController.loginIAM);
unauthorizedRouter.post('/samlcallback', PassportController.passportCallback);

const authorizedRouter = express.Router();
authorizedRouter.get('/authping', (req: Request, res: Response) =>
	res.json({
		uptime: process.uptime(),
		auth: 'auth',
	}),
);

export {
	unauthorizedRouter as unauthorizedSecurityRouter,
	authorizedRouter as authorizedSecurityRouter,
};
