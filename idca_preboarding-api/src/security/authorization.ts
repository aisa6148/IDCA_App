import { Enforcer } from 'casbin';
import { NextFunction, Request, Response } from 'express';

export class BasicAuthorizer {
	private req: Request;
	private res: Response;
	private enforcer: Enforcer;

	constructor(req: Request, res: Response, enforcer: Enforcer) {
		this.req = req;
		this.res = res;
		this.enforcer = enforcer;
	}

	public async checkPermission() {
		const { req, enforcer } = this;
		const { originalUrl, method } = req;
		const userRole = this.getUserRole();
		let permission = false;
		for (const role of userRole) {
			permission = permission || (await enforcer.enforce(role, originalUrl, method));
			if (permission) {
				break;
			}
		}
		return permission;
	}

	private getUserRole() {
		const { roles } = this.res.locals;
		return roles;
	}
}

// the authorizer middleware
export default function authz(newEnforcer: () => Promise<Enforcer>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const enforcer = await newEnforcer();

		if (!(enforcer instanceof Enforcer)) {
			res.status(500).json({ 500: 'Invalid enforcer' });
			return;
		}

		const authorizer = new BasicAuthorizer(req, res, enforcer);
		if (!(await authorizer.checkPermission())) {
			res.status(403).json({ 403: 'Forbidden' });
			return;
		}

		next();
	};
}
