"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const esb_signheaders_1 = __importDefault(require("@walmart/esb-signheaders"));
const crypto_1 = __importDefault(require("crypto"));
const https = __importStar(require("https"));
const _ = __importStar(require("lodash"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const index_1 = __importDefault(require("../../config/index"));
const auth_config_1 = __importDefault(require("../../config/auth.config"));
const constants_1 = require("../../config/constants");
const common_utilities_1 = require("../../utilities/common.utilities");
const common_utilities_2 = require("../../utilities/common.utilities");
const ENDPOINT = {
    authenticateToken: {
        url: '/platform-iam-server/iam/authn/token',
        method: constants_1.REST.POST,
    },
    authenticateUser: {
        url: '/platform-iam-server/iam/authnService',
        method: constants_1.REST.POST,
    },
    changeLoginPassword: {
        url: '/platform-iam-server/iam/admin/changeloginpassword',
        method: constants_1.REST.PUT,
    },
    changePasswordByAdmin: {
        url: '/platform-iam-server/iam/admin/changepassword',
        method: constants_1.REST.POST,
    },
    createUser: {
        url: '/platform-iam-server/iam/admin/principal',
        method: constants_1.REST.POST,
    },
    deleteUser: {
        url: '/platform-iam-server/iam/admin/principal',
        method: constants_1.REST.DELETE,
    },
};
class IAMServices {
    static authenticateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield IAMServices.makeIAMCall(Object.assign(Object.assign({}, ENDPOINT.authenticateToken), { body: {
                    payload: token,
                } }));
            if (response.status === 'OK' && response.payload && response.payload.valid) {
                return {
                    principal: {
                        principalId: response.payload.principalId,
                        loginId: response.payload.loginId,
                    },
                };
            }
            else {
                throw {
                    errorStatus: response.status,
                    error: (response.errors && response.errors[0] && response.errors[0].description) ||
                        (response.payload && response.payload.errorMsg) ||
                        'unauthenticated',
                };
            }
        });
    }
    static authenticateUser(userIdEnc, passwordEnc) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = IAMServices.passwordDecrypt(passwordEnc);
            const userId = IAMServices.userIDDecrypt(userIdEnc);
            const response = yield IAMServices.makeIAMCall(Object.assign(Object.assign({}, ENDPOINT.authenticateUser), { body: {
                    payload: {
                        tenantId: auth_config_1.default.IAM.TENANT_ID,
                        realmId: auth_config_1.default.IAM.REALM_ID,
                        userId,
                        password,
                    },
                } }));
            if (response.status === 'OK' && response.payload) {
                if (response.payload.authenticationState === 'SUCCESS' &&
                    response.payload.principal &&
                    response.payload.authenticationToken) {
                    return {
                        principal: {
                            loginId: response.payload.principal.loginId,
                            mailId: response.payload.principal.mailId,
                        },
                        authenticationToken: {
                            authToken: response.payload.authenticationToken.authToken,
                            validity: response.payload.authenticationToken.validity,
                        },
                    };
                }
                else if (response.payload.authenticationState === 'FAILED') {
                    throw {
                        authenticationState: response.payload.authenticationState,
                        error: response.payload.authenticationResultMsg || 'Authentication failed',
                    };
                }
                else {
                    throw {
                        authenticationState: response.payload.authenticationState,
                        error: response.payload.authenticationResultMsg || 'Authentication error',
                    };
                }
            }
            else {
                throw {
                    errorStatus: response.status,
                    error: (response.errors && response.errors[0] && response.errors[0].description) ||
                        (response.payload && response.payload.errorMsg) ||
                        'Authenticated Failed',
                };
            }
        });
    }
    static changeLoginPassword(loginId, oldPasswordEnc, newPasswordEnc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!loginId) {
                throw {
                    error: 'No Valid Email/loginid given',
                };
            }
            const oldPassword = IAMServices.passwordDecrypt(oldPasswordEnc);
            const newPassword = IAMServices.passwordDecrypt(newPasswordEnc);
            if (!newPassword || !oldPassword) {
                throw {
                    error: 'Invalid new/old Password given',
                };
            }
            const response = yield IAMServices.makeIAMCall(Object.assign(Object.assign({}, ENDPOINT.changeLoginPassword), { body: {
                    header: undefined,
                    payload: {
                        realmId: auth_config_1.default.IAM.REALM_ID,
                        loginId,
                        oldPassword,
                        newPassword,
                        changed: false,
                    },
                } }));
            if (response.status === 'OK' && response.payload) {
                return {
                    passwordChanged: response.payload.changed,
                };
            }
            else {
                throw {
                    errorStatus: response.status,
                    error: (response.errors && response.errors[0] && response.errors[0].description) ||
                        (response.payload && response.payload.errorMsg) ||
                        'IAM User Password change Failed',
                };
            }
        });
    }
    static createIAMUser(email, passwordEnc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw {
                    error: 'No Valid Email given',
                };
            }
            const password = IAMServices.passwordDecrypt(passwordEnc);
            if (!password) {
                throw {
                    error: 'Invalid Password given',
                };
            }
            const additionalHeaders = IAMServices.generateConsumerSignature();
            const userId = email && email.split('@')[0];
            if (!userId) {
                throw {
                    error: 'Could not derive User ID',
                };
            }
            const response = yield IAMServices.makeIAMCall(Object.assign(Object.assign({}, ENDPOINT.createUser), { headers: additionalHeaders, body: {
                    header: undefined,
                    payload: {
                        realmId: auth_config_1.default.IAM.REALM_ID,
                        email,
                        id: userId,
                        loginUID: email,
                        password,
                        enabled: true,
                        locked: false,
                    },
                } }));
            if (response.status === 'OK' && response.payload) {
                if (response.payload.loginUID && response.payload.email) {
                    return {
                        created: true,
                        loginUID: response.payload.loginUID,
                        email: response.payload.email,
                        enabled: response.payload.enabled,
                    };
                }
                else {
                    throw {
                        error: 'Problem occured with IAM User Creation ',
                        response,
                    };
                }
            }
            else {
                throw {
                    errorStatus: response.status,
                    error: (response.errors && response.errors[0] && response.errors[0].description) ||
                        (response.payload && response.payload.errorMsg) ||
                        'IAM User Creation Failed',
                };
            }
        });
    }
    static deleteIAMUser(principalId) {
        return __awaiter(this, void 0, void 0, function* () {
            // FORBIDDEN
            if (!principalId) {
                throw {
                    error: 'No User principal ID given',
                };
            }
            const additionalHeaders = IAMServices.generateConsumerSignature();
            const response = yield IAMServices.makeIAMCall(Object.assign(Object.assign({}, ENDPOINT.deleteUser), { headers: additionalHeaders, params: {
                    realmId: auth_config_1.default.IAM.REALM_ID,
                    principalId,
                } }));
            if (response.status === 'OK') {
                return {
                    response,
                };
            }
            else {
                throw {
                    errorStatus: response.status,
                    error: (response.errors && response.errors[0] && response.errors[0].description) ||
                        (response.payload && response.payload.errorMsg) ||
                        'IAM User Delete Failed',
                };
            }
        });
    }
    static updateIAMUserPassword(email, passwordEnc) {
        return __awaiter(this, void 0, void 0, function* () {
            // FORBIDDEN
            if (!email) {
                throw {
                    error: 'No Valid Email given',
                };
            }
            const password = IAMServices.passwordDecrypt(passwordEnc);
            if (!password) {
                throw {
                    error: 'Invalid Password given',
                };
            }
            const userId = email && email.split('@')[0];
            if (!userId) {
                throw {
                    error: 'Could not derive User ID',
                };
            }
            const additionalHeaders = IAMServices.generateConsumerSignature();
            const response = yield IAMServices.makeIAMCall(Object.assign(Object.assign({}, ENDPOINT.changePasswordByAdmin), { headers: additionalHeaders, body: {
                    headers: undefined,
                    payload: {
                        realmId: auth_config_1.default.IAM.REALM_ID,
                        loginId: email,
                        password,
                    },
                } }));
            if (response.status === 'OK' && response.payload) {
                return {
                    passwordChanged: response.payload.changed,
                    response,
                };
            }
            else {
                throw {
                    errorStatus: response.status,
                    error: (response.errors && response.errors[0] && response.errors[0].description) ||
                        (response.payload && response.payload.errorMsg) ||
                        'IAM User Password change Failed',
                };
            }
        });
    }
    static userIDDecrypt(userIDEnc) {
        const userIDDec = IAMServices.decrypt(userIDEnc, index_1.default.RSA_PRIVATE_KEY);
        return userIDDec;
    }
    static makeIAMCall({ url, method, headers, body, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: method || 'GET',
                headers: Object.assign({ 'WM_SVC.ENV': auth_config_1.default.IAM.SERVICE_ENV, 'WM_SVC.VERSION': auth_config_1.default.IAM.SERVICE_VERSION, 'WM_SVC.NAME': auth_config_1.default.IAM.SERVICE_NAME, 'WM_CONSUMER.ID': auth_config_1.default.IAM.CONSUMER_ID, 'WM_QOS.CORRELATION_ID': Math.random().toString(36).slice(2) }, headers),
            };
            if (body) {
                try {
                    requestOptions.body = JSON.stringify(body);
                    requestOptions.headers['Content-Type'] = 'application/json';
                }
                catch (e) {
                    _.noop();
                }
            }
            let parsedParams = '';
            if (params) {
                try {
                    const p = new URLSearchParams();
                    _.each(params, (v, k) => p.append(k, v));
                    parsedParams = p.toString() ? '?' + p.toString() : '';
                }
                catch (e) {
                    _.noop();
                }
            }
            requestOptions.agent = new https.Agent({
                rejectUnauthorized: false,
                port: 443,
            });
            const generatedUrl = `${auth_config_1.default.IAM.SERVICE_ENDPOINT}${url}${parsedParams}`;
            const res = yield node_fetch_1.default(generatedUrl, requestOptions);
            return res.json();
        });
    }
    static generateConsumerSignature() {
        return __awaiter(this, void 0, void 0, function* () {
            const WMSEC_KEY_VERSION = '1';
            const consumerID = auth_config_1.default.IAM.CONSUMER_ID;
            const WMSEC_KEY = auth_config_1.default.IAM.SVC_ACCOUNT_PVT_KEY;
            const ts = Date.now();
            const eshSign = new esb_signheaders_1.default({ privateKey: WMSEC_KEY });
            const headers = eshSign.sign({
                'WM_CONSUMER.ID': consumerID,
                'WM_CONSUMER.INTIMESTAMP': ts,
                'WM_SEC.KEY_VERSION': WMSEC_KEY_VERSION,
            });
            return headers;
        });
    }
    static passwordDecrypt(passwordEnc) {
        const passwordDec = IAMServices.decrypt(passwordEnc, index_1.default.RSA_PRIVATE_KEY);
        return passwordDec;
    }
    static passwordEncrypt(password) {
        const passwordEnc = password;
        return passwordEnc;
    }
    static decrypt(toDecrypt, privateKey) {
        const buffer = Buffer.from(toDecrypt, 'base64');
        const decrypted = crypto_1.default.privateDecrypt({
            key: privateKey.toString(),
            passphrase: index_1.default.PASSPHARSE,
        }, buffer);
        return decrypted.toString('utf8');
    }
}
exports.default = IAMServices;
IAMServices.generateRandomPassword = (length, chars) => {
    let password = '';
    do {
        const pwArray = [];
        pwArray.push(_.sampleSize(common_utilities_2.CHARSET.lowerCase, 1));
        pwArray.push(_.shuffle([
            _.sampleSize(common_utilities_2.CHARSET.lowerCase, 2),
            _.sampleSize(common_utilities_2.CHARSET.upperCase, 2),
            _.sampleSize(common_utilities_2.CHARSET.digits, 1),
            _.sampleSize(common_utilities_2.CHARSET.characters, 1),
        ]));
        password = pwArray.join('');
    } while (!IAMServices.isValidPassword(password));
    return password;
};
IAMServices.isValidPassword = (password) => {
    return (common_utilities_1.hasLowerCase(password) &&
        common_utilities_1.hasUpperCase(password) &&
        common_utilities_1.hasNumbers(password) &&
        common_utilities_1.hasSpecialCharcaters(password));
};
//# sourceMappingURL=IAMServices.js.map