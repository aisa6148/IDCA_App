"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REST = exports.MEMCACHED = exports.AUTH_HEADERS = exports.IMAGE_TYPE = exports.lengthCheck = exports.FLAG = exports.ROLES = exports.SOMETHING_WENT_WRONG = exports.failure = exports.FETCH_SUCCESSFUL = exports.UPDATE_SUCCESSFULL = exports.success = void 0;
exports.success = 'success';
exports.UPDATE_SUCCESSFULL = 'Status successfully updated';
exports.FETCH_SUCCESSFUL = 'Status successfully retrieved';
exports.failure = 'failure';
exports.SOMETHING_WENT_WRONG = 'something went wrong';
exports.ROLES = {
    ADMIN: 'ADMIN',
    HR_OPS: 'HR_OPS',
    TRAINING_CO: 'TRAINING_CO',
    MANAGER: 'MANAGER',
    CANDIDATE: 'CANDIDATE',
    SERVICE: 'SERVICE',
};
exports.FLAG = {
    NEWSFEEDENABLED: true,
    TESTIMONIALSENABLED: true,
};
exports.lengthCheck = {
    MAXLENGTH_250: 250,
};
exports.IMAGE_TYPE = {
    PROFILE_IMAGE: 'profileimage',
    TESTMONIAL_IMAGE: 'testimonialimage',
    NEWSFEED_IMAGE: 'newsfeedimage',
};
exports.AUTH_HEADERS = {
    ICAAUTH_TOKEN: 'ICA-Auth-Token',
    ICAAUTH_SECRET: 'ICA-Auth-Token-secret',
    IAM_AUTH_TOKEN: 'WM_SEC.AUTH_TOKEN',
};
exports.MEMCACHED = {
    IAM_USER_PROFILE: 'IAM_PROFILE',
    PFED_ROLE: 'PFED_ROLE',
};
exports.REST = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};
//# sourceMappingURL=constants.js.map