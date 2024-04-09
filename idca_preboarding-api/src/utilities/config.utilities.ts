import fs from 'fs';

export const getSecret = (secretName: string): any => {
	try {
		const secret = fs.readFileSync(`/etc/secrets/${secretName}.txt`, 'utf8');
		return secret;
	} catch (err) {
		console.error(`Error in reading config file ${secretName}`, err);
		throw err;
	}
};

export const getConfigJson = (configJsonName: string): any => {
	if (!process.env.ENV || process.env.ENV === 'LOCAL') {
		return {};
	}
	try {
		const configJson = JSON.parse(
			fs.readFileSync(`/etc/config/${configJsonName}.json`, 'utf8'),
		);
		return configJson.configResolution.resolved;
	} catch (err) {
		console.error(`Error in reading config file ${configJsonName}`, err);
		throw err;
	}
};

export const getParsedArraySafe = (arrayString: string) => {
	try {
		const parsedArray = JSON.parse(arrayString);
		return parsedArray;
	} catch {
		return [];
	}
};

export const BoolifyVal = (val: any) => {
	let parsedVal: boolean;
	if (val === '0' || val === 'false') {
		parsedVal = false;
	} else {
		parsedVal = !!val;
	}
	return parsedVal;
};
