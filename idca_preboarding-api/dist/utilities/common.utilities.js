"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateForUI = exports.daysBetweenDates = exports.CHARSET = exports.hasSpecialCharcaters = exports.hasNumbers = exports.hasUpperCase = exports.hasLowerCase = void 0;
exports.hasLowerCase = (str) => /[a-z]/.test(str);
exports.hasUpperCase = (str) => /[A-Z]/.test(str);
exports.hasNumbers = (str) => /\d/.test(str);
exports.hasSpecialCharcaters = (str) => /\W|_/g.test(str);
exports.CHARSET = {
    lowerCase: 'abcdefghijklmnopqrstuvwxyz',
    upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    digits: '0123456789',
    characters: '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\',
};
exports.daysBetweenDates = (dateString) => {
    const today = new Date().valueOf();
    const startdate = new Date(dateString).valueOf();
    const timeDiff = startdate - today;
    const noOfDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return today > startdate ? 0 - noOfDays : noOfDays;
};
// Input - 2021-06-01T00:00:00.000Z; Output - June 1, 2021
exports.formatDateForUI = (dateString) => {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    const month = monthList[date.getMonth()];
    const day = date.getDay() - 1;
    return month + ' ' + day + ', ' + date.getFullYear();
};
//# sourceMappingURL=common.utilities.js.map