process.env.TZ = 'UTC';

const logger = require('./logger/console');

console.log = function () {
	return logger.info.apply(logger, arguments);
};
console.info = function () {
	return logger.info.apply(logger, arguments);
};
console.warn = function () {
	return logger.warn.apply(logger, arguments);
};
console.debug = function () {
	return logger.debug.apply(logger, arguments);
};
console.error = function () {
	return logger.error.apply(logger, arguments);
};

module.exports = {
	httpStatus: require('./constants/httpStatus'),
	database: require('./database/config'),
	collation: require('./database/constants'),
	console: require('./logger/console'),
	logger: require('./logger/httpLogger'),
	passport: require('./authentication'),
	sendMail: require('./mail/nodemailer').sendVerificationCode,
};
