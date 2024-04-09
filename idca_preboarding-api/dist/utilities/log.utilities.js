"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEvent = exports.LogError = void 0;
const uuid_1 = require("uuid");
exports.LogError = (error, name, properties = {}) => {
    const correlationID = uuid_1.v4();
    properties.correlationID = correlationID;
    error.name = `${name}${error.name ? ` ${error.name}` : ''}`;
};
exports.LogEvent = (name, properties) => {
    /* tslint:disable */
    console.info(name, properties);
    /* tslint:enable */
};
//# sourceMappingURL=log.utilities.js.map