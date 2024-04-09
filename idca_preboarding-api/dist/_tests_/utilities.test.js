"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const configUtil = require('../utilities/config.utilities');
const config_utilities_1 = require("../utilities/config.utilities");
describe('BoolifyVal', () => {
    it('should return true', () => {
        expect(config_utilities_1.BoolifyVal('1')).toBe(true);
    });
});
describe('BoolifyVal', () => {
    it('should return false', () => {
        expect(config_utilities_1.BoolifyVal('0')).toBe(false);
    });
});
//# sourceMappingURL=utilities.test.js.map