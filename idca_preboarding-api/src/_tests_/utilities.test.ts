// const configUtil = require('../utilities/config.utilities');
import { BoolifyVal } from '../utilities/config.utilities';

describe('BoolifyVal', () => {
	it('should return true', () => {
		expect(BoolifyVal('1')).toBe(true);
	});
});

describe('BoolifyVal', () => {
	it('should return false', () => {
		expect(BoolifyVal('0')).toBe(false);
	});
});
