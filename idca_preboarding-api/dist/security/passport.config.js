"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const base_64_1 = __importDefault(require("base-64"));
const passport_1 = __importDefault(require("passport"));
const passport_saml_1 = __importDefault(require("passport-saml"));
const config_1 = __importDefault(require("../config"));
const pfedConfig = config_1.default.AUTH.PFED;
const cert = base_64_1.default.decode(pfedConfig.CERT_BASE64);
function passportConfig() {
    passport_1.default.use(new passport_saml_1.default.Strategy({
        callbackUrl: pfedConfig.CALL_BACK,
        entryPoint: pfedConfig.ENTRY_POINT,
        issuer: pfedConfig.ISSUER,
        additionalParams: {
            PartnerSpId: pfedConfig.PARTNER_SPID,
            ACSIdx: pfedConfig.ASCIDX,
        },
        identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
        encryptedSAML: true,
        signatureAlgorithm: 'sha256',
        cert,
    }, 
    /* tslint:disable */
    function (profile, done) {
        return done(undefined, profile);
    }));
    passport_1.default.serializeUser((user, done) => {
        done(undefined, user);
    });
    passport_1.default.deserializeUser((id, done) => {
        done(undefined, id);
    });
}
exports.passportConfig = passportConfig;
//# sourceMappingURL=passport.config.js.map