import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from '../schema/user.schema';

export function UserFactory(sequelize: Sequelize): UserStatic {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		emailId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		userType: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		contact: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		applyId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		HMEmail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		preferredName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		department: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		recruiterEmail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		recruiterName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		locationOfOffice: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		offerAcceptanceStatus: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profilePic: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		locked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	}) as UserStatic;
}

export interface ICreateUsers {
	title: string;
	firstName: string;
	lastName: string;
	middleName: string;
	emailId: string;
	userType: number;
	contact: string;
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

export interface IUserUpdate {
	userID?: string;
	title?: string;
	firstName?: string;
	lastName?: string;
	middleName?: string;
	emailId?: string;
	userType?: number;
	contact?: number;
	applyId?: string;
	HMEmail?: string;
	preferredName?: string;
	department?: string;
	startDate?: Date;
	recruiterEmail?: string;
	recruiterName?: string;
	locationOfOffice?: string;
	offerAcceptanceStatus?: string;
	profilePic?: string;
	active?: boolean;
	locked?: boolean;
}
