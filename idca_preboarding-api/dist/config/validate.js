"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLength = void 0;
const constants_1 = require("../config/constants");
exports.checkLength = (content) => {
    if (content <= constants_1.lengthCheck.MAXLENGTH_250) {
        return true;
    }
    else {
        return false;
    }
};
//# sourceMappingURL=validate.js.map