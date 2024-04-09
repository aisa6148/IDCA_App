import base64 from 'base-64';
import passport from 'passport';
import SamlStrategy from 'passport-saml';
import config from '../config';

const pfedConfig = config.AUTH.PFED;
const cert = base64.decode(pfedConfig.CERT_BASE64);

export function passportConfig() {
	passport.use(
		new SamlStrategy.Strategy(
			{
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
			},
			/* tslint:enable */
		),
	);
	passport.serializeUser((user, done) => {
		done(undefined, user);
	});

	passport.deserializeUser((id, done) => {
		done(undefined, id);
	});
}
