import { NextFunction, Request, Response } from 'express';
import { success } from '../config/constants';
import { fetchUserDataByEmail } from '../db/services/user.service';
import { daysBetweenDates, formatDateForUI } from '../utilities/common.utilities';
import { controllerErrorHandler } from '../utilities/error.utilities';

class Login {
	public static async getUserData(req: Request, res: Response, next: NextFunction) {
		try {
			const emailID = res.locals.email;
			const [candidateInfo] = await Promise.all([
				fetchUserDataByEmail(emailID),
			]);
			const userData = {
				candidateID: emailID,
			};

			let additionalUserData: any = {};
			if (candidateInfo && candidateInfo.active) {
				additionalUserData = {
					preboardingUser: true,
					name: candidateInfo.firstName + ' ' + candidateInfo.lastName,
					emailId: candidateInfo.emailId,
					userType: candidateInfo.userType,
					applyId: candidateInfo.applyId,
					HMEmail: candidateInfo.HMEmail,
					preferredName: candidateInfo.preferredName,
					department: candidateInfo.department,
					startDate: candidateInfo.startDate,
					recruiterEmail: candidateInfo.recruiterEmail,
					recruiterName: candidateInfo.recruiterName,
					locationOfOffice: candidateInfo.locationOfOffice.split(', ')[0],
					offerAcceptanceStatus: candidateInfo.offerAcceptanceStatus,
					profilePic: candidateInfo.profilePic,
					noOfDaysRemainingToJoin: daysBetweenDates(candidateInfo.startDate),
					offerDesignation: candidateInfo.title,
					startDateFormatted: formatDateForUI(candidateInfo.startDate),
				};
				res.json({
					status: success,
					userData: { ...userData, ...additionalUserData },
				});
			} else {
				res.json({
					status: success,
					message: 'Candidate details unavailable or Candidate Inactive',
					userData: {},
				});
			}

		} catch (error) {
			controllerErrorHandler(error, req, res);
		}
	}
}

export default Login;
