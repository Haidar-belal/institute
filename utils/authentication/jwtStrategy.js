const { ExtractJwt, Strategy } = require('passport-jwt');
const passport = require('passport');
const { key, cipherAlgorithm } = require('../../config/index');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: key,
	algorithm: cipherAlgorithm,
};

passport.use(
	new Strategy(options, (jwtPayload, done) => {
		return done(jwtPayload);
	})
);
module.exports = passport;
