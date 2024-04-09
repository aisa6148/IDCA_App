"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolifyVal = exports.getParsedArraySafe = exports.getConfigJson = exports.getSecret = void 0;
const fs_1 = __importDefault(require("fs"));
exports.getSecret = (secretName) => {
    try {
        const secret = fs_1.default.readFileSync(`/etc/secrets/${secretName}.txt`, 'utf8');
        return secret;
    }
    catch (err) {
        console.error(`Error in reading config file ${secretName}`, err);
        throw err;
    }
};
exports.getConfigJson = (configJsonName) => {
    if (!process.env.ENV || process.env.ENV === 'LOCAL') {
        return {};
    }
    try {
        const configJson = JSON.parse(fs_1.default.readFileSync(`/etc/config/${configJsonName}.json`, 'utf8'));
        return configJson.configResolution.resolved;
    }
    catch (err) {
        console.error(`Error in reading config file ${configJsonName}`, err);
        throw err;
    }
};
exports.getParsedArraySafe = (arrayString) => {
    try {
        const parsedArray = JSON.parse(arrayString);
        return parsedArray;
    }
    catch (_a) {
        return [];
    }
};
exports.BoolifyVal = (val) => {
    let parsedVal;
    if (val === '0' || val === 'false') {
        parsedVal = false;
    }
    else {
        parsedVal = !!val;
    }
    return parsedVal;
};
//# sourceMappingURL=config.utilities.js.map