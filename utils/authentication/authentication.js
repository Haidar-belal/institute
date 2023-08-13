const passportJWT = require('passport');

module.exports = {
	authenticate: (req, res, done) => {
		passportJWT.authenticate('jwt', { session: false }, (id) => {
			if (id) {
				req.user = id;
			} else {
				req.user = null;
			}
			return done();
		})(req, res);
	},
};
