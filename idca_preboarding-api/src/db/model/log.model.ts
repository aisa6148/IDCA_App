import { DataTypes, Sequelize } from 'sequelize';
import { LogStatic } from '../schema/log.schema';

export function LogDetails(sequelize: Sequelize): LogStatic {
	return sequelize.define('talentmartusersynclog', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		logEvent: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		logName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		logMessage: {
			type: DataTypes.TEXT,
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
	}) as LogStatic;
}

export interface ICreateLog {
	logEvent: string;
	logName: string;
	logMessage: string;
	createdAt?: Date;
	updatedAt?: Date;
}
