import { model } from 'mongoose';
import { EVENT_NAME } from '../../config/log';
import { LogError } from '../../utilities/log.utilities';
import { IRoleAccess, RoleAccessSchema } from '../schema/roleAccess.schema';

export const RoleAccessModel = model<IRoleAccess>(
	'roleconfig',
	RoleAccessSchema,
);
/* tslint:disable */
RoleAccessModel.on("index", (error) => {
	if (error) {
		LogError(error, EVENT_NAME.MODEL_INDEX_CREATION_FAILED, {
			modelName: "RoleAccessModel",
		});
	} else {
		console.log("Role Access Model index created");
	}
});

 export interface ICreateRoleAccess {
	userId: string;
	roles: string[];
}
