import { BuildOptions, Model } from 'sequelize';

export interface ILogAttributes {
	logEvent: string;
	logName: string;
	logMessage: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export class LogDetails extends Model<ILogAttributes> {}
export type LogStatic = typeof Model &
	(new (values?: object, options?: BuildOptions) => ILogAttributes);
