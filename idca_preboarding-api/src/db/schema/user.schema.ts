import { BuildOptions, Model } from 'sequelize';
export interface IUserAttributes {
	id: number;
	title: string;
	firstName: string;
	lastName: string;
	middleName: string;
	emailId: string;
	userType: number;
	contact: number;
	applyId: string;
	HMEmail: string;
	preferredName: string;
	department: string;
	startDate: Date;
	recruiterEmail: string;
	recruiterName: string;
	locationOfOffice: string;
	offerAcceptanceStatus: string;
	profilePic: string;
	active?: boolean;
	locked?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface IUserModel extends Model<IUserAttributes>, IUserAttributes {
	id: number;
	title: string;
	firstName: string;
	lastName: string;
	middleName: string;
	emailId: string;
	userType: number;
	contact: number;
	applyId: string;
	HMEmail: string;
	preferredName: string;
	department: string;
	startDate: Date;
	recruiterEmail: string;
	recruiterName: string;
	locationOfOffice: string;
	offerAcceptanceStatus: string;
	profilePic: string;
	active: boolean;
	locked: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export class User extends Model<IUserModel, IUserAttributes> {}
export type UserStatic = typeof Model &
	(new (values?: object, options?: BuildOptions) => IUserModel);
