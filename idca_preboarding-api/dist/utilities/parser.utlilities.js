"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistoryIDforVersion = exports.convertToObjectID = exports.convertToString = void 0;
const mongoose_1 = require("mongoose");
exports.convertToString = (text) => {
    // text = text ? text + '' : '';
    // text = text + '';
    return JSON.stringify(text);
};
exports.convertToObjectID = (id) => {
    return mongoose_1.Types.ObjectId(id.replace('-', '').substr(0, 12));
};
exports.createHistoryIDforVersion = (id, version) => {
    return `${id}--hv${version}`;
};
//# sourceMappingURL=parser.utlilities.js.map