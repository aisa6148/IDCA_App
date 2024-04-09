import { IUserUpdate } from '../db/model/user.model';
import { IUserModel } from '../db/schema/user.schema';

export default class TalentMartService {
	public static async getUserData() {
		try {
			const mockDataUserAdd = [];

			for (let i = 1; i <= 20; i++) {
				mockDataUserAdd.push({
					title: 'Programmer',
					firstName: 'Dinesh',
					lastName: 'udhayakumar',
					middleName: 'aj',
					emailId: 'dinesh.udhayakumar' + i + '@wa.com',
					userType: 1,
					contact: '9629158140',
					applyId: 'test' + i,
					HMEmail: 'hr@walmartlabs.com',
					preferredName: 'DineshUdhaya',
					department: 'Developer',
					startDate: '2018-03-29T00:00:00.000Z',
					recruiterEmail: 'hr@walmart2.com',
					recruiterName: 'hrhead2',
					locationOfOffice: 'chennai2',
					offerAcceptanceStatus: 'yes',
					profilePic: 'test12',
				});
			}
			return mockDataUserAdd;
		} catch (error) {
			// test
		}
	}
}
