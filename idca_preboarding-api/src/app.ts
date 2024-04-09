import { json } from 'body-parser';
import { newEnforcer } from 'casbin';
import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import morgan from 'morgan';
import path, { join } from 'path';
import config from './config/index';
import { EVENT_NAME } from './config/log';
import Failure from './controllers/failed.controller';
import HealthCheck from './controllers/healthcheck.controller';
import APIs from './routes/api.router';
import authz from './security/authorization';
import { passportConfig } from './security/passport.config';
import RoleAccess from './security/roleAccess.controller';
import SecurityController from './security/security.controller';
import { securityPassportMiddleware } from './security/security.middleware';
import { authorizedSecurityRouter, unauthorizedSecurityRouter } from './security/security.router';
import { LogError } from './utilities/log.utilities';

const PORT = config.PORT;
const isLocal = !config.env || config.env === 'LOCAL';
const app = express();

app.use(compression());
// Compress all routes. For a high-traffic website in production you wouldn"t use this middleware.
// Instead you would use a reverse proxy like Nginx.
app.use(helmet());
// See https://helmetjs.github.io/docs/ for more information on what headers it sets/vulnerabilities it protects against
app.use(morgan('dev'));
app.use(cors());
passportConfig();

app.use(express.json({ limit: '20mb' }));
app.use(
	express.urlencoded({
		extended: false,
		limit: '20mb',
	}),
);
app.set('trust proxy', 1);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.set('Cache-Control', 'no-cache, max-age=0');
	next();
});

// app.use("/login", RoleAccess.getRoles, LoginRouter);
app.get('/api/v1/healthcheck', HealthCheck.getHealth);

app.get('/api/v1/failure', Failure.getFailureStatus);

app.use(securityPassportMiddleware);

app.use('/api', unauthorizedSecurityRouter);
app.use(SecurityController.checkAuth);
app.use('/api', authorizedSecurityRouter);

app.use(
	express.static(path.join(__dirname, '../../client/build'), {
		index: false,
	}),
);
app.use('/ping', (req, res) => res.json({ uptime: process.uptime() }));
app.use(
	'/api',
	RoleAccess.getRoles,
	authz(async () => {
		const enforcer = await newEnforcer(
			join(__dirname, '/config/casbin_conf/model.conf'),
			join(__dirname, '/config/casbin_conf/policy.csv'),
		);
		return enforcer;
	}),
	APIs,
);

// error handler for APIs
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	// loggerModel.error({ error });
	if (error.status === 403) {
		res.status(error.status).json({
			error: 'Forbidden',
		});
		error.name = 'Forbidden';
	} else {
		res.status(error.status || 500);
		res.json({
			error:
				(error.message && error.message.message) ||
				error.message ||
				'Something went wrong. Please try in a bit.',
		});
		error.name = error.name || 'Internal';
	}
	next();
});

// catch 404 and forward to error handler
app.all('/api/*', (req: Request, res: Response, next: NextFunction) => {
	if (!res.headersSent) {
		next(new createError.NotFound());
	}
});

// code to handle all uncaughtexceptions
process.on('uncaughtException', (error) => {
	LogError(error, EVENT_NAME.PROCESS_UNCAUGHT_EXCEPTION);
});

/* tslint:disable */
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
/* tslint:enable */

module.exports = app;
