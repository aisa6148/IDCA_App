import { v4 } from 'uuid';

export const LogError = (
	error: Error,
	name: string,
	properties: { [key: string]: string } = {},
) => {
	const correlationID = v4();
	properties.correlationID = correlationID;
	error.name = `${name}${error.name ? ` ${error.name}` : ''}`;
};

export const LogEvent = (
	name: string,
	properties: { [key: string]: string },
) => {
	/* tslint:disable */
	console.info(name, properties);
	/* tslint:enable */
};
